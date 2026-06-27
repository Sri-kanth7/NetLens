import { api } from '../lib/api.js';
import type {
    AuthResponse,
    AuthSession,
    ForgotPasswordRequest,
    LoginRequest,
    RefreshRequest,
    RegisterRequest,
    ResetPasswordRequest
} from '../types/auth.types.js';

export async function register(input: RegisterRequest) {
    const response = await api.post<AuthResponse<AuthSession>>('/auth/register', input);
    return response.data.data;
}

export async function login(input: LoginRequest) {
    const response = await api.post<AuthResponse<AuthSession>>('/auth/login', input);
    return response.data.data;
}

export async function refresh(input: RefreshRequest) {
    const response = await api.post<AuthResponse<AuthSession>>('/auth/refresh', input ?? {});
    return response.data.data;
}

export async function logout(input: RefreshRequest) {
    const response = await api.post<{ success: boolean; message: string; data: null; meta: Record<string, unknown> }>('/auth/logout', input ?? {});
    return response.data;
}

export async function forgotPassword(input: ForgotPasswordRequest) {
    const response = await api.post<{ success: boolean; message: string; data: null; meta: Record<string, unknown> }>('/auth/forgot-password', input);
    return response.data;
}

export async function resetPassword(input: ResetPasswordRequest) {
    const response = await api.post<{ success: boolean; message: string; data: null; meta: Record<string, unknown> }>('/auth/reset-password', input);
    return response.data;
}