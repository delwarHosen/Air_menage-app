import { ShieldCheckIcon } from '@/assets/icons/cleaner_icon/ShieldCheckIcon';
import { CustomButton } from '@/components/shared/CustomButton';
import { InfoCard } from '@/components/shared/InfoCard';
import SectionTitle from '@/components/shared/SectionTitle';
import { StepIndicator } from '@/components/shared/StepIndicator';
import { Body5, Body6, Caption1, H1 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    TextInput,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { hp, wp } from '../../../../utils/responsiveDevice';

export default function ProfessionalStatusScreen() {
    const router = useRouter();
    const [siret, setSiret] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validate = (): boolean => {
        if (!siret.trim()) {
            setError('SIRET Number is required');
            return false;
        }
        if (!/^\d{14}$/.test(siret.trim())) {
            setError('SIRET Number must be exactly 14 digits');
            return false;
        }
        setError('');
        return true;
    };

    const handleContinue = async () => {
        if (!validate()) return;
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 900));
        setIsLoading(false);
        router.push('/cleaner/onboarding/work-location');
    };

    return (
        <SafeAreaView style={styles.safe}>
            <SectionTitle title="Gestlio" />

            <ScrollView
                contentContainerStyle={styles.scroll}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <StepIndicator
                    totalSteps={5}
                    currentStep={2}
                    activeColor={Colors.COLOR_ACTIVE}
                />

                <H1 color={Colors.PRIMARY_TEXT} style={styles.title}>
                    Lets verify your professional status
                </H1>
                <Body6 color={Colors.TEXT_COLOR} style={styles.subtitle}>
                    Enter your SIRET Number so we can verify your self-employed status
                </Body6>

                <Body5 color={Colors.PRIMARY_TEXT} style={styles.label}>
                    SIRET Number
                </Body5>
                <View style={[styles.inputBox, error ? styles.inputError : null]}>
                    <TextInput
                        style={styles.input}
                        value={siret}
                        onChangeText={(t) => {
                            setSiret(t.replace(/[^0-9]/g, ''));
                            if (error) setError('');
                        }}
                        placeholder="14 Digits"
                        placeholderTextColor={Colors.PLACEHOLDER_TEXT}
                        keyboardType="numeric"
                        maxLength={14}
                    />
                </View>
                {error ? (
                    <Caption1 color={Colors.COLOR_DANGER} style={styles.errorText}>
                        {error}
                    </Caption1>
                ) : null}

                <InfoCard
                    icon={<ShieldCheckIcon size={20} color={Colors.COLOR_ACTIVE} />}
                    title="This verification is secured and only takes a few seconds"
                    style={styles.infoCard}
                />
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
    title: { marginBottom: hp(8), lineHeight: hp(38) },
    subtitle: { marginBottom: hp(28) },
    label: { marginBottom: hp(8) },
    inputBox: {
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: wp(14),
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        paddingHorizontal: wp(16),
        marginBottom: hp(4),
    },
    inputError: { borderColor: Colors.COLOR_DANGER },
    input: {
        height: hp(54),
        color: Colors.PRIMARY_TEXT,
        fontFamily: 'Poppins_400Regular',
        fontSize: wp(15),
    },
    errorText: { marginBottom: hp(10) },
    infoCard: { marginTop: hp(20) },
    footer: {
        paddingHorizontal: wp(20),
        paddingBottom: hp(24),
        paddingTop: hp(10),
        backgroundColor: Colors.APP_BACKGROUND,
    },
});