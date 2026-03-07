import { useTenant } from '../../contexts/TenantContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Building2, Users, Calendar, Settings } from 'lucide-react';

export function Tenants() {
  const { tenants } = useTenant();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Tenant Management</CardTitle>
              <CardDescription>Manage organizations and their configurations</CardDescription>
            </div>
            <Button className="w-full sm:w-auto">
              <Building2 className="mr-2 h-4 w-4" />
              Add Tenant
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6">
        {tenants.map(tenant => (
          <Card key={tenant.id}>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl flex-shrink-0">{tenant.logo}</div>
                  <div className="min-w-0">
                    <CardTitle className="truncate">{tenant.name}</CardTitle>
                    <CardDescription className="truncate">{tenant.description}</CardDescription>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <Settings className="mr-2 h-4 w-4" />
                  Configure
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Domain</p>
                  <p className="font-medium truncate">{tenant.domain}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Plan</p>
                  <Badge variant="secondary" className="capitalize">
                    {tenant.plan}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge
                    variant="secondary"
                    className={
                      tenant.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : tenant.status === 'trial'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }
                  >
                    {tenant.status}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Created</p>
                  <p className="font-medium">Jan 15, 2025</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t grid gap-4 sm:gap-6 sm:grid-cols-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">45</div>
                    <div className="text-sm text-muted-foreground">Active Users</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                    <Building2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-sm text-muted-foreground">Active Apps</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">1.2K</div>
                    <div className="text-sm text-muted-foreground">Events/Month</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}