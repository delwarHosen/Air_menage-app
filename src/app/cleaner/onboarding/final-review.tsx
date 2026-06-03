
import { LocationPinIcon } from '@/assets/icons/cleaner_icon/LocationPinIcon';
import { ShieldCheckIcon } from '@/assets/icons/cleaner_icon/ShieldCheckIcon';

import { MenuIcon } from '@/assets/icons/cleaner_icon/MenuIcon';
import { CustomButton } from '@/components/shared/CustomButton';
import SectionTitle from '@/components/shared/SectionTitle';
import { StepIndicator } from '@/components/shared/StepIndicator';
import { Body5, Body6, Caption3, H1 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { hp, wp } from '../../../../utils/responsiveDevice';

const DEFAULT_REGION = {
    latitude: 51.5074,
    longitude: -0.1278,
    latitudeDelta: 0.15,
    longitudeDelta: 0.15,
};

export default function FinalReviewScreen() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleContinue = async () => {
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 900));
        setIsLoading(false);
        router.push('/cleaner/onboarding/setup_profile');
    };

    return (
        <SafeAreaView style={styles.safe}>
            <SectionTitle title="Gestlio" />

            <ScrollView
                contentContainerStyle={styles.scroll}
                showsVerticalScrollIndicator={false}
            >
                <StepIndicator
                    totalSteps={5}
                    currentStep={4}
                    activeColor={Colors.COLOR_ACTIVE}
                />

                <H1 color={Colors.PRIMARY_TEXT} style={styles.title}>
                    Final Review
                </H1>
                <Body6 color={Colors.TEXT_COLOR} style={styles.subtitle}>
                    Please confirm your profile details before completing the registration.
                </Body6>

                {/* Professional Status card */}
                <View style={styles.infoRow}>
                    <View style={styles.iconBox}>
                        <ShieldCheckIcon size={20} color={Colors.COLOR_ACTIVE} />
                    </View>
                    <View style={styles.infoText}>
                        <Body5 color={Colors.PRIMARY_TEXT}>Professional Status</Body5>
                        <Body6 color={Colors.TEXT_COLOR}>Verified professional</Body6>
                    </View>
                    <View style={styles.verifiedBadge}>
                        <ShieldCheckIcon size={18} color={Colors.BORDER_COLOR} />
                    </View>
                </View>

                {/* Map */}
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={DEFAULT_REGION}
                        scrollEnabled={false}
                        zoomEnabled={false}
                    >
                        <Marker coordinate={{ latitude: 51.5074, longitude: -0.1278 }} />
                        <Circle
                            center={{ latitude: 51.5074, longitude: -0.1278 }}
                            radius={15000}
                            fillColor="rgba(26, 63, 143, 0.15)"
                            strokeColor="rgba(26, 63, 143, 0.35)"
                            strokeWidth={1.5}
                        />
                    </MapView>
                </View>

                {/* Work Location card */}
                <View style={styles.locationCard}>
                    <View style={styles.locationCardHeader}>
                        <Body5 color={Colors.PRIMARY_TEXT}>Work Location</Body5>
                        <Pressable onPress={() => router.push('/cleaner/onboarding/work-location' as any)}>
                            <Body6 color={Colors.COLOR_ACTIVE}>Modify</Body6>
                        </Pressable>
                    </View>
                    <Body5 color={Colors.PRIMARY_TEXT} style={styles.cityText}>
                        San Francisco, CA
                    </Body5>
                    <Body6 color={Colors.TEXT_COLOR} style={styles.bioText}>
                        Tell us a little bit about yourself or your professional background...
                    </Body6>
                    <View style={styles.serviceAreaRow}>
                        <View style={styles.serviceAreaIcon}>
                            <LocationPinIcon size={14} color={Colors.COLOR_ACTIVE} />
                        </View>
                        <Caption3 color={Colors.TEXT_COLOR}>Service area</Caption3>
                        <Caption3 color={Colors.TEXT_COLOR}>  15km radius around London</Caption3>
                    </View>
                </View>

                {/* Identification card */}
                <View style={styles.infoRow}>
                    <View style={styles.iconBox}>
                        <MenuIcon size={20} color={Colors.COLOR_ACTIVE} />
                    </View>
                    <View style={styles.infoText}>
                        <Body5 color={Colors.PRIMARY_TEXT}>Identification</Body5>
                        <Body6 color={Colors.TEXT_COLOR}>Licence #44920</Body6>
                    </View>
                </View>

                {/* Availability card */}
                <View style={styles.infoRow}>
                    <View style={styles.iconBox}>
                        <MenuIcon size={20} color={Colors.COLOR_ACTIVE} />
                    </View>
                    <View style={styles.infoText}>
                        <Body5 color={Colors.PRIMARY_TEXT}>Availability</Body5>
                        <Body6 color={Colors.TEXT_COLOR}>Full-time Ready</Body6>
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
    title: { marginBottom: hp(6) },
    subtitle: { marginBottom: hp(20) },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: wp(14),
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        padding: wp(16),
        marginBottom: hp(12),
        gap: wp(12),
    },
    iconBox: {
        width: wp(40),
        height: wp(40),
        borderRadius: wp(20),
        backgroundColor: '#E8F9EF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoText: { flex: 1, gap: hp(2) },
    verifiedBadge: {
        width: wp(32),
        height: wp(32),
        borderRadius: wp(16),
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapContainer: {
        borderRadius: wp(16),
        overflow: 'hidden',
        height: hp(200),
        marginBottom: hp(12),
    },
    map: { flex: 1 },
    locationCard: {
        backgroundColor: Colors.INPUT_BACKGROUND,
        borderRadius: wp(14),
        borderWidth: 1,
        borderColor: Colors.BORDER_COLOR,
        padding: wp(16),
        marginBottom: hp(12),
        gap: hp(4),
    },
    locationCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(4),
    },
    cityText: { marginBottom: hp(2) },
    bioText: { marginBottom: hp(8) },
    serviceAreaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(6),
    },
    serviceAreaIcon: {
        width: wp(24),
        height: wp(24),
        borderRadius: wp(12),
        backgroundColor: '#E8F9EF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        paddingHorizontal: wp(20),
        paddingBottom: hp(24),
        paddingTop: hp(10),
        backgroundColor: Colors.APP_BACKGROUND,
    },
});