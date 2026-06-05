import { RightAngleIcon } from '@/assets/icons/common_icon/RightAngleIcon';
import { Caption1, Caption4, Caption5 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { Task } from '@/data/hostFakeData';
import { Image } from 'expo-image';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { hp, wp } from '../../../../utils/responsiveDevice';

type Props = {
    item: Task;
    onPress: (item: Task) => void;
};

export function ToDoCard({ item, onPress }: Props) {
    return (
        <Pressable style={styles.card} onPress={() => onPress(item)}>
            <Image source={item.apartmentImage} style={styles.image} contentFit="cover" />
            <View style={styles.content}>
                <Caption1 color={"#727272"}>{item.statusLabel}</Caption1>
                <Caption4 color={Colors.PRIMARY_TEXT}>{item.apartmentName}</Caption4>
                <Caption5 color={"#727272"}>{item.timeAgo}</Caption5>
                <View style={styles.cleanerRow}>
                    <Image
                        source={item.cleanerImage}
                        style={styles.avatar}
                        contentFit="cover"
                    />
                    <Caption5 color={Colors.TEXT_COLOR}>{item.cleanerName}</Caption5>
                </View>
            </View>
            <RightAngleIcon size={24} color={Colors.TEXT_COLOR} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: wp(14),
        // borderWidth: 1,
        // borderColor: Colors.BORDER_COLOR,
        // overflow: 'hidden',
        gap: wp(10),
        paddingRight: wp(12),
    },
    image: {
        width: wp(90),
        height: hp(100),
        borderRadius:wp(12)
    },
    content: { flex: 1, gap: hp(3), paddingVertical: hp(10) },
    cleanerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(6),
        marginTop: hp(2),
    },
    avatar: {
        width: wp(22),
        height: wp(22),
        borderRadius: wp(11),
    },
});