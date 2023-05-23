import { View, Text, Pressable, TextInput, FlatList, ImageBackground } from 'react-native'
import React, { useLayoutEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Place } from '../PlaceContext';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { places } from '../api';

const PlacesScreen = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerLeft: () => (
                <Pressable onPress={() => navigation.navigate('HomeScreen')} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                    <Text style={{ fontSize: 15, letterSpacing: 1 }}>CHANGE LOCATION</Text>
                </Pressable>
            )
        })
    }, []);

    const { selectedCity, setSelectedCity } = useContext(Place);

    const selectCity = (city) => {
        setSelectedCity(city);
        setTimeout(() => {
            navigation.navigate('HomeScreen');
        }, 800)
    }

    return (
        <View>
            <View
                style={{
                    margin: 10,
                    padding: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderColor: '#E0E0E0',
                    borderWidth: 2,
                    borderRadius: 30
                }}>
                <TextInput placeholder='Search Your City' />
                <Feather name="search" size={24} color="black" />
            </View>

            <View style={{ marginHorizontal: 20, flexDirection: "row", alignItems: 'center', justifyContent: "space-between" }}>
                <Text>Selected Location</Text>
                <Text>{selectedCity}</Text>
            </View>

            <FlatList numColumns={2} columnWrapperStyle={{ justifyContent: 'space-between' }} data={places} renderItem={({ item, index }) => (
                <Pressable key={index} onPress={() => selectCity(item.place)} style={{ marginVertical: 10, marginHorizontal: 20 }}>
                    <ImageBackground source={{ uri: item.image }} style={{ width: 160, height: 100, opacity: 0.8 }} imageStyle={{ borderRadius: 8 }}>
                        {selectedCity === item.place && (
                            <View style={{ flex: 1, marginLeft: 7, marginTop: 7, alignContent: 'flex-start' }}>
                                <AntDesign name="checkcircle" size={24} color="white" />
                            </View>
                        )}
                        <View style={{ flex: 1, marginLeft: 10, marginBottom: 7, justifyContent: 'flex-end' }}>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: "700" }}>{item.place}</Text>
                        </View>
                    </ImageBackground>
                </Pressable>
            )} />
        </View>
    )
}

export default PlacesScreen;