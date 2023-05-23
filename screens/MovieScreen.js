import { View, Text, Pressable, FlatList, Image } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import Calendar from '../components/Calendar';
import moment from 'moment';
import { Place } from '../PlaceContext';
import { malls } from '../api';
import { MaterialIcons } from '@expo/vector-icons';
import { NotFound } from '../assets';

const MovieScreen = () => {
    const navigation = useNavigation();

    const route = useRoute();

    const today = moment().format("YYYY-MM-DD");
    const [selectedDate, setSelectedDate] = useState(today);
    const { selectedCity, setSelectedCity } = useContext(Place);
    const [mall, setMall] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: route.params.title,
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

    return (
        <View style={{ marginTop: 10 }}>
            <ScrollView contentContainerStyle={{ marginLeft: 15 }}>
                <Calendar selected={selectedDate} onSelectDate={setSelectedDate} />
            </ScrollView>
            <View style={{ marginLeft: 20, marginVertical: 10 }}>
                <Text style={{ width: "100%", fontWeight: "700", }}>Click to the Muiltiplex Cinemas to show your Movie times.</Text>
            </View>
            {
                !selectedCity && (
                    <View style={{ marginLeft: 18, marginTop: 15, justifyContent: "center", alignItems: "center", width: "100%" }}>
                        <Text style={{ fontSize: 16, fontWeight: "700", width: "100%", color: "red" }}>!Please select your location to get the Muiltiplex Cinemas.</Text>
                        <Image source={
                            NotFound
                        }
                            style={{ width: 100, height: 100, marginTop: 15, justifyContent: "center", alignItems: "center", marginLeft: "auto", marginRight: "auto" }}
                        />
                    </View>
                )
            }

            {
                malls.filter((item) => item.place === selectedCity)
                    .map((item) =>
                        item.galleria.map((muiltiplex, index) => (
                            mall === muiltiplex.name ? (
                                <Pressable onPress={() => setMall(muiltiplex.name)} key={index} style={{ marginHorizontal: 20, marginVertical: 10, borderWidth: 1, borderColor: "orange", borderRadius: 10 }}>
                                    <Text style={{ fontSize: 15, fontWeight: "500", padding: 10, borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: "orange" }}> {muiltiplex.name}</Text>
                                    {mall.includes(muiltiplex.name) ? (
                                        <FlatList numColumns={3} data={muiltiplex.showtimes} renderItem={({ item }) => (
                                            <Pressable onPress={() => navigation.navigate('Theatre', { name: route.params.title, selectedDate: selectedDate, mall: mall, showtime: item })} style={{ borderColor: "green", alignItems: "center", justifyContent: "center", borderWidth: 0.7, padding: 5, width: 80, borderRadius: 5, margin: 8 }}>
                                                <Text style={{ color: "green", fontWeight: "500", width: "100%", textAlign: "center" }}>
                                                    {/* •  */}
                                                    {item}
                                                </Text>
                                            </Pressable>
                                        )}
                                        />
                                    ) : (null)}
                                </Pressable>
                            ) : (
                                <Pressable onPress={() => setMall(muiltiplex.name)} key={index} style={{ marginHorizontal: 20, marginVertical: 10, }}>
                                    <Text style={{ fontSize: 15, fontWeight: "500", textDecorationLine: "underline" }}>• {muiltiplex.name}</Text>
                                    {mall.includes(muiltiplex.name) ? (
                                        <FlatList numColumns={3} data={muiltiplex.showtimes} renderItem={({ item }) => (
                                            <Pressable style={{ borderColor: "green", alignItems: "center", justifyContent: "center", borderWidth: 0.7, padding: 5, width: 80, borderRadius: 5, margin: 8 }}>
                                                <Text style={{ color: "green", fontWeight: "500", width: "100%", textAlign: "center" }}>
                                                    {/* •  */}
                                                    {item}
                                                </Text>
                                            </Pressable>
                                        )}
                                        />
                                    ) : (null)}
                                </Pressable>
                            )
                        )))
            }
        </View>
    )
}

export default MovieScreen