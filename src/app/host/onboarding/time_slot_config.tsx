import { FormInput } from '@/components/inputForm/inputForm';
import { CustomButton } from '@/components/shared/CustomButton';
import { Body6, H1 } from '@/components/typo/Typography';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { hp, wp } from '../../../../utils/responsiveDevice';


interface TimeSlotConfigProps {
    onContinue: (slots: { start: string; end: string }) => void;
    clockIcon?: React.ReactNode;
    dropdownIcon?: React.ReactNode;
}

export const TimeSlotConfig = ({ onContinue, clockIcon, dropdownIcon }: TimeSlotConfigProps) => {
    const [startTime, setStartTime] = useState('Between: 10:00 AM');
    const [endTime, setEndTime] = useState('And: 4:00 PM');

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <H1 color="#1A1A1A" align="center" style={{ marginTop: hp(20) }}>
                    When should the cleaning take place?
                </H1>
                <Body6 color="#717171" align="center" style={{ marginTop: hp(8), marginBottom: hp(28) }}>
                    Indicate the full time range so that the housekeepers can locate you.
                </Body6>

                <View style={{ gap: hp(12) }}>
                    <FormInput 
                        label="Preferred time slot"
                        value={startTime}
                        onChangeText={setStartTime}
                        editable={false}
                        rightIcon={dropdownIcon}
                    />
                    <FormInput 
                        value={endTime}
                        onChangeText={setEndTime}
                        editable={false}
                        rightIcon={dropdownIcon}
                    />
                </View>

                {/* Info Card Block */}
                <View style={styles.infoCard}>
                    <View style={styles.infoIconContainer}>{clockIcon}</View>
                    <Body6 color="#555555" style={{ flex: 1, marginLeft: wp(12) }}>
                        The housekeeper will intervene within this time slot based on their availability.
                    </Body6>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <CustomButton 
                    title="Continue"
                    backgroundColor="black"
                    color="white"
                    width="100%"
                    height={hp(54)}
                    borderRadius={12}
                    onPress={() => onContinue({ start: startTime, end: endTime })}
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
    infoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F4F7F9',
        borderRadius: 16,
        padding: wp(16),
        marginTop: hp(20),
        borderWidth: 1,
        borderColor: '#E3E9ED',
    },
    infoIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
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