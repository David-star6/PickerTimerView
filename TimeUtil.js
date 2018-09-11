import React, { Component } from 'react';

export default class TimeUtil {

    static get weekArr() {
        return ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    }

    static isSameDate(start, end) {
        let startTime = new Date(String(start).length < 13 ? start * 1000 : start)
        let endTime = new Date(String(end).length < 13 ? end * 1000 : end)
        if (startTime.getFullYear() == endTime.getFullYear() && startTime.getMonth() == endTime.getMonth() && startTime.getDate() == endTime.getDate()) {
            return true
        }
        return false
    }

    static getYearyMonthDayText(obj) {
        let date = new Date(obj.toString().length < 13 ? obj * 1000 : obj);
        let time = date.getFullYear() + '年' + parseInt(date.getMonth() + 1) + '月' + date.getDate() + '日'
        return time
    }


    static getHoursMinutesText(obj) {
        let date = new Date(obj.toString().length < 13 ? obj * 1000 : obj);
        let hour = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours();
        let minu = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
        let time = hour + ':' + minu;
        return time
    }

    static getCurrentDate() {
        return TimeUtil.getTimeForTimestamp(TimeUtil.getCurrentTime());
    }

    static getCurrentTime() {
        return Date.parse(new Date());
    }

    static getCurrentDay() {
        var date = new Date();
        return date.getDate()
    }


    static getCurrentYear() {
        var date = new Date();
        return date.getFullYear();
    }

    static getCurrentMonth() {
        let date = new Date();
        return date.getMonth() + 1;
    }

    static getDateWithString(string) {
        let data = string.replace(/-/g, "/")
        let date = new Date(data)
        return date
    }

    static getDateWeekWithString(yeay, month, week) {
        return yeay;
    }

    static getStringWithDate(date) {
        let yeay = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        month = month < 10 ? '0' + month : month
        day = day < 10 ? '0' + day : day
        return yeay + '-' + month + '-' + day
    }

    static getNextTimeForOvertimer(time) {
        let date = new Date(time)
        let netTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + '00'
        return this.getDateWithString(netTime)
    }

    static getCurrentMonthDayWithWeek() {
        return this.getCurrentMonth() + '月' + this.getCurrentDay() + '日' + ' ' + this.getWeekDay(new Date())
    }

    static getYM(timestamp) {
        var date = new Date(timestamp);
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        return year + "年" + month + "月";
    }

    static getDaysInOneMonth(year, month) {
        var d = new Date(year, month, 0);
        return d.getDate();
    }

    static getTimeForTimestamp(timestamp, second = false) {
        var date = new Date(timestamp);
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        if (h >= 0 && h <= 9) {
            h = "0" + h;
        }
        if (m >= 0 && m <= 9) {
            m = "0" + m;
        }
        if (s >= 0 && s <= 9) {
            s = "0" + s;
        }
        if (second) {
            return currentdate = month + "月" + strDate + "日 "
                + h + seperator2 + m + seperator2 + s;
        } else {
            return currentdate = month + "月" + strDate + "日 "
                + h + seperator2 + m;
        }
    }

    static formatTimestamp(timestamp) {
        var day = parseInt(timestamp / (1000 * 60 * 60 * 24));
        var h = parseInt(timestamp % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        var m = parseInt(timestamp % (1000 * 60 * 60) / (1000 * 60));
        var s = parseInt(timestamp % (1000 * 60) / (1000));
        if (h >= 0 && h <= 9) {
            h = "0" + h;
        }
        if (m >= 0 && m <= 9) {
            m = "0" + m;
        }
        if (s >= 0 && s <= 9) {
            s = "0" + s;
        }
        if (day == 0 && h == 0) {
            return m + "分" + s + "秒";
        } else if (day == 0) {
            return h + "時" + m + "分" + s + "秒";
        }
        return day + "天" + h + "時" + m + "分" + s + "秒";
    }

    static isToday(timestamp) {
        var date = new Date(timestamp);
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        date = new Date();
        if (date.getFullYear() == year && date.getMonth() == month && date.getDate() == day) {
            return true;
        }
        return false;
    }

    static isOut(timestamp) {
        return new Date().getTime() > timestamp;
    }

    static isCurrentWeek(timestamp) {
        var now = new Date();
        var day = now.getDay();
        var week = "7123456";
        var first = 0 - week.indexOf(day);
        var f = new Date();
        f.setDate(f.getDate() + first);
        var last = 6 - week.indexOf(day);
        var l = new Date();
        l.setDate(l.getDate() + last);
        if (timestamp >= f.getTime() && timestamp <= l.getTime()) {
            return true;
        }
        return false;
    }


    static compareWithDate(start, end) {
        let startNum = new Date(start).getTime()
        let endNum = new Date(end).getTime()
        return String(startNum) / 1000 <= String(endNum) / 1000 ? false : true
    }

    static getWeekDay(date) {
        return this.weekArr[date.getDay()];
    }

    static getFullYear(num) {
        let time = String(num).length < 13 ? num * 1000 : num
        return new Date(time).getFullYear();
    }

    static getMonth(num) {
        let time = String(num).length < 13 ? num * 1000 : num
        return new Date(time).getMonth() + 1
    }

    static getDate(num) {
        let time = String(num).length < 13 ? num * 1000 : num
        return new Date(time).getDate()
    }

    static getHours(num) {
        let time = String(num).length < 13 ? num * 1000 : num
        return new Date(time).getHours()
    }

    static getMinutes(num) {
        let time = String(num).length < 13 ? num * 1000 : num
        return new Date(time).getMinutes()
    }


    //  比較一個日期距當前日期相差多少天 
    //  與後台保持一致 向上取整
    static getDaysDifferent(timestamp) {
        var nowTimestamp = Date.now();
        let day = Math.ceil((timestamp - nowTimestamp) / (1000 * 3600 * 24));
        return day;
    }

	/**
	 * x分鐘前、x小時前、x天前、x月x日
	 * @param {*} timestamp 
	 */
    static getTimeDifferent(timestamp) {
        var day = parseInt(timestamp / (1000 * 60 * 60 * 24));
        var h = parseInt(timestamp % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        var m = parseInt(timestamp % (1000 * 60 * 60) / (1000 * 60));
        var s = parseInt(timestamp % (1000 * 60) / (1000));
        if (day == 0) {
            if (h == 0) {
                return '剛剛';
            } else {
                return day + '小時前';
            }
        } else {
            if (day <= 2) {
                return day + '天前';
            } else {
                var curY = (new Date()).getFullYear();
                var date = new Date(timestamp);
                var month = date.getMonth() + 1;
                var year = date.getFullYear();
                var day = date.getDate();
                return year + '-' + month + '-' + day;
            }
        }
    }


    static getFormatNumber(i) {
        return (Array(2).join(0) + i).slice(-2)
    }

    static formatVideoTime(number) {
        number = parseInt(number);
        let s = number % 60;
        let m = parseInt(number / 60) % 60;

        return TimeUtil.getFormatNumber(m) + ':'
            + TimeUtil.getFormatNumber(s);
    }



    //  秒的格式轉換 MM:SS
    static formateSecond(num) {
        let minute = Math.floor(num / 60)
        let second = num % 60
        return (Array(2).join(0) + minute).slice(-2) + ':' + (Array(2).join(0) + second).slice(-2)
    }



}