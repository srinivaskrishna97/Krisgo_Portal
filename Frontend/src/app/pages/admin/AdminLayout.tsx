import { Link, Outlet, useLocation } from 'react-router';
import { Card } from '../../components/ui/card';
import { cn } from '../../components/ui/utils';
import {
  Users,
  Building2,
  Activity,
  Code,
  Settings,
  FileText,
  Shield,
} from 'lucide-react';

const adminNavItems = [
  { name: 'Overview', path: '/admin', icon: Shield },
  { name: 'Users & Permissions', path: '/admin/users', icon: Users },
  { name: 'Tenant Management', path: '/admin/tenants', icon: Building2 },
  { name: 'Activity Logs', path: '/admin/activity', icon: Activity },
  { name: 'API & Developers', path: '/admin/api', icon: Code },
  { name: 'System Settings', path: '/admin/system', icon: Settings },
  { name: 'Documentation', path: '/admin/docs', icon: FileText },
];

export function AdminLayout() {
  const location = useLocation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Administration</h1>
        <p className="text-muted-foreground mt-1">
          Manage your enterprise portal settings and configuration
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Admin Navigation */}
        <Card className="lg:col-span-1 p-4 h-fit">
          <nav className="space-y-1">
            {adminNavItems.map(item => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm',
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </Card>

        {/* Content */}
        <div className="lg:col-span-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
