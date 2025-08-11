import dayjs from 'dayjs';

// 플러그인 안전하게 로드
let hasTimezone = false;
try {
    const utc = require('dayjs/plugin/utc');
    const timezone = require('dayjs/plugin/timezone');

    dayjs.extend(utc);
    dayjs.extend(timezone);

    // 기본 타임존 설정
    if (dayjs.tz && dayjs.tz.setDefault) {
        dayjs.tz.setDefault('Asia/Seoul');
        hasTimezone = true;
    }
} catch (error) {
    console.warn('Failed to load dayjs timezone plugins:', error.message);
    hasTimezone = false;
}

class DateUtilWrapper {
    constructor(private date: dayjs.Dayjs) {}

    toDate() {
        return this.date.toDate();
    }

    format(format = 'YYYY-MM-DD HH:mm:ss') {
        return this.date.format(format);
    }

    addDays(days: number) {
        return new DateUtilWrapper(this.date.add(days, 'day'));
    }

    addMinutes(minutes: number) {
        return new DateUtilWrapper(this.date.add(minutes, 'minute'));
    }

    toISOString() {
        return this.date.toISOString();
    }

    toMinutes() {
        return this.date.hour() * 60 + this.date.minute();
    }

    hour(hours: number) {
        return new DateUtilWrapper(this.date.hour(hours));
    }

    minute(minutes: number) {
        return new DateUtilWrapper(this.date.minute(minutes));
    }

    second(seconds: number) {
        return new DateUtilWrapper(this.date.second(seconds));
    }

    getYear() {
        return this.date.year();
    }

    getMonth() {
        return this.date.month() + 1; // dayjs는 0부터 시작하므로 1을 더해줌
    }

    getDate() {
        return this.date.date();
    }

    getDaysInMonth() {
        return this.date.daysInMonth();
    }

    getFirstDayOfMonth() {
        return new DateUtilWrapper(this.date.startOf('month'));
    }

    getLastDayOfMonth() {
        return new DateUtilWrapper(this.date.endOf('month'));
    }
}

export class DateUtil {
    static now() {
        // 타임존 플러그인이 로드되었는지 확인
        if (hasTimezone && dayjs.tz) {
            return new DateUtilWrapper(dayjs().tz('Asia/Seoul'));
        }
        return new DateUtilWrapper(dayjs());
    }

    static date(date: Date | string | number) {
        // 타임존 플러그인이 로드되었는지 확인
        if (hasTimezone && dayjs.tz) {
            return new DateUtilWrapper(dayjs.tz(date, 'Asia/Seoul'));
        }
        return new DateUtilWrapper(dayjs(date));
    }

    static format(date: Date | string | number, format = 'YYYY-MM-DD HH:mm:ss') {
        return this.date(date).format(format);
    }

    static parse(dateString: string) {
        return this.date(dateString);
    }

    static addDays(date: Date | string | number, days: number) {
        return this.date(date).addDays(days);
    }

    static addMinutes(date: Date | string | number, minutes: number) {
        return this.date(date).addMinutes(minutes);
    }

    static toISOString(date: Date | string | number) {
        return this.date(date).toISOString();
    }

    static toMinutes(date: Date | string | number) {
        const d = this.date(date);
        return d.toMinutes();
    }

    static fromMinutes(minutes: number) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return this.now().hour(hours).minute(mins).second(0);
    }

    /**
     * 주어진 날짜의 연도를 가져옵니다.
     */
    static getYear(date: Date | string | number = new Date()) {
        return this.date(date).getYear();
    }

    /**
     * 주어진 날짜의 월을 가져옵니다. (1-12)
     */
    static getMonth(date: Date | string | number = new Date()) {
        return this.date(date).getMonth();
    }

    /**
     * 주어진 날짜의 일을 가져옵니다.
     */
    static getDate(date: Date | string | number = new Date()) {
        return this.date(date).getDate();
    }

    /**
     * 주어진 날짜가 속한 월의 총 일수를 가져옵니다.
     */
    static getDaysInMonth(date: Date | string | number = new Date()) {
        return this.date(date).getDaysInMonth();
    }

    /**
     * 주어진 날짜가 속한 월의 첫 날을 가져옵니다.
     */
    static getFirstDayOfMonth(date: Date | string | number = new Date()) {
        return this.date(date).getFirstDayOfMonth();
    }

    /**
     * 주어진 날짜가 속한 월의 마지막 날을 가져옵니다.
     */
    static getLastDayOfMonth(date: Date | string | number = new Date()) {
        return this.date(date).getLastDayOfMonth();
    }

    // 알람용 범위에 대한 문자열로 변경
    static toAlarmRangeString(startDate: string, endDate: string) {
        const start = dayjs(startDate);
        const end = dayjs(endDate);
        // 날짜가 다르다면 YY.MM.DD(요일) HH:mm ~ YY.MM.DD(요일) HH:mm
        // 날짜가 같다면 YY.MM.DD(요일) HH:mm ~ HH:mm
        if (start.isSame(end, 'day')) {
            return `${this.replaceWeekday(start.format('YY.MM.DD(ddd) HH:mm'))} ~ ${end.format('HH:mm')}`;
        }

        return `${this.replaceWeekday(start.format('YY.MM.DD(ddd) HH:mm'))} ~ ${this.replaceWeekday(
            end.format('YY.MM.DD(ddd) HH:mm'),
        )}`;
    }
    static replaceWeekday(str: string) {
        return str
            .replace('Mon', '월')
            .replace('Tue', '화')
            .replace('Wed', '수')
            .replace('Thu', '목')
            .replace('Fri', '금')
            .replace('Sat', '토')
            .replace('Sun', '일');
    }
}
