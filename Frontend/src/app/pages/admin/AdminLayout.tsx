import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../../components/ui/sheet';
import { cn } from '../../components/ui/utils';
import {
  Users,
  Building2,
  Activity,
  Code,
  Settings,
  FileText,
  Shield,
  Menu,
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const AdminNav = () => (
    <nav className="space-y-1">
      {adminNavItems.map(item => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;

        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setMobileMenuOpen(false)}
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
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Administration</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            Manage your enterprise portal settings and configuration
          </p>
        </div>
        {/* Mobile Menu Button */}
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Desktop Admin Navigation */}
        <Card className="hidden lg:block lg:col-span-1 p-4 h-fit">
          <AdminNav />
        </Card>

        {/* Mobile Admin Navigation (Sheet) */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="left" className="w-64">
            <SheetHeader>
              <SheetTitle>Admin Menu</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <AdminNav />
            </div>
          </SheetContent>
        </Sheet>

        {/* Content */}
        <div className="lg:col-span-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}