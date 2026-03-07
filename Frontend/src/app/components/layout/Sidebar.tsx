import { Link, useLocation } from 'react-router';
import { Home, Grid3x3, Bell, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../ui/utils';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';

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

interface SidebarProps {
  mobileMenuOpen?: boolean;
  onMobileMenuClose?: () => void;
}

export function Sidebar({ mobileMenuOpen, onMobileMenuClose }: SidebarProps) {
  const location = useLocation();
  const { user } = useAuth();

  const isAdmin = user?.role === 'admin';

  const NavLinks = () => (
    <nav className="p-4 space-y-1">
      {navItems.map(item => {
        if (item.adminOnly && !isAdmin) return null;

        const isActive = location.pathname === item.path || 
          (item.path !== '/' && location.pathname.startsWith(item.path));

        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onMobileMenuClose}
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
  );

  const handleOpenChange = (open: boolean) => {
    if (!open && onMobileMenuClose) {
      onMobileMenuClose();
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 border-r bg-gray-50 min-h-[calc(100vh-4rem)] sticky top-16">
        <NavLinks />
      </aside>

      {/* Mobile Sidebar (Sheet) */}
      <Sheet open={mobileMenuOpen} onOpenChange={handleOpenChange}>
        <SheetContent side="left" className="w-64 p-0 bg-gray-50">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
            <SheetDescription>Navigate to different sections of the portal</SheetDescription>
          </SheetHeader>
          <div className="pt-6">
            <NavLinks />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}