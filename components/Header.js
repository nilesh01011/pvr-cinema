import { View, Text, ImageBackground, Pressable } from 'react-native'
import React from 'react'

const Header = () => {
    return (
        <View style={{ marginBottom: 55 }}>
            <ImageBackground style={{ height: 200, resizeMode: 'contain' }} source={{
                uri: "https://originserver-static1-uat.pvrcinemas.com/newweb/movies/thumb/374x226/HO00022376.jpg?v=4"
            }}>
                <Pressable style={{ height: 90, backgroundColor: 'white', padding: 10, borderRadius: 5, width: "93%", top: 160, marginLeft: "auto", marginRight: "auto" }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <View>
                            <Text style={{ fontSize: 15, fontWeight: '500' }}>Releasing in 1 Day</Text>
                            <Text style={{ marginVertical: 5, fontSize: 16, fontWeight: '700' }}>CUSTODY</Text>
                            <Text style={{ fontSize: 15, color: 'gray', fontWeight: '500' }}>U.A Telugu</Text>
                        </View>
                        <Pressable style={{ backgroundColor: "#ffc40c", paddingHorizontal: 22, paddingVertical: 10, borderRadius: 6, marginRight: 10, width: 100 }}>
                            <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: "500" }}>BOOK</Text>
                        </Pressable>
                    </View>
                </Pressable>
            </ImageBackground>
        </View>
    )
}

export default Header