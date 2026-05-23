import { Colors } from '@/constants/theme';
import { AuthHeadingProps } from '@/types/iconTypes';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { hp, wp } from '../../../utils/responsiveDevice';
import { Caption1, H2 } from '../typo/Typography';

export const AuthHeading: React.FC<AuthHeadingProps> = ({
    title,
    description,
    style,
    titleColor = Colors.PRIMARY_TEXT,
    descriptionColor = Colors.PLACEHOLDER_TEXT,
    imageSource,
}) => {
    return (
        <View style={[styles.container, style]}>
            {imageSource && (
                <Image
                    source={imageSource}
                    style={styles.headingImage}
                    contentFit="contain"
                />
            )}

            <H2 color={titleColor} align="center">
                {title}
            </H2>

            <Caption1
                italic
                style={styles.description}
                color={descriptionColor}
                align="center"
            >
                {description}
            </Caption1>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: hp(24),
    },
    headingImage: {
        height: hp(70),
        width: wp(70),
        marginBottom: hp(12),
    },
    description: {
        marginTop: hp(6),
        paddingHorizontal: wp(20),
    },
});