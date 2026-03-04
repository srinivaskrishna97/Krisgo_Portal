import React, { createContext, useContext, useState } from 'react';

export interface Notification {
  id: string;
  type: 'system' | 'application' | 'security' | 'workflow' | 'approval';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  link?: string;
  appName?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'approval',
    title: 'Approval Request',
    message: 'New purchase order requires your approval',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    link: '/apps/finance/approvals/123',
    appName: 'Finance',
  },
  {
    id: '2',
    type: 'workflow',
    title: 'Workflow Completed',
    message: 'Customer onboarding workflow has been completed',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    read: false,
    link: '/apps/customer/workflows/456',
    appName: 'Customer Portal',
  },
  {
    id: '3',
    type: 'system',
    title: 'System Maintenance',
    message: 'Scheduled maintenance on March 5, 2026 at 2:00 AM',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    read: true,
  },
  {
    id: '4',
    type: 'security',
    title: 'New Login Detected',
    message: 'New login from Chrome on Windows',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    read: true,
  },
  {
    id: '5',
    type: 'application',
    title: 'Report Ready',
    message: 'Your monthly analytics report is ready to view',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    read: true,
    link: '/apps/analytics/reports/789',
    appName: 'Analytics',
  },
];

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
