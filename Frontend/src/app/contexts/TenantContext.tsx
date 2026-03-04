import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Tenant {
  id: string;
  name: string;
  logo?: string;
  description: string;
  domain?: string;
  plan: 'free' | 'professional' | 'enterprise';
  status: 'active' | 'suspended' | 'trial';
}

interface TenantContextType {
  tenants: Tenant[];
  currentTenant: Tenant | null;
  switchTenant: (tenantId: string) => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

const mockTenants: Tenant[] = [
  {
    id: 'tenant-krisgo',
    name: 'Krisgo Solutions',
    logo: '💼',
    description: 'Krisgo Tech Solutions Inc.',
    domain: 'krisgosolutions.com',
    plan: 'enterprise',
    status: 'active',
  },
  {
    id: 'tenant-1',
    name: 'Acme Corporation',
    logo: '🏢',
    description: 'Main corporate headquarters',
    domain: 'acme.com',
    plan: 'enterprise',
    status: 'active',
  },
  {
    id: 'tenant-2',
    name: 'Tech Startup Inc',
    logo: '🚀',
    description: 'Innovation division',
    domain: 'techstartup.io',
    plan: 'professional',
    status: 'active',
  },
  {
    id: 'tenant-3',
    name: 'Retail Store Co',
    logo: '🛍️',
    description: 'Retail operations',
    domain: 'retailstore.com',
    plan: 'professional',
    status: 'trial',
  },
];

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);

  useEffect(() => {
    // Load last selected tenant or default to first
    const savedTenantId = localStorage.getItem('currentTenant');
    if (savedTenantId) {
      const tenant = mockTenants.find(t => t.id === savedTenantId);
      setCurrentTenant(tenant || mockTenants[0]);
    } else {
      setCurrentTenant(mockTenants[0]);
    }
  }, []);

  const switchTenant = (tenantId: string) => {
    const tenant = mockTenants.find(t => t.id === tenantId);
    if (tenant) {
      setCurrentTenant(tenant);
      localStorage.setItem('currentTenant', tenantId);
    }
  };

  return (
    <TenantContext.Provider
      value={{
        tenants: mockTenants,
        currentTenant,
        switchTenant,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
}
