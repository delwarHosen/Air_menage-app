import { RightAngleIcon } from '@/assets/icons/common_icon/RightAngleIcon';
import { CancelScheduleModal } from '@/components/host/planning/CancelScheduleModal';
import { Caption3, Caption4 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';

import { LIST_EVENTS, ListEvent, PLATFORM_COLORS, PLATFORM_LABELS } from '@/data/planningfakedata';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { hp, wp } from '../../../../utils/responsiveDevice';

export function ListView({ onConnectCalendar }: { onConnectCalendar: () => void }) {
    const router = useRouter();
    const [cancelVisible, setCancelVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<ListEvent | null>(null);

    if (LIST_EVENTS.length === 0) {
        return (
            <View style={styles.emptyState}>
                <Caption3 color={Colors.PRIMARY_TEXT} align="center" style={{ fontFamily: 'Poppins_600SemiBold', marginBottom: hp(8) }}>
                    No Calendars Connected
                </Caption3>
                <Caption3 color={Colors.TEXT_COLOR} align="center" style={{ marginBottom: hp(20) }}>
                    Connect your booking calendar to automatically display your reservations
                </Caption3>
                <Pressable style={styles.connectBtn} onPress={onConnectCalendar}>
                    <Caption3 color="#fff">⊕  Connect my calendar</Caption3>
                </Pressable>
            </View>
        );
    }

    return (
        <>
            <FlatList
                data={LIST_EVENTS}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <Pressable
                        style={styles.row}
                        onPress={() => {
                            setSelectedEvent(item);
                            setCancelVisible(true);
                        }}
                    >
                        {/* Platform icon */}
                        <View style={[styles.platformIcon, { backgroundColor: PLATFORM_COLORS[item.platform] + '20' }]}>
                            <Caption3
                                color={PLATFORM_COLORS[item.platform]}
                                style={{ fontFamily: 'Poppins_600SemiBold' }}
                            >
                                {PLATFORM_LABELS[item.platform]}
                            </Caption3>
                        </View>

                        {/* Left border */}
                        <View style={[styles.leftBorder, { backgroundColor: PLATFORM_COLORS[item.platform] }]} />

                        {/* Content */}
                        <View style={styles.rowContent}>
                            <View style={styles.dateRow}>
                                <Caption4 color={Colors.TEXT_COLOR}>{item.checkIn}</Caption4>
                                <Caption4 color={Colors.TEXT_COLOR}> → </Caption4>
                                <Caption4 color={Colors.TEXT_COLOR}>{item.checkOut}</Caption4>
                            </View>

                            <View style={styles.cleaningRow}>
                                {item.hasManualCleaning ? (
                                    <Pressable
                                        style={styles.plusCircle}
                                        onPress={() =>
                                            router.push('/host/housing/manage_cleaners' as any)
                                        }
                                    >
                                        <Caption4 color={Colors.COLOR_ACTIVE}>+</Caption4>
                                    </Pressable>
                                ) : (
                                    <Image
                                        source={item.cleanerImage}
                                        style={styles.cleanerAvatar}
                                        contentFit="cover"
                                    />
                                )}
                                <View style={{ flex: 1 }}>
                                    <Caption3 color={Colors.PRIMARY_TEXT}>{item.cleaningLabel}</Caption3>
                                    <Caption4 color={Colors.TEXT_COLOR}>{item.cleaningTime}</Caption4>
                                </View>
                                <RightAngleIcon size={14} color={Colors.TEXT_COLOR} />
                            </View>
                        </View>
                    </Pressable>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />

            <CancelScheduleModal
                visible={cancelVisible}
                onClose={() => setCancelVisible(false)}
                onConfirm={() => setCancelVisible(false)}
            />
        </>
    );
}

const styles = StyleSheet.create({
    list: { paddingBottom: hp(100) },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(8),
        paddingVertical: hp(10),
    },
    platformIcon: {
        width: wp(40), height: wp(40),
        borderRadius: wp(10),
        alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
    },
    leftBorder: {
        width: wp(3),
        height: '80%',
        borderRadius: wp(2),
        flexShrink: 0,
    },
    rowContent: { flex: 1, gap: hp(4) },
    dateRow: { flexDirection: 'row', alignItems: 'center' },
    cleaningRow: { flexDirection: 'row', alignItems: 'center', gap: wp(8) },
    cleanerAvatar: {
        width: wp(28), height: wp(28), borderRadius: wp(14),
    },
    plusCircle: {
        width: wp(28), height: wp(28), borderRadius: wp(14),
        borderWidth: 1.5, borderColor: Colors.COLOR_ACTIVE,
        alignItems: 'center', justifyContent: 'center',
    },
    separator: { height: 1, backgroundColor: Colors.BORDER_COLOR },
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