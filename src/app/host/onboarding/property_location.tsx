import { FormInput } from '@/components/inputForm/inputForm';
import { CustomButton } from '@/components/shared/CustomButton';
import { Body6, H1 } from '@/components/typo/Typography';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { hp, wp } from '../../../../utils/responsiveDevice';

interface PropertyLocationProps {
    onContinue: (data: { address: string; addressLine2: string }) => void;
    mapComponent: React.ReactNode; // Interactive Map rendering handle wrapper
    searchIcon?: React.ReactNode;
}

 const PropertyLocation = ({ onContinue, mapComponent, searchIcon }: PropertyLocationProps) => {
    const [address, setAddress] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [touched, setTouched] = useState(false);

    const handleContinue = () => {
        setTouched(true);
        if (!address.trim()) return;
        onContinue({ address, addressLine2 });
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                <H1 color="#1A1A1A" align="center" style={{ marginTop: hp(20) }}>
                    Where is your property located?
                </H1>
                <Body6 color="#717171" align="center" style={{ marginTop: hp(8), marginBottom: hp(24) }}>
                    Enter the full address so that the housekeepers can find you.
                </Body6>

                <FormInput 
                    label="Add Address"
                    placeholder="add address here"
                    value={address}
                    onChangeText={setAddress}
                    required={true}
                    touched={touched}
                    leftIcon={searchIcon}
                />

                {/* Map Interface Integration Component area */}
                <View style={styles.mapWrapper}>
                    {mapComponent}
                </View>

                <View style={{ marginTop: hp(16) }}>
                    <FormInput 
                        label="Address line 2 (optional)"
                        placeholder="Floor, building, door code..."
                        value={addressLine2}
                        onChangeText={setAddressLine2}
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
                    onPress={handleContinue}
                />
            </View>
        </View>
    );
};

export default PropertyLocation;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    scrollContent: {
        paddingHorizontal: wp(24),
        paddingBottom: hp(100),
    },
    mapWrapper: {
        width: '100%',
        height: hp(200),
        borderRadius: 24,
        overflow: 'hidden',
        marginTop: hp(12),
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