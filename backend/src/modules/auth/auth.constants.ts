export const authCookieNames = {
    refreshToken: 'netlens_refresh_token'
} as const;

export const authErrorMessages = {
    userExists: 'A user with that email already exists.',
    invalidCredentials: 'Email or password is incorrect.',
    invalidRefreshToken: 'Refresh token is invalid or expired.',
    invalidResetToken: 'Reset token is invalid or expired.',
    userNotFound: 'User not found.'
} as const;