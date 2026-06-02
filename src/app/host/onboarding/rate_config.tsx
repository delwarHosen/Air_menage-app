import { FormInput } from '@/components/inputForm/inputForm';
import { CustomButton } from '@/components/shared/CustomButton';
import { Body6, H1 } from '@/components/typo/Typography';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { hp, wp } from '../../../../utils/responsiveDevice';


interface RateConfigProps {
    onContinue: (data: { duration: string; rate: string }) => void;
    dropdownIcon?: React.ReactNode;
}

export const RateConfig = ({ onContinue, dropdownIcon }: RateConfigProps) => {
    const [duration, setDuration] = useState('2h30');
    const [rate, setRate] = useState('80 € / cleaning');

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                <H1 color="#1A1A1A" align="center" style={{ marginTop: hp(20) }}>
                    How long does a cleaning take on average?
                </H1>
                <Body6 color="#717171" align="center" style={{ marginTop: hp(8), marginBottom: hp(28) }}>
                    This helps us optimize the organization and the rate.
                </Body6>

                <FormInput 
                    label="Average cleaning duration (Field Label)"
                    value={duration}
                    onChangeText={setDuration}
                    editable={false}
                    rightIcon={dropdownIcon}
                />

                <View style={{ marginTop: hp(20) }}>
                    <FormInput 
                        label="What rate would you like to offer? Proposed rate"
                        value={rate}
                        onChangeText={setRate}
                    />
                </View>

                <Body6 color="#717171" align="center" style={{ marginTop: hp(24) }}>
                    You can modify this rate at any time.
                </Body6>
            </ScrollView>

            <View style={styles.footer}>
                <CustomButton 
                    title="Continue"
                    backgroundColor="black"
                    color="white"
                    width="100%"
                    height={hp(54)}
                    borderRadius={12}
                    onPress={() => onContinue({ duration, rate })}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    scrollContent: {
        paddingHorizontal: wp(24),
        paddingBottom: hp(100),
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: wp(24),
        paddingBottom: hp(34),
        backgroundColor: '#FAFAFA',
    }
});