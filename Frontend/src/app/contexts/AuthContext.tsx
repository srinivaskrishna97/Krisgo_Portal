import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user' | 'developer';
  tenantIds: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithMicrosoft: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('portalUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - in production, this would call your IAM service
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      role: 'admin',
      tenantIds: ['tenant-1', 'tenant-2', 'tenant-3']
    };
    
    setUser(mockUser);
    localStorage.setItem('portalUser', JSON.stringify(mockUser));
  };

  const loginWithGoogle = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      role: 'admin',
      tenantIds: ['tenant-1', 'tenant-2', 'tenant-3']
    };
    setUser(mockUser);
    localStorage.setItem('portalUser', JSON.stringify(mockUser));
  };

  const loginWithMicrosoft = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@company.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      role: 'admin',
      tenantIds: ['tenant-1', 'tenant-2', 'tenant-3']
    };
    setUser(mockUser);
    localStorage.setItem('portalUser', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('portalUser');
    localStorage.removeItem('currentTenant');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginWithGoogle,
        loginWithMicrosoft,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
