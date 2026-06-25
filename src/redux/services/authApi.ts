import { AuthUser, BaseResponse, VerifyOtpResponse } from "@/types/authTypes";
import { baseApi } from "../api/baseApi";




// ── Auth API ──────────────────────────────────────────────────────────────────
export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // 1. Signup — send otp by email
        signup: builder.mutation<BaseResponse, { email: string }>({
            query: (body) => ({
                url: '/auth/signup',
                method: 'POST',
                body,
            }),
        }),

        // 2. Verify OTP → get token 
        verifyOtp: builder.mutation<VerifyOtpResponse, { email: string; otp: string }>({
            query: (body) => ({
                url: '/auth/verify-otp',
                method: 'POST',
                body,
            }),
        }),

        // 3. Select Role — Bearer token লাগবে (baseApi automatically inject করবে)
        selectRole: builder.mutation<BaseResponse<AuthUser>, { role: 'host' | 'cleaner' }>({
            query: (body) => ({
                url: '/auth/select-role',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Auth'],
        }),

        // 4. Complete Profile — firstName, lastName, password
        completeProfile: builder.mutation<
            BaseResponse<AuthUser>,
            { firstName: string; lastName: string; password: string }
        >({
            query: (body) => ({
                url: '/auth/complete-profile',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Auth'],
        }),

        // Login
        login: builder.mutation<VerifyOtpResponse, { email: string; password: string }>({
            query: (body) => ({
                url: '/auth/signin',
                method: 'POST',
                body,
            }),
        }),

        // Logout
        logout: builder.mutation<BaseResponse, void>({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),

        // Get Profile
        getProfile: builder.query<BaseResponse<AuthUser>, void>({
            query: () => '/auth/onboarding',
            providesTags: ['Auth'],
            keepUnusedDataFor: 0,
        }),

        // Forgot Password
        forgotPassword: builder.mutation<BaseResponse, { email: string }>({
            query: (body) => ({
                url: '/auth/forgot_password',
                method: 'POST',
                body,
            }),
        }),

        // Verify Forgot Password OTP
        verifyForgotPasswordOtp: builder.mutation<
            VerifyOtpResponse,
            { email: string; otp: string }
        >({
            query: (body) => ({
                url: '/auth/forgot_password/verify-otp',
                method: 'POST',
                body,
            }),
        }),

        // Reset Password
        resetPassword: builder.mutation<
            BaseResponse,
            { email: string; new_password: string; confirm_password: string }
        >({
            query: (body) => ({
                url: '/auth/reset_password',
                method: 'POST',
                body,
            }),
        }),

        // Change Password
        changePassword: builder.mutation<
            BaseResponse,
            { old_password: string; new_password: string; confirm_password: string }
        >({
            query: (body) => ({
                url: '/auth/change_password',
                method: 'POST',
                body,
            }),
        }),
    }),
    overrideExisting: true,
});

export const {
    useSignupMutation,
    useVerifyOtpMutation,
    useSelectRoleMutation,
    useCompleteProfileMutation,
    useLoginMutation,
    useLogoutMutation,
    useGetProfileQuery,
    useForgotPasswordMutation,
    useVerifyForgotPasswordOtpMutation,
    useResetPasswordMutation,
    useChangePasswordMutation,
} = authApi;