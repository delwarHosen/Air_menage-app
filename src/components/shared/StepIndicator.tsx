import { StepIndecatorFillIcon } from '@/assets/icons/common_icon/StepIndecatorFillIcon';
import { StepIndecatorIcon } from '@/assets/icons/common_icon/StepIndecatorIcon';
import { Colors } from '@/constants/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { hp, wp } from '../../../utils/responsiveDevice';

interface StepIndicatorProps {
    totalSteps?: number;
    currentStep: number; // 1-indexed; steps <= currentStep are "done"
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
    totalSteps = 4,
    currentStep,
}) => {
    return (
        <View style={styles.row}>
            {Array.from({ length: totalSteps }).map((_, index) => {
                const stepNumber = index + 1;
                const isDone = stepNumber <= currentStep;

                return (
                    <React.Fragment key={index}>
                        {/* Circle — icon swap */}
                        {isDone
                            ? <StepIndecatorFillIcon />
                            : <StepIndecatorIcon />
                        }

                        {/* Connector line */}
                        {index < totalSteps - 1 && (
                            <View style={styles.line} />
                        )}
                    </React.Fragment>
                );
            })}
        </View>
    );
};
const CIRCLE = wp(28);

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(24),
    },
    circle: {
        width: CIRCLE,
        height: CIRCLE,
        borderRadius: CIRCLE / 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
    },
    circleDone: {
        backgroundColor: "#35A9D6",
        borderColor: "#35A9D6",
    },
    circleEmpty: {
        backgroundColor: 'transparent',
        borderColor: "#35A9D6",
    },
    line: {
        flex: 1,
        height: 1.5,
        backgroundColor: "#35A9D6",
    },
    checkWrapper: {
        width: wp(12),
        height: wp(12),
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Simple SVG-style checkmark using two rotated views
    checkL: {
        position: 'absolute',
        width: wp(4),
        height: wp(8),
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        borderColor: 'transparent',
        backgroundColor: "#35A9D6",
        transform: [{ rotate: '-45deg' }, { translateX: -wp(1) }, { translateY: -wp(1) }],
    },
    checkR: {
        position: 'absolute',
        width: wp(4),
        height: wp(8),
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderColor: 'transparent',
        backgroundColor: "#35A9D6",
        transform: [{ rotate: '45deg' }],
    },
    checkColorDone: {
        borderColor: Colors.TEXT_WHITE,
    },
    checkColorEmpty: {
        borderColor: Colors.BORDER_COLOR,
    },
});