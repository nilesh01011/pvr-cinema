import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import moment from 'moment/moment'
import { ScrollView } from 'react-native'
import Date from './Date'

const Calendar = ({ selected, onSelectDate }) => {
    const [dates, setDates] = useState([])
    const getDates = () => {
        const myDates = [];
        for (let i = 0; i < 5; i++) {
            const date = moment().add(i, 'days');
            myDates.push(date)
        }
        setDates(myDates);
    };

    useEffect(() => {
        getDates();
    }, []);

    return (
        <View style={{ flexDirection: "row", flexWrap: "wrap", paddingRight: 15, }}>
            {/* <ScrollView horizontal style={{ marginHorizontal: 15, }}>
            </ScrollView> */}
            {
                dates.map((date, index) => (
                    <Date date={date} key={index} selected={selected} onSelectDate={onSelectDate} />
                ))
            }
        </View>
    )
}

export default Calendar