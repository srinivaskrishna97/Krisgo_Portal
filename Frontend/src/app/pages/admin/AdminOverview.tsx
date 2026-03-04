import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Users, Building2, Activity, TrendingUp, AlertCircle } from 'lucide-react';

export function AdminOverview() {
  const stats = [
    {
      title: 'Total Users',
      value: '248',
      change: '+12 this month',
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Active Tenants',
      value: '3',
      change: 'All active',
      icon: Building2,
      color: 'text-green-600',
    },
    {
      title: 'Active Sessions',
      value: '142',
      change: '+5% from yesterday',
      icon: Activity,
      color: 'text-purple-600',
    },
    {
      title: 'API Calls (24h)',
      value: '45.2K',
      change: '+8.2% from yesterday',
      icon: TrendingUp,
      color: 'text-orange-600',
    },
  ];

  const recentActivity = [
    { action: 'New user registration', user: 'sarah.jones@example.com', time: '2 min ago' },
    { action: 'Application deployed', user: 'System', time: '15 min ago' },
    { action: 'Tenant settings updated', user: 'john.doe@example.com', time: '1 hour ago' },
    { action: 'API key created', user: 'dev.team@example.com', time: '2 hours ago' },
  ];

  const systemAlerts = [
    {
      type: 'warning',
      message: 'Scheduled maintenance on March 5, 2026 at 2:00 AM',
      time: '1 day ago',
    },
    {
      type: 'info',
      message: 'New security patch available for deployment',
      time: '2 days ago',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system and user actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start justify-between text-sm">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.user}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
            <CardDescription>Important notifications and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemAlerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    alert.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' : 'bg-blue-50 border border-blue-200'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <AlertCircle className={`h-4 w-4 mt-0.5 ${
                      alert.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle>System Health</CardTitle>
          <CardDescription>Service status and performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Portal Service</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">Operational</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Authentication Service</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">Operational</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">API Gateway</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">Operational</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Database</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">Operational</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
