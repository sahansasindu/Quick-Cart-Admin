import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCookie, setCookie, removeCookie, hasCookie } from '../utils/cookieUtils';

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(hasCookie('access_token'));
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (hasCookie('access_token')) {
      setIsAuthenticated(true);

    }
  }, []);

  const login = (accessToken: string, refreshToken: string) => {
    setCookie('access_token', accessToken);
    setCookie('refresh_token', refreshToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeCookie('access_token');
    removeCookie('refresh_token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
