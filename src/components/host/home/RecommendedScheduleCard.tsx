import { CalendarIcon } from '@/assets/icons/cleaner_icon/CalendarIcon';
import { RightAngleIcon } from '@/assets/icons/common_icon/RightAngleIcon';
import { ClockIcon } from '@/assets/icons/host_icon/ClockIcon';
import { Body5, Caption1, Caption3, Caption4, Caption5 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { RecommendedSchedule } from '@/data/hostFakeData';
import { Image } from 'expo-image';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { hp, wp } from '../../../../utils/responsiveDevice';

type Props = {
    data: RecommendedSchedule;
    onPress: () => void;
};

export function RecommendedScheduleCard({ data, onPress }: Props) {
    return (
        <View style={styles.card}>

            <View style={styles.topRow}>
                {/* Thumbnail */}
                <Image
                    source={data.apartmentImage}
                    style={styles.thumb}
                    contentFit="cover"
                />

                {/* Right content */}
                <View style={styles.rightContent}>
                    <Caption1 color={Colors.PRIMARY_TEXT} numberOfLines={1}>
                        {data.apartmentName}
                    </Caption1>

                    <Pressable style={styles.titleRow} onPress={onPress}>
                        <Caption3 color={Colors.TEXT_COLOR}>Next cleaning to schedule</Caption3>
                        <RightAngleIcon size={22} color={Colors.TEXT_COLOR} />
                    </Pressable>

                    <View style={styles.infoRow}>
                        <View style={styles.infoChip}>
                            <CalendarIcon size={13} color={Colors.TEXT_COLOR} />
                            <View>
                                <Caption5 color={Colors.TEXT_COLOR}>Ideal Date:</Caption5>
                                <Caption4 color={Colors.PRIMARY_TEXT}>{data.idealDate}</Caption4>
                            </View>
                        </View>
                        <View style={styles.infoChip}>
                            <ClockIcon size={13} color={Colors.TEXT_COLOR} />
                            <View>
                                <Caption5 color={Colors.TEXT_COLOR}>Time slot:</Caption5>
                                <Caption4 color={Colors.PRIMARY_TEXT}>{data.timeSlot}</Caption4>
                            </View>
                        </View>
                    </View>

                   
                    <View style={styles.cleanerRow}>
                        <Image
                            source={data.cleanerImage}
                            style={styles.cleanerAvatar}
                            contentFit="cover"
                        />
                        <View>
                            <Body5 color={Colors.PRIMARY_TEXT}>{data.cleanerName}</Body5>
                            <Caption3 color={Colors.TEXT_COLOR}>Assigned Cleaner</Caption3>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: wp(14),
        // borderWidth: 1,
        // borderColor: Colors.BORDER_COLOR,
        // overflow: 'hidden',
    },

    // ── Top row ───────────────────────────────────────────────────────────────
    topRow: {
        flexDirection: 'row',
    },
    thumb: {
        width: wp(110),
        height: hp(160),
    },
    rightContent: {
        flex: 1,
        paddingHorizontal: wp(8),
        gap: hp(10),
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(20),
    },

    // ── Chips ─────────────────────────────────────────────────────────────────
    infoRow: {
        flexDirection: 'row',
        gap: wp(6),
        marginTop: hp(2),
    },
    infoChip: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(5),
        backgroundColor: Colors.APP_BACKGROUND,
        // borderRadius: wp(8),
        // borderWidth: 1,
        // borderColor: Colors.BORDER_COLOR,
        // padding: wp(7),
    },

    // ── Cleaner row ───────────────────────────────────────────────────────────
    cleanerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(10),
        // paddingHorizontal: wp(14),
        // paddingVertical: hp(12),
        // marginTop: hp(2), 
        // borderTopWidth: 1,
        // borderTopColor: Colors.BORDER_COLOR,
    },
    cleanerAvatar: {
        width: wp(36),
        height: wp(36),
        borderRadius: wp(18),
    },
});