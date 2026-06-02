import { CustomButton } from '@/components/shared/CustomButton';
import { Body2, Body6, H1 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { hp, wp } from '../../../../utils/responsiveDevice';


// Note: Replace this with your exact asset component if needed
interface FeatureCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => (
    <View style={styles.card}>
        <View style={styles.iconWrapper}>{icon}</View>
        <View style={styles.cardContent}>
            <Body2 color={Colors.PRIMARY_TEXT} style={{ fontFamily: 'Poppins_600SemiBold' }}>{title}</Body2>
            <Body6 color="#717171" style={{ marginTop: hp(2) }}>{description}</Body6>
        </View>
    </View>
);

interface WelcomeGestlioProps {
    onNext: () => void;
    imageComponent: React.ReactNode; // Placeholder for your custom Illustration/Image component
}

const WelcomeGestlio = ({ onNext, imageComponent }: WelcomeGestlioProps) => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Illustration Wrapper */}
                <View style={styles.imageContainer}>
                    {imageComponent}
                </View>

                {/* Header Typography */}
                <H1 color="#1A1A1A" align="center" style={{ marginBottom: hp(8) }}>
                    Welcome to Gestlio!
                </H1>
                <Body6 color="#555555" align="center" style={{ paddingHorizontal: wp(20), marginBottom: hp(24) }}>
                    Create your first property to organize your cleaning more easily and save time.
                </Body6>

                {/* Features List */}
                <View style={styles.featureList}>
                    <FeatureCard
                        title="Find a trusted housekeeper"
                        description="Select, communicate, and work with total peace of mind."
                        icon={<View style={styles.mockIcon} />} // Replace with your custom SVG icon component
                    />
                    <FeatureCard
                        title="Send your requests in just a few clicks"
                        description="Schedule your cleanings quickly and track their status."
                        icon={<View style={styles.mockIcon} />} // Replace with your custom SVG icon component
                    />
                    <FeatureCard
                        title="Everything is centralized"
                        description="Manage your properties, your communications, and your history all in one place."
                        icon={<View style={styles.mockIcon} />} // Replace with your custom SVG icon component
                    />
                </View>
            </ScrollView>

            {/* Sticky Footer Button */}
            <View style={styles.footer}>
                <CustomButton
                    title="Next"
                    backgroundColor="black"
                    color="white"
                    width="100%"
                    height={hp(54)}
                    borderRadius={12}
                    // onPress={onNext}
                    onPress={() => router.push('/host/onboarding/add_accommodation')} // Replace with actual navigation logic
                />
            </View>
        </View>
    );
};
export default WelcomeGestlio;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    scrollContent: {
        paddingHorizontal: wp(24),
        paddingBottom: hp(100),
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: hp(20),
        marginBottom: hp(16),
    },
    featureList: {
        gap: hp(16),
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: wp(16),
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EAEAEA',
    },
    iconWrapper: {
        marginRight: wp(16),
    },
    mockIcon: {
        width: wp(40),
        height: wp(40),
        borderRadius: 8,
        backgroundColor: '#F0F4F8',
    },
    cardContent: {
        flex: 1,
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