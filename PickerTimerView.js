import React, { Component, UIManager } from 'react';

import {
    Text,
    View,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import AppConst from '../../const/AppConst';

import PickerView from './PickerView';

import TimeUtils from './TimeUtil';

import PropTypes from 'prop-types';

const dateMode = 'date'

const datetimeMode = 'datetime'

const timeMode = 'time'

const dateWeekMode = 'dateWeek'

class PickerTimerView extends Component {

    getSize = AppConst.getSize
    selectedValue = ''
    static propTypes = {
        itemTextColor: PropTypes.string,
        itemSelectedColor: PropTypes.string,
        mode: PropTypes.string,
        selectedDate: PropTypes.number
    }

    static defaultProps = {
        removeSubviews: false,
        itemTextColor: '#CCCCCC',
        itemSelectedColor: '#3364E4',
        itemFontSize: 20,
        onPickerCancel: null,
        onPickerConfirm: null, // 统一返回date
        unit: ['年', '月', '日'],
        mode: 'date', // 'datetime','time' // 'dateWeek'

        selectedDate: new Date().getTime(),  //选中的时间

        // selectedValue: [new Date().getFullYear() + '年', new Date().getMonth() + 1 + '月', new Date().getDate() + '日'],  //选中的时间数组

        startYear: 1990,
        endYear: new Date().getFullYear() + 10,

        confirmText: '确定',
        confirmTextSize: 14,
        confirmTextColor: '#333333',

        cancelText: '取消',
        cancelTextSize: 14,
        cancelTextColor: '#333333',

        itemHeight: 40,
        screenWidth: Dimensions.get('window').width,
        week: 1,
        DD: true,
        HH: true,
        mm: true,
        ss: false
    }

    constructor(props) {
        super(props);
        this.cureenDate = new Date()
        this.setData(this.props.mode)
    }


    setData(mode) {
        const weeks = ['一', '二', '三', '四', '五']
        switch (mode) {
            case dateMode:
                this.selectedValue = [TimeUtils.getFullYear(this.props.selectedDate) + '年', TimeUtils.getMonth(this.props.selectedDate) + '月', TimeUtils.getDate(this.props.selectedDate) + '日']
                this.state = this.getDateList()
                this.callback(this.props.selectedDate)
                break;
            case timeMode:
                this.selectedValue = [TimeUtils.getHours(this.props.selectedDate), TimeUtils.getMinutes(this.props.selectedDate)]
                this.state = this.getTimeDateList();
                this.callback(this.props.selectedDate)
                break;
            case datetimeMode:
                this.selectedValue = [TimeUtils.getMonth(this.props.selectedDate) + '月' + TimeUtils.getDate(this.props.selectedDate) + '日' + TimeUtils.getWeekDay(new Date(this.props.selectedDate)), TimeUtils.getHours(this.props.selectedDate), TimeUtils.getMinutes(this.props.selectedDate)]
                this.state = this.getHoursDateList()
                this.callback(this.props.selectedDate)
                break;
            case dateWeekMode:
                this.selectedValue = [TimeUtils.getFullYear(this.props.selectedDate) + '年', TimeUtils.getMonth(this.props.selectedDate) + '月', '第' + weeks[parseInt(this.props.week)] + this.props.unit[2]]
                this.state = this.getDateWeekList()
                this.callback(this.props.selectedDate)
                break;
        }
    }

    makeCallbackValue(date) {
        const weeks = ['一', '二', '三', '四', '五']
        switch (this.props.mode) {
            case dateMode:
                let dateString = date[0].substr(0, date[0].length - 1) + '-' + date[1].substr(0, date[1].length - 1) + '-' + date[2].substr(0, date[2].length - 1)
                this.callback(TimeUtils.getDateWithString(dateString))
                break;
            case timeMode:
                let timerString = TimeUtils.getFullYear(this.props.selectedDate) + '-' + TimeUtils.getMonth(this.props.selectedDate) + '-' + TimeUtils.getDate(this.props.selectedDate) + ' ' + date[0] + ':' + date[1]
                this.callback(TimeUtils.getDateWithString(timerString))
                break;
            case datetimeMode:
                let dateTimeString = TimeUtils.getFullYear(this.props.selectedDate) + '-' + date[0].match(/(\S*?)月/)[1] + '-' + date[0].match(/月(\S*?)日/)[1] + ' ' + date[1] + ':' + date[2]
                this.callback(TimeUtils.getDateWithString(dateTimeString))
                break;
            case dateWeekMode:
                this.callback(TimeUtils.getDateWeekWithString(date[0].substr(0, date[0].length - 1), date[1].substr(0, date[1].length - 1), date[2].substr(1, date[2].length - 1)));
                break;
        }
    }

    callback(date) {
        this.props.onPickerConfirm && this.props.onPickerConfirm(new Date(date)); // 返回date 类型
    }

    getWeeks(month, day) {
        let time = this.cureenDate.getFullYear() + '-' + month + '-' + day
        let week = TimeUtils.getWeekDay(TimeUtils.getDateWithString(time))
        return week;
    }

    getHoursDateList() {
        let unit = this.props.unit;
        let cureenMonth = TimeUtils.getCurrentMonth(this.props.selectedDate);
        let days = [];
        for (let k = 1; k <= 12; k++) {
            let dayCount = TimeUtils.getDaysInOneMonth(TimeUtils.getCurrentYear(this.props.selectedDate), k);
            for (let i = 1; i <= dayCount; i++) {
                days.push(k + '月' + i + unit[2] + this.getWeeks(k, i));
            }
        }
        let selectedDay = days.indexOf(cureenMonth + '月' + (this.cureenDate.getDate() - 1) + '日')
        if (this.selectedValue) {
            selectedDay = days.indexOf(this.selectedValue[0]) + 1
        }
        pickerData = [days];
        selectedIndex = [parseInt(selectedDay) - 1];

        pickerData.push(this.getHoursArr());
        selectedIndex.push(this.getHoursArr().indexOf(this.getSelectHours()))

        pickerData.push(this.getMinutesArr());
        selectedIndex.push(this.getMinutesArr().indexOf(this.getSelectMintes()))
        let data = {
            pickerData: pickerData,
            selectedIndex: selectedIndex,
        };
        return data;
    }

    getSelectHours() {
        let selectHours = String(TimeUtils.getHours(this.props.selectedDate)) < 10 ? '0' + TimeUtils.getHours(this.props.selectedDate) : TimeUtils.getHours(this.props.selectedDate)
        return String(selectHours)
    }

    getSelectMintes() {
        let selectMinutes = String(TimeUtils.getMinutes(this.props.selectedDate)) < 10 ? '0' + TimeUtils.getMinutes(this.props.selectedDate) : TimeUtils.getMinutes(this.props.selectedDate)
        return String(selectMinutes)
    }


    getTimeDateList() {

        let pickerData = []
        let selectedIndex = []
        pickerData.push(this.getHoursArr());
        selectedIndex.push(this.getHoursArr().indexOf(this.getSelectHours()))

        pickerData.push(this.getMinutesArr());
        selectedIndex.push(this.getMinutesArr().indexOf(this.getSelectMintes()))

        let data = {
            pickerData: pickerData,
            selectedIndex: selectedIndex,
        };
        return data;
    }

    getHoursArr() {
        let hours = [];
        for (let i = 0; i <= 23; i++) {
            let after = i < 10 ? '0' : ''
            hours.push(after + '' + (i) + '');//时
        }
        return hours;
    }

    getSecondsArr() {
        let seconds = [];
        for (let i = 0; i <= 59; i++) {
            let after = i < 10 ? '0' : ''
            seconds.push(after + '' + (i) + ''); //miao
        }
        return seconds
    }

    getMinutesArr() {
        let minutes = [];
        for (let i = 0; i <= 59; i++) {
            let after = i < 10 ? '0' : ''
            minutes.push(after + '' + (i) + '');//分
        }
        return minutes;
    }

    getItemWidthWithMode(index) {
        return this.props.mode != 'datetime' ? this.props.screenWidth / this.state.pickerData.length : index == 0 ? (2 / 3) * this.props.screenWidth : this.getSize(40)
    }



    getDateWeekList() {
        let unit = this.props.unit;
        let years = [];
        let months = [];
        let week = [];

        let startYear = this.props.startYear;
        let endYear = this.props.endYear;
        let numbers = ['一', '二', '三', '四', '五']
        for (let i = 0; i < endYear + 1 - startYear; i++) {
            years.push(i + startYear + unit[0]);
        }
        let selectedYear = years[0];
        if (this.selectedValue) {
            selectedYear = this.selectedValue[0];
        }
        selectedYear = selectedYear.substr(0, selectedYear.length - unit[0].length);
        for (let i = 1; i < 13; i++) {
            months.push(i + unit[1]);
        }

        let selectedMonth = months[0];
        if (this.selectedValue) {
            selectedMonth = this.selectedValue[1];
        }
        selectedMonth = selectedMonth.substr(0, selectedMonth.length - unit[1].length);
        let weekCount = TimeUtils.getDaysInOneMonth(selectedYear, selectedMonth) / 7;
        for (let i = 0; i < weekCount; i++) {
            week.push('第' + numbers[i] + unit[2]);
        }

        let selectedWeek = week[0]
        if (this.selectedValue) {
            selectedWeek = this.selectedValue[2];
        }
        selectedWeek = selectedWeek.substr(1, 1);
        pickerData = [years, months, week];

        selectedIndex = [years.indexOf(selectedYear + unit[0]) == -1 ? years.length - 1 : years.indexOf(selectedYear + unit[0]),
        months.indexOf(selectedMonth + unit[1]),
        week.indexOf('第' + selectedWeek + unit[2]) == -1 ? week.length - 1 : week.indexOf('第' + selectedWeek + unit[2])]

        let data = {
            pickerData: pickerData,
            selectedIndex: selectedIndex,
        };
        return data;
    }


    getDateList() {
        let unit = this.props.unit;
        let years = [];
        let months = [];
        let days = [];

        let startYear = this.props.startYear;
        let endYear = this.props.endYear;
        for (let i = 0; i < endYear + 1 - startYear; i++) {
            years.push(i + startYear + unit[0]);
        }

        let selectedYear = years[0];
        if (this.selectedValue) {
            selectedYear = this.selectedValue[0];
        }
        selectedYear = selectedYear.substr(0, selectedYear.length - unit[0].length);

        for (let i = 1; i < 13; i++) {
            months.push(i + unit[1]);
        }

        let selectedMonth = months[0];
        if (this.selectedValue) {
            selectedMonth = this.selectedValue[1];
        }
        selectedMonth = selectedMonth.substr(0, selectedMonth.length - unit[1].length);

        let dayCount = TimeUtils.getDaysInOneMonth(selectedYear, selectedMonth);
        for (let i = 1; i <= dayCount; i++) {
            days.push(i + unit[2]);
        }

        let selectedDay = days[0];
        if (this.selectedValue) {
            selectedDay = this.selectedValue[2];
        }
        selectedDay = selectedDay.substr(0, selectedDay.length - unit[2].length);

        pickerData = this.props.DD ? [years, months, days] : [years, months,];

        selectedIndex = this.props.DD ? [
            years.indexOf(selectedYear + unit[0]) == -1 ? years.length - 1 : years.indexOf(selectedYear + unit[0]),
            months.indexOf(selectedMonth + unit[1]),
            days.indexOf(selectedDay + unit[2]) == -1 ? days.length - 1 : days.indexOf(selectedDay + unit[2])] : [
                years.indexOf(selectedYear + unit[0]) == -1 ? years.length - 1 : years.indexOf(selectedYear + unit[0]),
                months.indexOf(selectedMonth + unit[1])];

        if (this.props.HH) {
            let hours = [];
            for (let i = 0; i < 24; i++) {
                hours.push((i + 1) + '时');
            }
            pickerData.push(hours);
            if (this.selectedValue) {
                selectedIndex.push((this.selectedValue[3] ? parseInt(this.selectedValue[3]) : new Date().getHours()) - 1);
            } else {
                selectedIndex.push((new Date().getHours() - 1));
            }
            this.selectedValue[3] = (selectedIndex[3] + 1) + '时';
            if (this.props.mm) {
                let minutes = [];
                for (let i = 0; i < 60; i++) {
                    minutes.push((i + 1) + '分');
                }
                pickerData.push(minutes);
                if (this.selectedValue) {
                    selectedIndex.push((this.selectedValue[4] ? parseInt(this.selectedValue[4]) : new Date().getMinutes()) - 1);
                } else {
                    selectedIndex.push((new Date().getMinutes() - 1));
                }
                this.selectedValue[4] = (selectedIndex[4] + 1) + '分';
                if (this.props.ss) {
                    let seconds = [];
                    for (let i = 0; i < 60; i++) {
                        seconds.push((i + 1) + '秒');
                    }
                    pickerData.push(seconds);
                    if (this.selectedValue) {
                        selectedIndex.push((this.selectedValue[5] ? parseInt(this.selectedValue[5]) : 1) - 1);
                    } else {
                        selectedIndex.push(1);
                    }
                    this.selectedValue[5] = (selectedIndex[5] + 1) + '秒';
                }
            }
        }
        let data = {
            pickerData: pickerData,
            selectedIndex: selectedIndex,
        };
        return data;
    }

    _getContentPosition() {
        return { justifyContent: 'flex-end', alignItems: 'center' }
    }

    renderPicker() {
        return this.state.pickerData.map((item, pickerId) => {
            if (item) {
                return <PickerView
                    key={'picker' + pickerId}
                    itemTextColor={this.props.itemTextColor}
                    itemSelectedColor={this.props.itemSelectedColor}
                    list={item}
                    onPickerSelected={(toValue) => {
                        //是否联动的实现位置
                        this.selectedValue[pickerId] = toValue;
                        this.props.mode == 'date' && this.props.DD ? this.setState({ ...this.getDateList() }) : null;
                        this.props.mode == 'dateWeek' ? this.setState({ ...this.getDateWeekList() }) : null;
                        this.makeCallbackValue(this.selectedValue) //数据
                        // this.props.onPickerConfirm(this.props.selectedValue);
                    }}
                    selectedIndex={this.state.selectedIndex[pickerId]}
                    fontSize={this.props.itemFontSize}
                    itemWidth={this.getItemWidthWithMode(pickerId)}
                    // itemWidth={this.props.screenWidth / this.state.pickerData.length}
                    itemHeight={this.props.itemHeight} />
            }
        });
    }

    render() {
        return <View
            style={{
                height: this.props.itemHeight * 5 + this.getSize(15), width: this.props.screenWidth,
            }}>
            <View style={{ width: this.props.screenWidth, height: this.props.itemHeight * 5 + this.getSize(15), flexDirection: 'row', position: 'absolute', bottom: 0 }}>
                {this.renderPicker()}
            </View>
        </View>
    }
}

export default PickerTimerView;

