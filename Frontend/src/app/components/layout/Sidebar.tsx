import { Link, useLocation } from 'react-router';
import { Home, Grid3x3, Bell, Settings, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../ui/utils';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
}

const navItems: NavItem[] = [
  { name: 'Home', path: '/', icon: <Home className="h-5 w-5" /> },
  { name: 'Apps', path: '/apps', icon: <Grid3x3 className="h-5 w-5" /> },
  { name: 'Notifications', path: '/notifications', icon: <Bell className="h-5 w-5" /> },
  { name: 'Admin', path: '/admin', icon: <Shield className="h-5 w-5" />, adminOnly: true },
];

export function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();

  const isAdmin = user?.role === 'admin';

  return (
    <aside className="w-64 border-r bg-gray-50 min-h-[calc(100vh-4rem)] sticky top-16">
      <nav className="p-4 space-y-1">
        {navItems.map(item => {
          if (item.adminOnly && !isAdmin) return null;

          const isActive = location.pathname === item.path || 
            (item.path !== '/' && location.pathname.startsWith(item.path));

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              )}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
