import { createContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextType } from '../types/auth';

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  username: null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const saved = await AsyncStorage.getItem('user');
      if (saved) {
        setIsLoggedIn(true);
        setUsername(saved);
      }
    };
    load();
  }, []);

  const login = async (name: string) => {
    await AsyncStorage.setItem('user', name);
    setUsername(name);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setUsername(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, username }}>
      {children}
    </AuthContext.Provider>
  );
}
