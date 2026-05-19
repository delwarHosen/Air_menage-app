import { FormInput } from '@/components/inputForm/inputForm';
import { CustomButton } from '@/components/shared/CustomButton';
import { Caption2 } from '@/components/typo/Typography';
import { FORM_FIELDS } from '@/components/ui/form';
import { Colors } from '@/constants/theme';
import { useForm } from '@/hooks/useForm';
import { useRouter } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { validateEmail, validatePassword } from '../../../utils/validation';

export default function LoginScreen() {
    const router = useRouter();

    const { values, errors, touched, handleChange, handleSubmit } = useForm({
        initialValues: {
            [FORM_FIELDS.EMAIL]: '',
            [FORM_FIELDS.PASSWORD]: '',
        },
        validationRules: {
            [FORM_FIELDS.EMAIL]: validateEmail,
            [FORM_FIELDS.PASSWORD]: validatePassword,
        },
        onSubmit: async (values) => {
            console.log('Form submitted:', JSON.stringify(values, null, 2));
        },
    });

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.container}>
                    <View style={{ width: '100%', maxWidth: 500 }}>

                        <View style={styles.form}>
                            <FormInput
                                value={values[FORM_FIELDS.EMAIL]}
                                onChangeText={(text) => handleChange(FORM_FIELDS.EMAIL, text)}
                                type="email"
                                placeholder="Enter Your Email"
                                error={errors[FORM_FIELDS.EMAIL]}
                                touched={touched[FORM_FIELDS.EMAIL]}
                            />

                            <FormInput
                                value={values[FORM_FIELDS.PASSWORD]}
                                onChangeText={(text) => handleChange(FORM_FIELDS.PASSWORD, text)}
                                placeholder="Enter Password"
                                type="password"
                                error={errors[FORM_FIELDS.PASSWORD]}
                                touched={touched[FORM_FIELDS.PASSWORD]}
                            />

                            <CustomButton
                                title="Log in"
                                onPress={handleSubmit}
                                width="100%"
                                height={70}
                                borderRadius={16}
                                style={{ marginTop: 8 }}
                            />
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <View style={styles.forgotPasswordContainer}>

                                <TouchableOpacity
                                    onPress={() => router.push("/(auth)/forgot_password" as any)}
                                >
                                    <Caption2 color={Colors.BRAND_PRIMARY} style={styles.forgotPassword}>
                                        Forgot password?
                                    </Caption2>
                                </TouchableOpacity>

                            </View>

                            <View style={styles.footer}>
                                <Caption2 color={Colors.PLACEHOLLDER_TEXT}>
                                    Don't have an account?
                                </Caption2>
                                <TouchableOpacity>
                                    <Caption2 color={Colors.BRAND_PRIMARY}> Sign up</Caption2>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView >
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        backgroundColor: Colors.APP_BACKGROUND,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    form: {},
    forgotPasswordContainer: {
        alignItems: 'center',
        marginTop: -5,
    },
    forgotPassword: {},
    footer: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});