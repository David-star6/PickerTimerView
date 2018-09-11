# PickerTimerView
react-native-iber-PickerTimerView 

    <PickerTimerView ref={ref => this.datePicker = ref}
                // unit={['年', '月', '日']}
                unit={['年', '月', '週']}
                mode={'dateWeek'}
                // selectedDate={this.date.getTime()}
                screenWidth={AppConst.getSize(307)} startYear={2008}
                // DD={false}
                HH={false}
                mm={false}
                ss={false}
                week={0}
                onPickerConfirm={(value) => {
                    this.date = value
                    // let arr = value
                    // let str = ''
                    // arr.map((item) => { str = str + item })
                    // this.setState({ birthday: str })
                }}
                onPickerCancel={() => {

                }}
            />
