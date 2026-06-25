import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import * as SecureStore from 'expo-secure-store';

export const BASE_URL = 'http://10.10.28.192:6050/api/v1';
export const TOKEN_KEY = 'auth_token';

export const saveToken = async (token: string) => {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
};
export const getToken = async (): Promise<string | null> => {
    return await SecureStore.getItemAsync(TOKEN_KEY);
};
export const deleteToken = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
};

// ── AuthState type locally define করুন — circular import এড়াতে ────────────
interface AuthStateMinimal {
    auth: { token: string | null };
}

// ── Custom baseQuery ──────────────────────────────────────────────────────────
const customBaseQuery: BaseQueryFn<FetchArgs | string, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    const state = api.getState() as AuthStateMinimal; // ← RootState import নয়
    const reduxToken = state.auth.token;
    const token = reduxToken || (await SecureStore.getItemAsync(TOKEN_KEY));

    const modifiedArgs: FetchArgs = typeof args === 'string'
        ? { url: args }
        : { ...args };

    if (token) {
        modifiedArgs.headers = {
            ...(modifiedArgs.headers as Record<string, string> ?? {}),
            Authorization: `Bearer ${token}`,
        };
    }

    return fetchBaseQuery({ baseUrl: BASE_URL })(modifiedArgs, api, extraOptions);
};

// ── Base API ──────────────────────────────────────────────────────────────────
export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: customBaseQuery,
    tagTypes: ['Auth'],
    endpoints: () => ({}),
});