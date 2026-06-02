import { FormInput } from '@/components/inputForm/inputForm';
import { CustomButton } from '@/components/shared/CustomButton';
import { Body6, H1 } from '@/components/typo/Typography';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { hp, wp } from '../../../../utils/responsiveDevice';


interface AddAccommodationProps {
    onContinue: (data: { name: string; imageUri: string | null }) => void;
    onUploadPress: () => void;
    uploadedImageUri: string | null;
    imageRenderComponent?: React.ReactNode; // For displaying your custom Image / Cover handling
}

 const AddAccommodation = ({ 
    onContinue, 
    onUploadPress, 
    uploadedImageUri, 
    imageRenderComponent 
}: AddAccommodationProps) => {
    const [name, setName] = useState('');
    const [touched, setTouched] = useState(false);

    const handleContinue = () => {
        setTouched(true);
        if (!name.trim()) return;
        
        // Custom loader state standard will be handled at screen container parent
        onContinue({ name, imageUri: uploadedImageUri });
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                <H1 color="#1A1A1A" align="center" style={{ marginTop: hp(20) }}>
                    Let's start with your accommodation
                </H1>
                <Body6 color="#717171" align="center" style={{ marginTop: hp(8), marginBottom: hp(32) }}>
                    Give it a name and add a photo so you can find it easily.
                </Body6>

                {/* Form Input Custom Component */}
                <FormInput 
                    label="Accommodation Name"
                    placeholder="Accommodation name here"
                    value={name}
                    onChangeText={setName}
                    required={true}
                    touched={touched}
                />

                {/* Upload Section Placeholder */}
                <TouchableOpacity 
                    style={styles.uploadBox} 
                    activeOpacity={0.8} 
                    onPress={onUploadPress}
                >
                    {uploadedImageUri && imageRenderComponent ? (
                        imageRenderComponent
                    ) : (
                        <View style={styles.uploadPlaceholder}>
                            {/* Keep space open for your Custom Camera/Upload SVG Icon */}
                            <Body6 color="#717171" style={{ textDecorationLine: 'underline', marginTop: hp(6) }}>
                                Upload here
                            </Body6>
                        </View>
                    )}
                </TouchableOpacity>
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


export default AddAccommodation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    scrollContent: {
        paddingHorizontal: wp(24),
        paddingBottom: hp(100),
    },
    uploadBox: {
        width: '100%',
        height: hp(240),
        borderRadius: 20,
        backgroundColor: '#EBEBEB',
        marginTop: hp(20),
        overflow: 'hidden',
    },
    uploadPlaceholder: {
        flex: 1,
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