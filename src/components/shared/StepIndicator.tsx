import { StepIndecatorFillIcon } from '@/assets/icons/common_icon/StepIndecatorFillIcon';
import { StepIndecatorIcon } from '@/assets/icons/common_icon/StepIndecatorIcon';
import { Colors } from '@/constants/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { hp } from '../../../utils/responsiveDevice';

interface StepIndicatorProps {
    totalSteps?: number;
    currentStep: number;
    activeColor?: string;
    inactiveColor?: string;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
    totalSteps = 4,
    currentStep,
    activeColor = Colors.COLOR_ACTIVE,
    inactiveColor = Colors.BORDER_COLOR,
}) => {
    return (
        <View style={styles.row}>
            {Array.from({ length: totalSteps }).map((_, index) => {
                const stepNumber = index + 1;
                const isDone = stepNumber <= currentStep;

                return (
                    <React.Fragment key={index}>
                        {isDone
                            ? <StepIndecatorFillIcon color={activeColor} />
                            : <StepIndecatorIcon color={inactiveColor} />
                        }
                        {index < totalSteps - 1 && (
                            <View style={[styles.line, { backgroundColor: activeColor }]} />
                        )}
                    </React.Fragment>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(24),
    },
    line: {
        flex: 1,
        height: 1.5,
    },
});