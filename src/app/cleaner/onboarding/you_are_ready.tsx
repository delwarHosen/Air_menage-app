
import { MenuIcon } from '@/assets/icons/cleaner_icon/MenuIcon';
import { ShieldCheckIcon } from '@/assets/icons/cleaner_icon/ShieldCheckIcon';
import { CustomButton } from '@/components/shared/CustomButton';
import SectionTitle from '@/components/shared/SectionTitle';
import { Body5, Body6, H1 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { hp, wp } from '../../../../utils/responsiveDevice';

export default function YouAreReadyScreen() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleContinue = async () => {
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 900));
        setIsLoading(false);
        router.push('/cleaner/(tabs)');
    };

    return (
        <SafeAreaView style={styles.safe}>
            <SectionTitle title="Gestlio" />

            <ScrollView
                contentContainerStyle={styles.scroll}
                showsVerticalScrollIndicator={false}
            >
                {/* Big checkmark illustration */}
                <View style={styles.checkCircleOuter}>
                    <View style={styles.checkCircleInner}>
                        <View style={styles.checkMark}>
                            <View style={styles.checkShort} />
                            <View style={styles.checkLong} />
                        </View>
                    </View>
                </View>

                <H1 align="center" color={Colors.COLOR_ACTIVE} style={styles.title}>
                    You are ready!
                </H1>
                <Body6 align="center" color={Colors.TEXT_COLOR} style={styles.subtitle}>
                    Your profile has been successfully created.{'\n'}
                    You will start receiving your first missions.
                </Body6>

                {/* Next step card — full width */}
                <View style={styles.nextStepCard}>
                    <View style={styles.nextStepIcon}>
                        <MenuIcon size={22} color={Colors.COLOR_ACTIVE} />
                    </View>
                    <View style={styles.nextStepText}>
                        <Body5 color={Colors.PRIMARY_TEXT}>Next step</Body5>
                        <Body6 color={Colors.TEXT_COLOR}>
                            Explore your personalized dashboard to complete your schedule and set your
                            availability for upcoming missions.
                        </Body6>
                    </View>
                </View>

                {/* Two mini cards side by side */}
                <View style={styles.miniCardsRow}>
                    <View style={styles.miniCard}>
                        <MenuIcon size={26} color={Colors.COLOR_ACTIVE} />
                        <Body5 color={Colors.PRIMARY_TEXT} style={styles.miniCardTitle}>
                            Stay Alerts
                        </Body5>
                        <Body6 color={Colors.TEXT_COLOR}>Push active</Body6>
                    </View>
                    <View style={styles.miniCard}>
                        <ShieldCheckIcon size={26} color={Colors.COLOR_ACTIVE} />
                        <Body5 color={Colors.PRIMARY_TEXT} style={styles.miniCardTitle}>
                            Verified
                        </Body5>
                        <Body6 color={Colors.TEXT_COLOR}>KYC Level 1</Body6>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <CustomButton
                    title="Continue"
                    isLoading={isLoading}
                    disabled={isLoading}
                    onPress={handleContinue}
                    backgroundColor={Colors.BG_BLACK}
                    width="100%"
                    height={hp(54)}
                    borderRadius={wp(14)}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: Colors.APP_BACKGROUND },
    scroll: { paddingHorizontal: wp(20), paddingBottom: hp(20) },
    checkCircleOuter: {
        alignSelf: 'center',
        width: wp(180),
        height: wp(180),
        borderRadius: wp(90),
        backgroundColor: '#D6F5E3',
        borderWidth: 2,
        borderColor: Colors.COLOR_ACTIVE,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: hp(24),
        marginTop: hp(10),
    },
    checkCircleInner: {
        width: wp(120),
        height: wp(120),
        borderRadius: wp(60),
        backgroundColor: Colors.COLOR_ACTIVE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkMark: {
        width: wp(50),
        height: wp(35),
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkShort: {
        position: 'absolute',
        left: wp(4),
        bottom: wp(8),
        width: wp(16),
        height: 3,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        transform: [{ rotate: '45deg' }],
    },
    checkLong: {
        position: 'absolute',
        right: wp(2),
        bottom: wp(4),
        width: wp(30),
        height: 3,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        transform: [{ rotate: '-55deg' }],
    },
    title: { marginBottom: hp(10) },
    subtitle: { marginBottom: hp(28) },
    nextStepCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#E8F9EF',
        borderRadius: wp(14),
        borderWidth: 1,
        borderColor: Colors.COLOR_ACTIVE,
        padding: wp(16),
        gap: wp(12),
        marginBottom: hp(16),
    },
    nextStepIcon: {
        width: wp(44),
        height: wp(44),
        borderRadius: wp(12),
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    nextStepText: { flex: 1, gap: hp(4) },
    miniCardsRow: {
        flexDirection: 'row',
        gap: wp(12),
    },
    miniCard: {
        flex: 1,
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: wp(14),
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        padding: wp(16),
        alignItems: 'flex-start',
        gap: hp(4),
    },
    miniCardTitle: { marginTop: hp(4) },
    footer: {
        paddingHorizontal: wp(20),
        paddingBottom: hp(24),
        paddingTop: hp(10),
        backgroundColor: Colors.APP_BACKGROUND,
    },
});