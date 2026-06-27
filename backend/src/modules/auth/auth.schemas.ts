import { z } from 'zod';

const passwordSchema = z.string().min(8, 'Password must be at least 8 characters long.');

export const registerSchema = z.object({
    body: z.object({
        username: z.string().min(2).max(80),
        email: z.string().email(),
        password: passwordSchema
    })
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(1)
    })
});

export const refreshSchema = z.object({
    body: z.object({
        refreshToken: z.string().min(1)
    })
});

export const forgotPasswordSchema = z.object({
    body: z.object({
        email: z.string().email()
    })
});

export const resetPasswordSchema = z.object({
    body: z.object({
        token: z.string().min(1),
        password: passwordSchema
    })
});

export const authSchemas = {
    registerSchema,
    loginSchema,
    refreshSchema,
    forgotPasswordSchema,
    resetPasswordSchema
} as const;