export type Role = 'host' | 'cleaner' | null;

// ── Single AuthUser interface ─────────────────────────────────────────────────
export interface AuthUser {
    _id: string;
    email: string;
    role: Role;
    firstName?: string;
    lastName?: string;
    name?: string;
    isVerified: boolean;
    isActive: boolean;
    // extra fields
    authProvider?: string;
    languages?: string[];
    servicesOffered?: string[];
    cleaningsCompleted?: number;
    isProfessionalVerified?: boolean;
    kycLevel?: number;
    stripeOnboardingComplete?: boolean;
    payoutsEnabled?: boolean;
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface AuthState {
    token: string | null;
    user: AuthUser | null;
    role: Role;
    isAuthenticated: boolean;
}

export interface BaseResponse<T = null> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
}

export interface VerifyOtpResponse {
    success: boolean;
    statusCode: number;
    message: string;
    token: string;
    data: AuthUser;
}