import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DomainWebhookService } from '../../domain/webhook/webhook.service';
import { DomainWebhookEventLogService } from '../../domain/webhook-event-log/webhook-event-log.service';
import { DomainSystemWebhookService } from '../../domain/system-webhook/system-webhook.service';
import { DomainSystemService } from '../../domain/system/system.service';

@Injectable()
export class WebhookContextService {
    constructor(
        private readonly 웹훅서비스: DomainWebhookService,
        private readonly 웹훅이벤트로그서비스: DomainWebhookEventLogService,
        private readonly 시스템웹훅서비스: DomainSystemWebhookService,
        private readonly 시스템서비스: DomainSystemService,
    ) {}

    /**
     * 새로운 웹훅을 등록합니다
     */
    async 웹훅등록하기(웹훅정보: {
        webhookName: string;
        description?: string;
        targetUrl: string;
        eventType: string;
        entityType: string;
        secretKey?: string;
        headers?: Record<string, any>;
        systemId?: string;
    }) {
        // 1. 웹훅 생성
        const 새웹훅 = await this.웹훅서비스.save({
            webhookName: 웹훅정보.webhookName,
            description: 웹훅정보.description,
            targetUrl: 웹훅정보.targetUrl,
            eventType: 웹훅정보.eventType,
            entityType: 웹훅정보.entityType,
            secretKey: 웹훅정보.secretKey || this.시크릿키생성하기(),
            headers: 웹훅정보.headers,
            isActive: true,
            retryCount: 3,
            timeoutSeconds: 30,
        });

        // 2. 시스템과 웹훅 연결 (시스템 ID가 제공된 경우)
        let 시스템웹훅관계 = null;
        if (웹훅정보.systemId) {
            // 시스템 존재 확인
            const 시스템 = await this.시스템서비스.findOne({ where: { id: 웹훅정보.systemId } });
            if (!시스템) {
                throw new NotFoundException('시스템을 찾을 수 없습니다.');
            }

            시스템웹훅관계 = await this.시스템웹훅서비스.save({
                systemId: 웹훅정보.systemId,
                webhookId: 새웹훅.id,
                executionCount: 0,
                successCount: 0,
                failureCount: 0,
            });
        }

        return {
            웹훅정보: 새웹훅,
            시스템연결: 시스템웹훅관계,
        };
    }

    /**
     * 웹훅 이벤트를 발생시킵니다
     */
    async 웹훅이벤트발생시키기(이벤트정보: {
        eventType: string;
        entityType: string;
        entityId: string;
        payload: Record<string, any>;
        systemId?: string;
    }) {
        // 1. 해당 이벤트 타입의 활성 웹훅들 조회
        const 대상웹훅들 = await this.웹훅서비스.findByEventType(이벤트정보.eventType);
        const 활성웹훅들 = 대상웹훅들.filter((웹훅) => 웹훅.isActive && 웹훅.entityType === 이벤트정보.entityType);

        if (활성웹훅들.length === 0) {
            return {
                메시지: '발송할 웹훅이 없습니다.',
                이벤트정보,
            };
        }

        // 2. 각 웹훅에 대해 이벤트 로그 생성 및 전송
        const 전송결과들 = await Promise.allSettled(
            활성웹훅들.map(async (웹훅) => {
                // 시스템 제한이 있는 경우 확인
                if (이벤트정보.systemId) {
                    const 시스템웹훅관계 = await this.시스템웹훅서비스.findByWebhookId(웹훅.id);
                    const 허용된시스템 = 시스템웹훅관계.some((관계) => 관계.systemId === 이벤트정보.systemId);

                    if (!허용된시스템) {
                        return { 웹훅아이디: 웹훅.id, 상태: '시스템권한없음' };
                    }
                }

                return this.단일웹훅전송하기(웹훅, 이벤트정보);
            }),
        );

        return {
            이벤트정보,
            대상웹훅수: 활성웹훅들.length,
            전송결과: 전송결과들.map((결과) => (결과.status === 'fulfilled' ? 결과.value : { 오류: 결과.reason })),
        };
    }

    /**
     * 단일 웹훅을 전송합니다
     */
    private async 단일웹훅전송하기(웹훅: any, 이벤트정보: any) {
        // 1. 이벤트 로그 생성
        const 이벤트로그 = await this.웹훅이벤트로그서비스.createEventLog(
            웹훅.id,
            이벤트정보.eventType,
            이벤트정보.entityId,
            이벤트정보.payload,
        );

        try {
            // 2. HTTP 요청 전송 (실제 구현에서는 HTTP 클라이언트 사용)
            const 전송결과 = await this.HTTP요청전송하기(웹훅, 이벤트정보.payload);

            // 3. 성공 시 결과 업데이트
            await this.웹훅이벤트로그서비스.updateEventResult(
                이벤트로그.id,
                전송결과.statusCode,
                JSON.stringify(전송결과.response),
                전송결과.statusCode >= 200 && 전송결과.statusCode < 300,
            );

            // 4. 시스템-웹훅 통계 업데이트
            if (이벤트정보.systemId) {
                await this.시스템웹훅서비스.updateExecutionStats(
                    이벤트정보.systemId,
                    웹훅.id,
                    전송결과.statusCode >= 200 && 전송결과.statusCode < 300,
                );
            }

            return {
                웹훅아이디: 웹훅.id,
                이벤트로그아이디: 이벤트로그.id,
                상태: '성공',
                응답코드: 전송결과.statusCode,
            };
        } catch (오류) {
            // 5. 실패 시 오류 기록
            await this.웹훅이벤트로그서비스.updateEventResult(이벤트로그.id, 500, 오류.message, false);

            return {
                웹훅아이디: 웹훅.id,
                이벤트로그아이디: 이벤트로그.id,
                상태: '실패',
                오류메시지: 오류.message,
            };
        }
    }

    /**
     * 실패한 웹훅을 재시도합니다
     */
    async 웹훅재시도하기(이벤트로그아이디: string) {
        // 1. 이벤트 로그 조회
        const 이벤트로그 = await this.웹훅이벤트로그서비스.findOne({ where: { id: 이벤트로그아이디 } });
        if (!이벤트로그) {
            throw new NotFoundException('이벤트 로그를 찾을 수 없습니다.');
        }

        if (이벤트로그.isSuccess) {
            throw new BadRequestException('이미 성공한 이벤트입니다.');
        }

        // 2. 웹훅 정보 조회
        const 웹훅 = await this.웹훅서비스.findOne({ where: { id: 이벤트로그.webhookId } });
        if (!웹훅) {
            throw new NotFoundException('웹훅을 찾을 수 없습니다.');
        }

        // 3. 재시도 횟수 확인
        if (이벤트로그.attemptCount >= 웹훅.retryCount) {
            throw new BadRequestException('최대 재시도 횟수를 초과했습니다.');
        }

        // 4. 재시도 횟수 증가
        await this.웹훅이벤트로그서비스.incrementAttemptCount(이벤트로그아이디);

        // 5. 웹훅 재전송
        try {
            const 전송결과 = await this.HTTP요청전송하기(웹훅, 이벤트로그.payload);

            await this.웹훅이벤트로그서비스.updateEventResult(
                이벤트로그아이디,
                전송결과.statusCode,
                JSON.stringify(전송결과.response),
                전송결과.statusCode >= 200 && 전송결과.statusCode < 300,
            );

            return {
                이벤트로그아이디,
                재시도결과: '성공',
                응답코드: 전송결과.statusCode,
            };
        } catch (오류) {
            await this.웹훅이벤트로그서비스.updateEventResult(이벤트로그아이디, 500, 오류.message, false);

            return {
                이벤트로그아이디,
                재시도결과: '실패',
                오류메시지: 오류.message,
            };
        }
    }

    /**
     * 웹훅 통계를 조회합니다
     */
    async 웹훅통계조회하기(웹훅아이디?: string) {
        if (웹훅아이디) {
            // 특정 웹훅 통계
            const 성공률정보 = await this.웹훅이벤트로그서비스.getSuccessRateByWebhook(웹훅아이디);
            const 웹훅정보 = await this.웹훅서비스.findOne({ where: { id: 웹훅아이디 } });

            return {
                웹훅정보,
                통계: 성공률정보,
            };
        } else {
            // 전체 웹훅 통계
            const 모든웹훅 = await this.웹훅서비스.findActiveWebhooks();
            const 최근이벤트들 = await this.웹훅이벤트로그서비스.findRecentEvents(100);

            const 총이벤트수 = 최근이벤트들.length;
            const 성공이벤트수 = 최근이벤트들.filter((이벤트) => 이벤트.isSuccess).length;

            return {
                전체통계: {
                    활성웹훅수: 모든웹훅.length,
                    총이벤트수,
                    성공이벤트수,
                    실패이벤트수: 총이벤트수 - 성공이벤트수,
                    성공률: 총이벤트수 > 0 ? (성공이벤트수 / 총이벤트수) * 100 : 0,
                },
                웹훅목록: 모든웹훅,
            };
        }
    }

    /**
     * 웹훅을 비활성화합니다
     */
    async 웹훅비활성화하기(웹훅아이디: string) {
        const 웹훅 = await this.웹훅서비스.findOne({ where: { id: 웹훅아이디 } });
        if (!웹훅) {
            throw new NotFoundException('웹훅을 찾을 수 없습니다.');
        }

        const 업데이트된웹훅 = await this.웹훅서비스.update(웹훅아이디, {
            isActive: false,
        });

        return {
            이전상태: 웹훅.isActive,
            현재상태: false,
            웹훅정보: 업데이트된웹훅,
        };
    }

    /**
     * HTTP 요청을 전송합니다 (실제 구현에서는 axios 등 사용)
     */
    private async HTTP요청전송하기(웹훅: any, payload: any): Promise<{ statusCode: number; response: any }> {
        // 실제 구현에서는 HTTP 클라이언트를 사용하여 실제 요청 전송
        // 여기서는 모의 응답 반환

        const 성공확률 = Math.random();
        if (성공확률 > 0.8) {
            // 20% 확률로 실패
            throw new Error('웹훅 전송 실패');
        }

        return {
            statusCode: 200,
            response: {
                message: '웹훅 처리 완료',
                timestamp: new Date().toISOString(),
                payload,
            },
        };
    }

    /**
     * 시크릿 키를 생성합니다
     */
    private 시크릿키생성하기(): string {
        return `webhook_secret_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    }
}
