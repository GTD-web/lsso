"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtil = void 0;
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');
class DateUtilWrapper {
    constructor(date) {
        this.date = date;
    }
    toDate() {
        return this.date.toDate();
    }
    format(format = 'YYYY-MM-DD HH:mm:ss') {
        return this.date.format(format);
    }
    addDays(days) {
        return new DateUtilWrapper(this.date.add(days, 'day'));
    }
    addMinutes(minutes) {
        return new DateUtilWrapper(this.date.add(minutes, 'minute'));
    }
    toISOString() {
        return this.date.toISOString();
    }
    toMinutes() {
        return this.date.hour() * 60 + this.date.minute();
    }
    hour(hours) {
        return new DateUtilWrapper(this.date.hour(hours));
    }
    minute(minutes) {
        return new DateUtilWrapper(this.date.minute(minutes));
    }
    second(seconds) {
        return new DateUtilWrapper(this.date.second(seconds));
    }
}
class DateUtil {
    static now() {
        return new DateUtilWrapper(dayjs().tz('Asia/Seoul'));
    }
    static date(date) {
        return new DateUtilWrapper(dayjs.tz(date, 'Asia/Seoul'));
    }
    static format(date, format = 'YYYY-MM-DD HH:mm:ss') {
        return this.date(date).format(format);
    }
    static parse(dateString) {
        return this.date(dateString);
    }
    static addDays(date, days) {
        return this.date(date).addDays(days);
    }
    static addMinutes(date, minutes) {
        return this.date(date).addMinutes(minutes);
    }
    static toISOString(date) {
        return this.date(date).toISOString();
    }
    static toMinutes(date) {
        const d = this.date(date);
        return d.toMinutes();
    }
    static fromMinutes(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return this.now().hour(hours).minute(mins).second(0);
    }
}
exports.DateUtil = DateUtil;
//# sourceMappingURL=date.util.js.map