import { Colors } from '@/constants/theme';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { hp, wp } from '../../../utils/responsiveDevice';
import { Body5, Body6 } from '../typo/Typography';


interface InfoCardProps {
    icon: React.ReactNode;
    title: string;
    description?: string;
    style?: ViewStyle;
    iconBgColor?: string;
    /** full-width highlighted card (green bg) */
    highlighted?: boolean;
}

export function InfoCard({
    icon,
    title,
    description,
    style,
    iconBgColor = '#E8F9EF',
    highlighted = false,
}: InfoCardProps) {
    return (
        <View
            style={[
                styles.card,
                highlighted && styles.cardHighlighted,
                style,
            ]}
        >
            <View style={[styles.iconBox, { backgroundColor: iconBgColor }]}>
                {icon}
            </View>
            <View style={styles.text}>
                <Body5 color={Colors.PRIMARY_TEXT}>{title}</Body5>
                {description ? (
                    <Body6  color={Colors.TEXT_COLOR} style={styles.desc}>
                        {description}
                    </Body6>
                ) : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: wp(14),
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        padding: wp(16),
        gap: wp(14),
    },
    cardHighlighted: {
        backgroundColor: '#F0FBF4',
        borderColor: '#C3EDD2',
    },
    iconBox: {
        width: wp(40),
        height: wp(40),
        borderRadius: wp(10),
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    text: {
        flex: 1,
        gap: hp(2),
    },
    desc: {
        marginTop: hp(2),
    },
});