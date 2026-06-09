import { CancelScheduleModal } from '@/components/host/planning/CancelScheduleModal';
import { Caption3, Caption4 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';

import { CALENDAR_EVENTS, CalendarEvent, PLATFORM_COLORS } from '@/data/planningfakedata';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { hp, wp } from '../../../../utils/responsiveDevice';

const DAYS = ['LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM', 'DIM'];
const MONTH = 'Avril 2024';

// April 2024 starts on Monday (day index 0)
const FIRST_DAY_INDEX = 0;
const TOTAL_DAYS = 30;

export function CalendarView({ onConnectCalendar }: { onConnectCalendar: () => void }) {
    const router = useRouter();
    const [cancelVisible, setCancelVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
    const [currentMonth, setCurrentMonth] = useState(0); // offset

    const isConnected = CALENDAR_EVENTS.length > 0;

    // Build grid cells
    const cells: (number | null)[] = [
        ...Array(FIRST_DAY_INDEX).fill(null),
        ...Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1),
    ];
    // Pad to complete last row
    while (cells.length % 7 !== 0) cells.push(null);

    const getEventForDay = (day: number | null) => {
        if (!day) return null;
        return CALENDAR_EVENTS.find((e) => e.date === day);
    };

    const handleCleanerPress = (event: CalendarEvent) => {
        setSelectedEvent(event);
        setCancelVisible(true);
    };

    return (
        <View style={styles.container}>
            {/* Month nav */}
            <View style={styles.monthNav}>
                <Pressable style={styles.navBtn} onPress={() => setCurrentMonth((m) => m - 1)}>
                    <Caption3 color={Colors.PRIMARY_TEXT}>{'<'}</Caption3>
                </Pressable>
                <View style={styles.monthLabel}>
                    <Caption3 color={Colors.PRIMARY_TEXT} style={styles.monthText}>
                        {MONTH}
                    </Caption3>
                    <Caption3 color={Colors.TEXT_COLOR}> ▾</Caption3>
                </View>
                <Pressable style={styles.navBtn} onPress={() => setCurrentMonth((m) => m + 1)}>
                    <Caption3 color={Colors.PRIMARY_TEXT}>{'>'}</Caption3>
                </Pressable>
            </View>

            {/* Day headers */}
            <View style={styles.dayHeaders}>
                {DAYS.map((d) => (
                    <View key={d} style={styles.dayHeaderCell}>
                        <Caption4 color={Colors.TEXT_COLOR}>{d}</Caption4>
                    </View>
                ))}
            </View>

            {!isConnected ? (
                /* Empty state */
                <View style={styles.emptyState}>
                    <Caption3
                        color={Colors.PRIMARY_TEXT}
                        align="center"
                        style={{ fontFamily: 'Poppins_600SemiBold', marginBottom: hp(8) }}
                    >
                        No Calendars Connected
                    </Caption3>
                    <Caption3
                        color={Colors.TEXT_COLOR}
                        align="center"
                        style={{ marginBottom: hp(20) }}
                    >
                        Connect your booking calendar (Airbnb, Booking.com etc.) to automatically display your reservations
                    </Caption3>
                    <Pressable style={styles.connectBtn} onPress={onConnectCalendar}>
                        <Caption3 color="#fff">⊕  Connect my calendar</Caption3>
                    </Pressable>
                </View>
            ) : (
                /* Calendar grid */
                <View style={styles.grid}>
                    {Array.from({ length: cells.length / 7 }).map((_, rowIdx) => {
                        const week = cells.slice(rowIdx * 7, rowIdx * 7 + 7);
                        return (
                            <View key={rowIdx} style={styles.weekRow}>
                                {week.map((day, colIdx) => {
                                    const event = getEventForDay(day as number | null);
                                    return (
                                        <View key={colIdx} style={styles.dayCell}>
                                            {day !== null && (
                                                <Caption4 color={Colors.PRIMARY_TEXT}>{day}</Caption4>
                                            )}

                                            {event?.hasManualCleaning ? (
                                                /* Green + icon */
                                                <Pressable
                                                    style={styles.plusIcon}
                                                    onPress={() =>
                                                        router.push('/host/housing/manage_cleaners' as any)
                                                    }
                                                >
                                                    <Caption4 color={Colors.COLOR_ACTIVE}>+</Caption4>
                                                </Pressable>
                                            ) : event ? (
                                                /* Cleaner avatar */
                                                <Pressable
                                                    onPress={() => handleCleanerPress(event)}
                                                >
                                                    <Image
                                                        source={event.cleanerImage}
                                                        style={styles.cleanerAvatar}
                                                        contentFit="cover"
                                                    />
                                                </Pressable>
                                            ) : null}
                                        </View>
                                    );
                                })}

                                {/* Booking bar row */}
                                <View style={styles.barRowAbsolute} pointerEvents="none">
                                    {week.map((day, colIdx) => {
                                        const event = getEventForDay(day as number | null);
                                        if (!event) return <View key={colIdx} style={styles.barCell} />;
                                        return (
                                            <View
                                                key={colIdx}
                                                style={[
                                                    styles.barCell,
                                                    styles.barFill,
                                                    { backgroundColor: PLATFORM_COLORS[event.platform] + '40' },
                                                ]}
                                            />
                                        );
                                    })}
                                </View>
                            </View>
                        );
                    })}
                </View>
            )}

            <CancelScheduleModal
                visible={cancelVisible}
                onClose={() => setCancelVisible(false)}
                onConfirm={() => setCancelVisible(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },

    // Month nav
    monthNav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: hp(12),
    },
    navBtn: {
        width: wp(36), height: wp(36),
        borderRadius: wp(8),
        backgroundColor: Colors.INPUT_BACKGROUND,
        alignItems: 'center', justifyContent: 'center',
    },
    monthLabel: { flexDirection: 'row', alignItems: 'center' },
    monthText: { fontFamily: 'Poppins_600SemiBold', fontSize: 16 },

    // Day headers
    dayHeaders: { flexDirection: 'row', marginBottom: hp(4) },
    dayHeaderCell: { flex: 1, alignItems: 'center', paddingVertical: hp(4) },

    // Grid
    grid: {},
    weekRow: {
        flexDirection: 'row',
        position: 'relative',
        marginBottom: hp(8),
    },
    dayCell: {
        flex: 1,
        alignItems: 'center',
        minHeight: hp(44),
        paddingTop: hp(2),
        gap: hp(2),
    },
    cleanerAvatar: {
        width: wp(28), height: wp(28),
        borderRadius: wp(14),
    },
    plusIcon: {
        width: wp(28), height: wp(28),
        borderRadius: wp(14),
        borderWidth: 1.5,
        borderColor: Colors.COLOR_ACTIVE,
        alignItems: 'center', justifyContent: 'center',
    },

    // Booking bars
    barRowAbsolute: {
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        flexDirection: 'row',
        height: hp(8),
    },
    barCell: { flex: 1, marginHorizontal: wp(1), borderRadius: wp(4) },
    barFill: {},

    // Empty state
    emptyState: {
        alignItems: 'center',
        paddingHorizontal: wp(20),
        paddingTop: hp(40),
    },
    connectBtn: {
        backgroundColor: Colors.COLOR_ACTIVE,
        paddingHorizontal: wp(24),
        paddingVertical: hp(14),
        borderRadius: wp(12),
    },
});