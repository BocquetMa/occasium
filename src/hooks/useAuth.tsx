import { useEffect, useState, useCallback } from 'react';
import { get, post } from '../lib/api';

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'USER' | 'ORGANIZER' | 'ADMIN';
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const data = await get<{ user: User | null }>('/auth/me');
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (email: string, password: string) => {
    const data = await post<{ user: User }>('/auth/login', { email, password });
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    await post('/auth/logout');
    setUser(null);
  };

  return { user, loading, login, logout, refetch: fetchUser };
};
