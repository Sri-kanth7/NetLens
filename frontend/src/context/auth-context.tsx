import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { clearAccessToken, getAccessToken, setAccessToken } from '../lib/api.js';
import { refresh as refreshSession } from '../services/auth.service.js';
import type { AuthSession, AuthUser } from '../types/auth.types.js';

type AuthContextValue = {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isHydrating: boolean;
  error: string | null;
  applySession: (session: AuthSession) => void;
  clearSession: () => void;
  setAuthError: (message: string | null) => void;
  refreshCurrentSession: () => Promise<AuthSession | null>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function restoreSession(session: AuthSession) {
  setAccessToken(session.tokens.accessToken);
  return session;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessTokenState] = useState<string | null>(getAccessToken());
  const [isHydrating, setIsHydrating] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearSession = () => {
    setUser(null);
    clearAccessToken();
    setAccessTokenState(null);
  };

  const applySession = (session: AuthSession) => {
    restoreSession(session);
    setUser(session.user);
    setAccessTokenState(session.tokens.accessToken);
    setError(null);
  };

  const refreshCurrentSession = async () => {
    try {
      const session = await refreshSession({});
      applySession(session);
      return session;
    } catch (sessionError) {
      clearSession();
      setError(sessionError instanceof Error ? sessionError.message : 'Unable to restore session.');
      return null;
    }
  };

  useEffect(() => {
    void refreshCurrentSession().finally(() => {
      setIsHydrating(false);
    });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      accessToken,
      isAuthenticated: Boolean(user && accessToken),
      isHydrating,
      error,
      applySession,
      clearSession,
      setAuthError: setError,
      refreshCurrentSession
    }),
    [accessToken, error, isHydrating, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
