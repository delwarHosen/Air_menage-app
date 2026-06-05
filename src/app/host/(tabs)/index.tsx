import { Body2, Body6, Caption1, Caption3, Caption4, Caption5, H2 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';

import { QuickAccess } from '@/components/host/home/QuickAccess';
import { RecommendedScheduleCard } from '@/components/host/home/RecommendedScheduleCard';
import { ToDoCard } from '@/components/host/home/ToDoCard';
import { IMAGE_COMPONENTS } from '@/constants/image.index';
import { RECOMMENDED_SCHEDULE, Task, TODO_TASKS } from '@/data/hostFakeData';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { hp, wp } from '../../../../utils/responsiveDevice';

// ── Empty states ──────────────────────────────────────────────────────────────
function EmptySchedule() {
    return (
        <View style={styles.emptyBox}>
            <Image
                source={IMAGE_COMPONENTS.recomendedEmpty}
                style={styles.emptyImage}
                contentFit="contain"
            />
            <View>
                <Caption1 color={"#727272"}>No Recommended cleaning</Caption1>
                <Caption4 color={"#000000"}>You are up to date! All your upcomming</Caption4>
                <Caption5 color={"#727272"}>Cleanings are scheduled</Caption5>
            </View>
        </View>
    );
}

function EmptyToDo() {
    return (
        <View style={styles.emptyBox}>
            <Image
                source={IMAGE_COMPONENTS.emptyToDo}
                style={styles.emptyImage}
                contentFit="contain"
            />
            <View>
                <Caption1 color={"#727272"}>No task to do</Caption1>
                <Caption4 color={"#000000"}>You have no pending task</Caption4>
                <Caption5 color={"#727272"}>Enjoy your time</Caption5>
            </View>
        </View>
    );
}

// ── Main screen ───────────────────────────────────────────────────────────────
export default function HostHomeScreen() {
    const router = useRouter();

    const handleTaskPress = (item: Task) => {
        router.push({
            pathname: '/host/home/recommended_cleaning',
            params: { taskId: item.id },
        } as any);
    };

   

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView
                contentContainerStyle={styles.scroll}
                showsVerticalScrollIndicator={false}
            >
                {/* Page title */}
                <H2 color={Colors.TEXT_COLOR} style={styles.pageTitle}>Home</H2>

                {/* ── Recommended Schedule ── */}
                <Body2 color={Colors.PRIMARY_TEXT}>Recommended Schedule</Body2>
                <Caption3 color={Colors.TEXT_COLOR} style={styles.sectionSub}>
                    Check the details and validate to launch the mission.
                </Caption3>

                {RECOMMENDED_SCHEDULE ? (
                    <RecommendedScheduleCard
                        data={RECOMMENDED_SCHEDULE}
                        onPress={() =>
                            router.push('/host/home/recommended_cleaning' as any)
                        }
                    />
                ) : (
                    <EmptySchedule />
                )}

                {/* ── To do ── */}
                <Body2 color={Colors.TEXT_COLOR} style={styles.sectionTitle}>
                    To do
                </Body2>
                <Body6 color={Colors.TEXT_COLOR} style={styles.sectionSub}>
                    Find your current tasks and requests here
                </Body6>

                {TODO_TASKS.length === 0 ? (
                    <EmptyToDo />
                ) : (
                    <FlatList
                        data={TODO_TASKS}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <ToDoCard item={item} onPress={handleTaskPress} />
                        )}
                        scrollEnabled={false}
                        contentContainerStyle={styles.todoList}
                    />
                )}

                {/* ── Quick access ── */}
                <Body2 color={Colors.TEXT_COLOR} style={styles.sectionTitle}>
                    Quick access
                </Body2>
                <QuickAccess
                    onSchedule={() => router.push('/host/home/accommodation' as any)}
                    onAddHousekeeper={() => {}}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, 
        backgroundColor: Colors.APP_BACKGROUND
     },
    scroll: { 
        paddingHorizontal: wp(20),
         paddingBottom: hp(80) },
    pageTitle: { marginTop: hp(8), marginBottom: hp(16) },
    sectionTitle: { marginTop: hp(24), marginBottom: hp(4) },
    sectionSub: { marginBottom: hp(12) },
    todoList: { gap: hp(12) },
    emptyBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(16),
        paddingVertical: hp(20),
    },
    emptyImage: { width: wp(80), height: wp(80) },
});