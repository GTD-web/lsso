import * as dayjs from 'dayjs';
declare class DateUtilWrapper {
    private date;
    constructor(date: dayjs.Dayjs);
    toDate(): Date;
    format(format?: string): string;
    addDays(days: number): DateUtilWrapper;
    addMinutes(minutes: number): DateUtilWrapper;
    toISOString(): string;
    toMinutes(): number;
    hour(hours: number): DateUtilWrapper;
    minute(minutes: number): DateUtilWrapper;
    second(seconds: number): DateUtilWrapper;
}
export declare class DateUtil {
    static now(): DateUtilWrapper;
    static date(date: Date | string | number): DateUtilWrapper;
    static format(date: Date | string | number, format?: string): string;
    static parse(dateString: string): DateUtilWrapper;
    static addDays(date: Date | string | number, days: number): DateUtilWrapper;
    static addMinutes(date: Date | string | number, minutes: number): DateUtilWrapper;
    static toISOString(date: Date | string | number): string;
    static toMinutes(date: Date | string | number): number;
    static fromMinutes(minutes: number): DateUtilWrapper;
}
export {};
