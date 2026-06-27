export type AuthTokens = {
    accessToken: string;
    refreshToken: string;
};

export type PublicAuthUser = {
    id: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
};

export type AuthenticatedRequestUser = {
    id: string;
    email: string;
};

export type AuthResponse<TData> = {
    message: string;
    data: TData;
};

export type RegisterPayload = {
    username: string;
    email: string;
    password: string;
};

export type LoginPayload = {
    email: string;
    password: string;
};

export type RefreshPayload = {
    refreshToken: string;
};

export type ForgotPasswordPayload = {
    email: string;
};

export type ResetPasswordPayload = {
    token: string;
    password: string;
};