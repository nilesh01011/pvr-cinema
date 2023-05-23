import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import moment from 'moment'

const Date = ({ date, onSelectDate, selected }) => {
    const day = moment(date).format('ddd');
    const dayNumber = moment(date).format('D');
    const fullDate = moment(date).format('YYYY-MM-DD');
    return (
        <Pressable onPress={() => onSelectDate(fullDate)}
            style={[
                styles.container,
                selected === fullDate && { backgroundColor: "orange" }
            ]}
        >
            <Text style={[styles.day, selected === fullDate && { fontWeight: "700" }]}>{day}</Text>
            <View style={{ height: 10 }}></View>
            <Text style={[styles.number, selected === fullDate && { fontWeight: "700" }]}>{dayNumber}</Text>
        </Pressable >
    )
}

export default Date;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E0E0E0",
        borderRadius: 10,
        borderColor: "#ddd",
        padding: 10,
        width: 83,
        height: 70,
        marginHorizontal: 6,
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    day: {
        fontSize: 14,
        fontWeight: "500",
        width: 30,
        textAlign: "center"
    },
    number: {
        fontSize: 14,
        fontWeight: "500",
        width: 30,
        textAlign: "center"
    }
})