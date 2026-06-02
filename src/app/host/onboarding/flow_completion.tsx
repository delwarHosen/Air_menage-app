import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { CustomButton } from '@/components/shared/CustomButton';
import { Body2, Body6, H1 } from '@/components/typo/Typography';
import { Colors } from '@/constants/theme';
import { hp, wp } from '../../../../utils/responsiveDevice';

interface StepCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const StepCard = ({ title, description, icon }: StepCardProps) => (
    <View style={styles.card}>
        <View style={styles.iconContainer}>{icon}</View>
        <View style={styles.cardContent}>
            <Body2 color={Colors.PRIMARY_TEXT} style={{ fontFamily: 'Poppins_600SemiBold' }}>{title}</Body2>
            <Body6 color="#717171" style={{ marginTop: hp(2) }}>{description}</Body6>
        </View>
    </View>
);

interface FlowCompletionProps {
    title: string;          // Handles dynamic transitions between "Congratulations!" and "And next?"
    description: string;
    buttonColor?: string;
    onFinalize: () => void;
    cardsData: Array<{ title: string; description: string; icon: React.ReactNode }>;
}

export const FlowCompletion = ({ title, description, buttonColor = 'black', onFinalize, cardsData }: FlowCompletionProps) => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <H1 color="#1A1A1A" align="center" style={{ marginTop: hp(40) }}>
                    {title}
                </H1>
                <Body6 color="#717171" align="center" style={{ marginTop: hp(8), marginBottom: hp(32) }}>
                    {description}
                </Body6>

                <View style={{ gap: hp(16) }}>
                    {cardsData.map((item, index) => (
                        <StepCard 
                            key={index}
                            title={item.title}
                            description={item.description}
                            icon={item.icon}
                        />
                    ))}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <CustomButton 
                    title="Confirm and continue"
                    backgroundColor={buttonColor}
                    color="white"
                    width="100%"
                    height={hp(54)}
                    borderRadius={12}
                    onPress={onFinalize}
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
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: wp(16),
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EAEAEA',
    },
    iconContainer: {
        marginRight: wp(16),
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