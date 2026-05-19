

import { HomeIcon } from "@/assets/icons/common_icon/HomeIcon";
import { HousingIcon } from "@/assets/icons/common_icon/HousingIcon";
import { MenuIcon } from "@/assets/icons/common_icon/MenuIcon";
import { MessageIcon } from "@/assets/icons/common_icon/MessageIcon";
import { PlanningIcon } from "@/assets/icons/common_icon/PlanningIcon";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { hp, wp } from "../../../../utils/responsiveDevice";


const TabIcon = ({ focused, children }: { focused: boolean; children: React.ReactNode }) => (
    <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: focused ? '#fff' : 'transparent',
        borderRadius: 22,
        width: 44,
        height: 44,
        elevation: focused ? 0 : 0,
    }}>
        {children}
    </View>
);

export default function PatientTabsLayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: "#2596BE",
                tabBarInactiveTintColor: "#13193A",
                tabBarStyle: {
                    backgroundColor: "#F8F8F8",
                    height: hp(60) + insets.bottom,
                    position: 'absolute',
                    bottom: 0,
                    left: wp(20),
                    right: wp(20),
                    borderTopWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                    paddingBottom: insets.bottom,
                    paddingTop: 8,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon focused={focused}>
                            <HomeIcon color={color} size={24} />
                        </TabIcon>
                    ),
                }}
            />

            <Tabs.Screen
                name="plannig"
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon focused={focused}>
                            <PlanningIcon color={color} size={24} />
                        </TabIcon>
                    ),
                }}
            />

            <Tabs.Screen
                name="housing"
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon focused={focused}>
                            <HousingIcon color={color} size={24} />
                        </TabIcon>
                    ),
                }}
            />

            <Tabs.Screen
                name="message"
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon focused={focused}>
                            <MessageIcon color={color} size={24} />
                        </TabIcon>
                    ),
                }}
            />

            <Tabs.Screen
                name="menu"
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon focused={focused}>
                            <MenuIcon color={color} size={24} />
                        </TabIcon>
                    ),
                }}
            />
        </Tabs>
    );
}