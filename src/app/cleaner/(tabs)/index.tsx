import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function CleanerHomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>index</Text>
            <TouchableOpacity onPress={() => router.back()}>
                <Text>Back</Text>
            </TouchableOpacity>
        </View>
    )
}