import { Outlet } from 'react-router';
import { TopNavigation } from './TopNavigation';
import { Sidebar } from './Sidebar';

export function PortalLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
