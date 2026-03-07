import { Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useTenant } from '../contexts/TenantContext';
import { applications } from '../data/applications';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowRight, Clock, Star, TrendingUp, AlertCircle } from 'lucide-react';

export function Home() {
  const { user } = useAuth();
  const { currentTenant } = useTenant();

  // Mock recently used apps
  const recentlyUsedApps = applications.slice(0, 4);
  
  // Mock favorite apps
  const favoriteApps = applications.filter(app => 
    ['crm', 'analytics', 'accounting', 'inventory'].includes(app.id)
  );

  // Mock recent activity
  const recentActivity = [
    {
      id: '1',
      action: 'Approved purchase order #PO-2026-0145',
      app: 'Finance',
      time: '30 minutes ago',
      icon: '💰',
    },
    {
      id: '2',
      action: 'Updated customer record for Acme Ltd',
      app: 'CRM',
      time: '2 hours ago',
      icon: '👥',
    },
    {
      id: '3',
      action: 'Generated monthly sales report',
      app: 'Analytics',
      time: '5 hours ago',
      icon: '📈',
    },
    {
      id: '4',
      action: 'Created new workflow for onboarding',
      app: 'Workflow Builder',
      time: '1 day ago',
      icon: '⚙️',
    },
  ];

  // Mock alerts
  const alerts = [
    {
      id: '1',
      title: '3 Pending Approvals',
      description: 'Review and approve pending requests',
      type: 'warning',
      link: '/apps/workflows/approvals',
    },
    {
      id: '2',
      title: 'System Maintenance Scheduled',
      description: 'Scheduled for March 5, 2026 at 2:00 AM',
      type: 'info',
      link: '/admin/system',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground mt-1 text-sm md:text-base">
          {currentTenant?.name} · <span className="capitalize">{user?.role}</span>
        </p>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          {alerts.map(alert => (
            <Card key={alert.id} className={alert.type === 'warning' ? 'border-yellow-200 bg-yellow-50' : 'border-blue-200 bg-blue-50'}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  {alert.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>
                <Link to={alert.link}>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    View Details
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Stats */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Overview of your key metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Active Applications</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +2 this month
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold">248</div>
                <div className="text-sm text-muted-foreground">Total Users</div>
                <div className="flex items-center text-xs text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +15 this month
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  Last 30 days
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link to="/apps">
              <Button variant="outline" className="w-full justify-start">
                Browse All Apps
              </Button>
            </Link>
            <Link to="/admin/users">
              <Button variant="outline" className="w-full justify-start">
                Manage Users
              </Button>
            </Link>
            <Link to="/admin/api">
              <Button variant="outline" className="w-full justify-start">
                API Documentation
              </Button>
            </Link>
            <Link to="/help">
              <Button variant="outline" className="w-full justify-start">
                Help & Support
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Favorite Apps */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                Favorite Apps
              </CardTitle>
              <CardDescription>Your pinned applications</CardDescription>
            </div>
            <Link to="/apps">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {favoriteApps.map(app => (
              <Link key={app.id} to={app.link}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="text-3xl">{app.icon}</div>
                      {app.status !== 'active' && (
                        <Badge variant="secondary" className="text-xs">
                          {app.status}
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold mt-3">{app.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {app.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest actions across all apps</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map(activity => (
                <div key={activity.id} className="flex gap-3">
                  <div className="text-2xl">{activity.icon}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.app} · {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recently Used Apps */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recently Used
            </CardTitle>
            <CardDescription>Apps you've accessed recently</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentlyUsedApps.map(app => (
                <Link key={app.id} to={app.link}>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="text-2xl">{app.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{app.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {app.category}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}