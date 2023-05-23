import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const TheatreScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [selectedSeats, setSelectedSeats] = useState([]);

    const [rows, setRows] = useState([
        {
            row: "A",
            seats: [
                { seat: "1", bookingStatus: "false" },
                { seat: "2", bookingStatus: "false" },
                { seat: "3", bookingStatus: "false" },
                { seat: "4", bookingStatus: "false" },
                { seat: "5", bookingStatus: "false" },
                { seat: "6", bookingStatus: "false" },
                { seat: "7", bookingStatus: "false" },
            ],
        },
        {
            row: "B",
            seats: [
                { seat: "1", bookingStatus: "false" },
                { seat: "2", bookingStatus: "false" },
                { seat: "3", bookingStatus: "false" },
                { seat: "4", bookingStatus: "false" },
                { seat: "5", bookingStatus: "false" },
                { seat: "6", bookingStatus: "false" },
                { seat: "7", bookingStatus: "false" },
            ],
        },
        {
            row: "C",
            seats: [
                { seat: "1", bookingStatus: "false" },
                { seat: "2", bookingStatus: "false" },
                { seat: "3", bookingStatus: "false" },
                { seat: "4", bookingStatus: "false" },
                { seat: "5", bookingStatus: "false" },
                { seat: "6", bookingStatus: "false" },
                { seat: "7", bookingStatus: "false" },
            ],
        },
        {
            row: "D",
            seats: [
                { seat: "1", bookingStatus: "false" },
                { seat: "2", bookingStatus: "false" },
                { seat: "3", bookingStatus: "false" },
                { seat: "4", bookingStatus: "false" },
                { seat: "5", bookingStatus: "false" },
                { seat: "6", bookingStatus: "false" },
                { seat: "7", bookingStatus: "false" },
            ],
        },
    ]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingLeft: 15 }}>
                    <Ionicons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="black" />
                    <Text style={{ fontWeight: "600", fontSize: 16, width: "100%" }}>{route.params.mall}</Text>
                </Pressable>
            ),
            headerTitle: "",
            headerStyle: {
                backgroundColor: '#F5F5F5',
                shadowColor: "transparent",
                shadowOpacity: 0.3,
                shadowOffset: { width: -1, height: 1 },
                shadowRadius: 3,
                alignItems: 'center',
                justifyContent: 'center',
                width: "100%"
            },
        })
    }, []);

    const handleSeatPress = (row, seat) => {
        const isSelected = selectedSeats.some((selectedSeats) => selectedSeats.row === row && selectedSeats.seat === seat);

        if (isSelected) {
            setSelectedSeats((prevState) => prevState.filter((selectedSeat) => selectedSeat.row !== row || selectedSeat.seat !== seat))
        } else {
            setSelectedSeats((prevState) => [...prevState, { row, seat }])
        }
    }

    const renderSeats = () => {
        return rows.map((row, rowIndex) => {
            return (
                <View key={rowIndex} style={{ flexDirection: "row", alignItems: "center", marginBottom: 10, paddingHorizontal: 20 }}>
                    <View style={{ marginRight: 10, width: 40 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", paddingHorizontal: 6, paddingVertical: 10, borderRadius: 5, backgroundColor: "#D8D8D8", textAlign: "center" }}>{row.row}</Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            {row.seats.map((seat, seatIndex) => (
                                <Pressable
                                    onPress={() => handleSeatPress(row.row, seat.seat)} key={seatIndex}
                                    style={[styles.seat, selectedSeats.some((selectedSeats) => selectedSeats.row === row.row && selectedSeats.seat === seat.seat)
                                        && styles.selectedSeat, seat.bookingStatus === "disabled" && styles.bookedSeat]}
                                    disabled={seat.bookingStatus === "disabled"}
                                >
                                    <Text>{seat.seat}</Text>
                                </Pressable>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            )
        })
    }

    const pay = () => {
        const updatedRows = [...rows];

        selectedSeats.forEach((seat) => {
            const rowIndex = updatedRows.findIndex((row) => row.row === seat.row);
            const seatIndex = updatedRows[rowIndex].seats.findIndex((s) => s.seat === seat.seat);

            updatedRows[rowIndex].seats[seatIndex].bookingStatus = 'disabled';
        });

        setRows(updatedRows);
        setSelectedSeats([])
    }

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <Text style={{ marginTop: 10, textAlign: "center", fontSize: 15, }}>SCREEN THIS WAY</Text>
            <Text style={{ marginTop: 10, textAlign: "center", fontSize: 15, color: "gray", marginBottom: 20 }}>CLASSIC (240)</Text>

            {renderSeats()}

            <View style={{ backgroundColor: "#D8D8D8", padding: 10, marginTop: 25, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 30 }}>
                <View>
                    <FontAwesome style={{ textAlign: "center", marginBottom: 4 }} name="square" size={24} color="#ffc40c" />
                    <Text>Selected</Text>
                </View>

                <View >
                    <FontAwesome style={{ textAlign: "center", marginBottom: 4 }} name="square" size={24} color="#fff" />
                    <Text>Vacant</Text>
                </View>

                <View>
                    <FontAwesome style={{ textAlign: "center", marginBottom: 4 }} name="square" size={24} color="gray" />
                    <Text>Booked</Text>
                </View>
            </View>

            <Pressable onPress={pay} style={{ marginTop: 50, backgroundColor: "#E0E0E0", paddingHorizontal: 20, paddingVertical: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text>Select Seats</Text>
                <Text>Pay 100</Text>
            </Pressable>
        </View>
    )
}

export default TheatreScreen;

const styles = StyleSheet.create({
    seat: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        margin: 5,
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#C0C0C0",
    },
    selectedSeat: {
        backgroundColor: "#ffc40c",
        borderColor: "transparent",
    },
    bookedSeat: {
        backgroundColor: "#989898",
        borderColor: "transparent",
    }
})