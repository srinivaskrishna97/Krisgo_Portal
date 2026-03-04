import { createBrowserRouter, Navigate } from 'react-router';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PortalLayout } from './components/layout/PortalLayout';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { AppsDirectory } from './pages/AppsDirectory';
import { Notifications } from './pages/Notifications';
import { Profile } from './pages/Profile';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminOverview } from './pages/admin/AdminOverview';
import { Users } from './pages/admin/Users';
import { Tenants } from './pages/admin/Tenants';
import { ActivityLogs } from './pages/admin/ActivityLogs';
import { API } from './pages/admin/API';
import { SystemSettings } from './pages/admin/SystemSettings';
import { Documentation } from './pages/admin/Documentation';
import { AppPlaceholder } from './pages/AppPlaceholder';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <PortalLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'apps',
        element: <AppsDirectory />,
      },
      {
        path: 'notifications',
        element: <Notifications />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'apps/:appId',
        element: <AppPlaceholder />,
      },
      {
        path: 'apps/:appId/*',
        element: <AppPlaceholder />,
      },
      {
        path: 'admin',
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminOverview />,
          },
          {
            path: 'users',
            element: <Users />,
          },
          {
            path: 'tenants',
            element: <Tenants />,
          },
          {
            path: 'activity',
            element: <ActivityLogs />,
          },
          {
            path: 'api',
            element: <API />,
          },
          {
            path: 'system',
            element: <SystemSettings />,
          },
          {
            path: 'docs',
            element: <Documentation />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);