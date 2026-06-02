import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { FormInput } from '@/components/inputForm/inputForm';
import { CustomButton } from '@/components/shared/CustomButton';
import { Body2, Body6, H1 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { hp, wp } from '../../../../utils/responsiveDevice';


interface CounterProps {
    label: string;
    value: number;
    onChange: (val: number) => void;
}

const SpecCounter = ({ label, value, onChange }: CounterProps) => (
    <View style={styles.counterContainer}>
        <Body2 color={Colors.PRIMARY_TEXT} style={{ marginBottom: hp(6) }}>{label}</Body2>
        <View style={styles.counterRow}>
            <TouchableOpacity 
                style={styles.counterBtn} 
                onPress={() => onChange(value + 1)}
                activeOpacity={0.7}
            >
                <Body2 color="#1A1A1A">+</Body2>
            </TouchableOpacity>
            
            <Body2 color="#1A1A1A" style={{ fontFamily: 'Poppins_600SemiBold' }}>{value}</Body2>
            
            <TouchableOpacity 
                style={styles.counterBtn} 
                onPress={() => onChange(Math.max(0, value - 1))}
                activeOpacity={0.7}
            >
                <Body2 color="#1A1A1A">—</Body2>
            </TouchableOpacity>
        </View>
    </View>
);

interface PropertySpecsProps {
    onContinue: (specs: { type: string; bedrooms: number; bathrooms: number; surface: string }) => void;
    dropdownIcon?: React.ReactNode;
}

export const PropertySpecs = ({ onContinue, dropdownIcon }: PropertySpecsProps) => {
    const [propertyType, setPropertyType] = useState('Apartment');
    const [bedrooms, setBedrooms] = useState(2);
    const [bathrooms, setBathrooms] = useState(2);
    const [surface, setSurface] = useState('');

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                <H1 color="#1A1A1A" align="center" style={{ marginTop: hp(20) }}>
                    Tell us about your property
                </H1>
                <Body6 color="#717171" align="center" style={{ marginTop: hp(8), marginBottom: hp(24) }}>
                    This information helps us estimate the time and cost of the cleaning.
                </Body6>

                {/* Read-only Dropdown Input Trigger view placeholder */}
                <FormInput
                    label="Property type"
                    value={propertyType}
                    onChangeText={setPropertyType}
                    editable={false}
                    rightIcon={dropdownIcon}
                />

                <View style={{ gap: hp(16), marginTop: hp(12) }}>
                    <SpecCounter label="Number of bedrooms" value={bedrooms} onChange={setBedrooms} />
                    <SpecCounter label="Number of bathrooms" value={bathrooms} onChange={setBathrooms} />
                </View>

                <View style={{ marginTop: hp(16) }}>
                    <FormInput 
                        label="Surface area ($m^2$)"
                        placeholder="Ex: 75"
                        value={surface}
                        onChangeText={setSurface}
                        type="number"
                    />
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
                    onPress={() => onContinue({ type: propertyType, bedrooms, bathrooms, surface })}
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
    counterContainer: {
        width: '100%',
    },
    counterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#EAEAEA',
        borderRadius: 16,
        paddingHorizontal: wp(16),
        height: hp(56),
        backgroundColor: '#FFFFFF',
    },
    counterBtn: {
        padding: wp(10),
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