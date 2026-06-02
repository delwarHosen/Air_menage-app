import { CustomButton } from '@/components/shared/CustomButton';
import { Body2, Body6, H1 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { hp, wp } from '../../../../utils/responsiveDevice';

interface SummaryRowProps {
    label: string;
    value: string;
    onEdit: () => void;
}

const SummaryRow = ({ label, value, onEdit }: SummaryRowProps) => (
    <View style={styles.rowContainer}>
        <Body2 color="#717171" style={{ marginBottom: hp(4) }}>{label}</Body2>
        <View style={styles.contentRow}>
            <Body2 color={Colors.PRIMARY_TEXT} style={{ flex: 1, fontFamily: 'Poppins_500Medium' }}>{value}</Body2>
            <TouchableOpacity onPress={onEdit} activeOpacity={0.7}>
                <Body2 color="#0080FF" style={{ fontFamily: 'Poppins_500Medium' }}>Edit</Body2>
            </TouchableOpacity>
        </View>
    </View>
);

interface PropertySummaryProps {
    summaryData: {
        name: string;
        address: string;
        type: string;
        specs: string;
        timeSlot: string;
        duration: string;
        rate: string;
        housekeeper: string;
    };
    onEditSection: (section: string) => void;
    onSubmit: () => void;
    isSubmitting: boolean; // Managed by container API layout
}

export const PropertySummary = ({ summaryData, onEditSection, onSubmit, isSubmitting }: PropertySummaryProps) => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <H1 color="#1A1A1A" align="center" style={{ marginTop: hp(20) }}>
                    Summary
                </H1>
                <Body6 color="#717171" align="center" style={{ marginTop: hp(8), marginBottom: hp(24) }}>
                    Verify your property information before continuing.
                </Body6>

                <View style={{ gap: hp(16) }}>
                    <SummaryRow label="Property name" value={summaryData.name} onEdit={() => onEditSection('name')} />
                    <SummaryRow label="Address" value={summaryData.address} onEdit={() => onEditSection('address')} />
                    <SummaryRow label="Type" value={summaryData.type} onEdit={() => onEditSection('type')} />
                    <SummaryRow label="Bedrooms / Bathrooms" value={summaryData.specs} onEdit={() => onEditSection('specs')} />
                    <SummaryRow label="Time slot" value={summaryData.timeSlot} onEdit={() => onEditSection('timeSlot')} />
                    <SummaryRow label="Average duration" value={summaryData.duration} onEdit={() => onEditSection('duration')} />
                    <SummaryRow label="Proposed rate" value={summaryData.rate} onEdit={() => onEditSection('rate')} />
                    <SummaryRow label="Housekeeper" value={summaryData.housekeeper} onEdit={() => onEditSection('housekeeper')} />
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <CustomButton 
                    title="Confirm and continue"
                    backgroundColor="black"
                    color="white"
                    width="100%"
                    height={hp(54)}
                    borderRadius={12}
                    isLoading={isSubmitting} // Standard component injection trigger active
                    onPress={onSubmit}
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
    rowContainer: {
        width: '100%',
    },
    contentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EAEAEA',
        borderRadius: 16,
        paddingHorizontal: wp(16),
        height: hp(56),
        backgroundColor: '#FFFFFF',
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