import { useState } from 'react';
import { Outlet } from 'react-router';
import { TopNavigation } from './TopNavigation';
import { Sidebar } from './Sidebar';

export function PortalLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation 
        onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        mobileMenuOpen={mobileMenuOpen}
      />
      <div className="flex">
        <Sidebar 
          mobileMenuOpen={mobileMenuOpen}
          onMobileMenuClose={() => setMobileMenuOpen(false)}
        />
        <main className="flex-1 min-w-0 overflow-x-hidden p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}