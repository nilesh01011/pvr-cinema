import { View, Text, Pressable, Animated, StyleSheet, FlatList } from 'react-native'
import React, { useLayoutEffect, useEffect, useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Place } from '../PlaceContext';
import Header from '../components/Header';
import MovieCard from '../components/MovieCard';
import { data, genres, languages } from '../api';
import { ModalContent, BottomModal, ModalFooter, ModalTitle, SlideAnimation } from 'react-native-modals';
import { Foundation } from '@expo/vector-icons';

const HomeScreen = () => {
    const navigation = useNavigation();
    // const moveAnimation = new Animated.Value(0)
    // useEffect(() => {
    //     Animated.loop(
    //         Animated.timing(moveAnimation, {
    //             toValue: -30,
    //             duration: 2000,
    //             useNativeDriver: true
    //         })
    //     ).start()
    // }, [])
    const [modalVisible, setModalVisible] = useState(false);
    const { selectedCity, setSelectedCity } = useContext(Place);
    const [selectedFilter, setSelectedFilter] = useState();
    const [sortedData, setSortedData] = useState(data);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => <Text>Hello Nilesh Rathod</Text>,
            headerStyle: {
                backgroundColor: '#F5F5F5',
                shadowColor: "transparent",
                shadowOpacity: 0.3,
                shadowOffset: { width: -1, height: 1 },
                shadowRadius: 3
            },
            headerRight: () => (
                <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Ionicons name="notifications-outline" size={24} color="black" />
                    <Ionicons onPress={() => navigation.navigate('Places')} name="ios-location-outline" size={24} color="black" />

                    <Pressable onPress={() => navigation.navigate('Places')}>
                        {/* <Animated.Text
                        style={[styles.text, { transform: [{ translateX: moveAnimation }] }]}
                        >
                        </Animated.Text> */}
                        <Text className='text-[16px]' style={styles.text}>{selectedCity}</Text>
                    </Pressable>
                </Pressable>
            )
        })
    }, [selectedCity]);

    const applyFilter = (filter) => {
        setModalVisible(false);
        if (filter) {
            switch (filter) {
                case "English":
                    setSortedData(sortedData.filter((item) => item.original_language === selectedFilter))
                    break;
                case "Tamil":
                    setSortedData(sortedData.filter((item) => item.original_language === selectedFilter))
                    break;
                case "Hindi":
                    setSortedData(sortedData.filter((item) => item.original_language === selectedFilter))
                    break;
                case "Malayalam":
                    setSortedData(sortedData.filter((item) => item.original_language === selectedFilter))
                    break;
                case "Bengali":
                    setSortedData(sortedData.filter((item) => item.original_language === selectedFilter))
                    break;
                case "Telugu":
                    setSortedData(sortedData.filter((item) => item.original_language === selectedFilter))
                    break;
                default:
                    setSortedData(data);
                    break;
            }
        } else {
            setSortedData(data);
            setModalVisible(false);
        }
    }

    return (
        <View>
            <FlatList numColumns={2} columnWrapperStyle={{ justifyContent: 'space-between' }} ListHeaderComponent={Header} data={sortedData} renderItem={({ item, index }) => (
                <MovieCard key={index} item={item} />
            )} />
            <Pressable onPress={() => setModalVisible(!modalVisible)} style={{ position: "absolute", bottom: 30, alignItems: "center", justifyContent: "center", backgroundColor: '#ffc40c', width: 60, height: 60, borderRadius: 30, right: 20 }}>
                <Foundation name="filter" size={24} color="black" />
            </Pressable>
            <BottomModal
                onBackdropPress={() => setModalVisible(!modalVisible)}
                swipeDirection={["up", "down"]}
                swipeThreshold={200}
                footer={
                    <ModalFooter
                        style={{ backgroundColor: "#ffc40c", }}
                    >
                        <Pressable
                            onPress={() => applyFilter(selectedFilter)}
                            style={{
                                // paddingRight: 10,
                                marginLeft: "auto",
                                marginRight: "auto",
                                marginVertical: 10,
                                marginBottom: 20,
                                paddingTop: 10,
                                // backgroundColor: "white",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                            <Text
                                style={{ width: 150, textAlign: "center", fontSize: 20, fontWeight: "700", color: "white" }}
                            >Apply Filter</Text>
                        </Pressable>
                    </ModalFooter>
                }
                modalTitle={<ModalTitle title='Filters' />}
                modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
                visible={modalVisible}
                onHardwareBackPress={() => setModalVisible(!modalVisible)}
                onTouchOutside={() => setModalVisible(!modalVisible)}
            >
                <ModalContent style={{ width: "100%", height: 280 }}>
                    <Text style={{ paddingVertical: 5, fontSize: 15, fontWeight: "700", marginTop: 10, }}>Language:</Text>
                    <Pressable style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
                        {languages.map((item, index) => (
                            selectedFilter === item.language ? (
                                <Pressable onPress={() => setSelectedFilter()} key={index}
                                    style={{
                                        margin: 10,
                                        marginLeft: 0,
                                        backgroundColor: "orange",
                                        borderColor: 'orange',
                                        borderWidth: 1,
                                        paddingVertical: 5,
                                        paddingHorizontal: 11,
                                        borderRadius: 25,
                                    }}>
                                    <Text style={{ color: 'white' }}>{item.language}</Text>
                                </Pressable>
                            ) : (
                                <Pressable onPress={() => setSelectedFilter(item.language)} key={index}
                                    style={{
                                        margin: 10,
                                        marginLeft: 0,
                                        borderColor: '#C8C8C8',
                                        borderWidth: 1,
                                        paddingVertical: 5,
                                        paddingHorizontal: 11,
                                        borderRadius: 25
                                    }}>
                                    <Text>{item.language}</Text>
                                </Pressable>
                            )
                        ))}
                    </Pressable>
                    <Text style={{ paddingVertical: 5, fontSize: 15, fontWeight: "700", marginTop: 10 }}>Genres:</Text>
                    <Pressable style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
                        {genres.map((item, index) => (
                            <Pressable key={index} style={{ margin: 10, marginLeft: 0, borderColor: '#C8C8C8', borderWidth: 1, paddingVertical: 5, paddingHorizontal: 11, borderRadius: 25 }}>
                                <Text>{item.language}</Text>
                            </Pressable>
                        ))}
                    </Pressable>
                </ModalContent>
            </BottomModal>
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        // width: 80
    }
})