const fallbackAccessSecret = 'netlens-dev-access-secret';
const fallbackRefreshSecret = 'netlens-dev-refresh-secret';
const fallbackResetSecret = 'netlens-dev-reset-secret';

export const authConfig = {
    accessTokenSecret: process.env.JWT_ACCESS_SECRET ?? fallbackAccessSecret,
    refreshTokenSecret: process.env.JWT_REFRESH_SECRET ?? fallbackRefreshSecret,
    resetTokenSecret: process.env.JWT_RESET_SECRET ?? fallbackResetSecret,
    accessTokenExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? '15m',
    refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '7d',
    resetTokenExpiresIn: process.env.JWT_RESET_EXPIRES_IN ?? '1h'
} as const;