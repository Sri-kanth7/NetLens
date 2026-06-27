export type AuthUser = {
    id: string;
    fullName: string;
    email: string;
    role: 'owner' | 'admin' | 'technician' | 'viewer' | 'guest';
    avatar: string;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
};

export type AuthTokens = {
    accessToken: string;
    refreshToken: string;
};

export type AuthResponse<TData> = {
    success: boolean;
    message: string;
    data: TData;
    meta: Record<string, unknown>;
};

export type AuthSession = {
    user: AuthUser;
    tokens: AuthTokens;
};

export type RegisterRequest = {
    fullName: string;
    email: string;
    password: string;
    role?: AuthUser['role'];
};

export type LoginRequest = {
    email: string;
    password: string;
};

export type RefreshRequest = {
    refreshToken?: string;
};

export type ForgotPasswordRequest = {
    email: string;
};

export type ResetPasswordRequest = {
    token: string;
    password: string;
};