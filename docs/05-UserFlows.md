# 05 - User Flows

## Flow 1: Register and First Login
1. User opens the NetLens website.
2. User chooses Register.
3. User enters full name, email, and password.
4. System validates the form using Zod.
5. Backend hashes the password and creates the user in MongoDB.
6. Backend issues access and refresh tokens.
7. Refresh token is stored securely in an HttpOnly cookie and persisted in MongoDB.
8. User is redirected into the authenticated experience.

## Flow 2: Login and Session Restore
1. User opens the login page.
2. User submits email and password.
3. System validates input and checks credentials.
4. Backend returns access token, refresh token, and user profile.
5. Frontend stores session state in auth context.
6. On reload, the frontend calls refresh or me to restore the session.
7. Protected routes remain accessible as long as the session is valid.

## Flow 3: Logout
1. User clicks logout.
2. Frontend calls logout endpoint.
3. Backend removes refresh token from MongoDB.
4. Backend clears refresh token cookie.
5. Frontend clears local auth state.
6. User returns to the unauthenticated entry experience.

## Flow 4: Forgot Password
1. User opens the forgot password page.
2. User enters the email address.
3. Backend validates the address.
4. If the user exists, a reset token is generated.
5. Reset token is prepared for future secure email delivery.
6. User receives a neutral response regardless of account existence.

## Flow 5: Reset Password
1. User opens the reset password page with a token.
2. User enters a new password.
3. Backend validates the token and new password.
4. Password is hashed with bcrypt and updated in MongoDB.
5. Reset token is invalidated.
6. User can log in again with the new password.

## Flow 6: Protected Dashboard Access
1. User requests a protected page.
2. Frontend checks auth context.
3. If no session is present, frontend attempts refresh.
4. If refresh fails, user is redirected to login.
5. If refresh succeeds, user stays on the page.

## Flow 7: Future Multi-Tenant Network Navigation
1. User selects an organization.
2. User selects a network inside that organization.
3. Dashboard loads data scoped to that tenant boundary.
4. Devices, alerts, and analytics are filtered by the selected scope.

## Flow 8: Collector Ingestion
1. Collector agent gathers network data.
2. Collector sends data to the backend API.
3. Backend validates, stores, and processes the payload.
4. Frontend reads the resulting dashboard and analytics data.
5. Frontend never communicates with routers directly.
