import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Code, Copy, Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';

const mockApiKeys = [
  {
    id: '1',
    name: 'Production API Key',
    key: 'pk_live_abc123def456ghi789jkl012',
    created: '2026-01-15',
    lastUsed: '2 hours ago',
    status: 'active',
  },
  {
    id: '2',
    name: 'Development API Key',
    key: 'pk_test_xyz987wvu654tsr321qpo098',
    created: '2026-02-01',
    lastUsed: '1 day ago',
    status: 'active',
  },
  {
    id: '3',
    name: 'Mobile App API Key',
    key: 'pk_live_mno345pqr678stu901vwx234',
    created: '2026-02-20',
    lastUsed: 'Never',
    status: 'inactive',
  },
];

export function API() {
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* API Keys Management */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage API keys for system integration</CardDescription>
            </div>
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Create API Key
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>API Key</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Used</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockApiKeys.map(apiKey => (
                  <TableRow key={apiKey.id}>
                    <TableCell className="font-medium">{apiKey.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                          {visibleKeys.has(apiKey.id)
                            ? apiKey.key
                            : '••••••••••••••••••••••••••••'}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => toggleKeyVisibility(apiKey.id)}
                        >
                          {visibleKeys.has(apiKey.id) ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => copyToClipboard(apiKey.key)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {apiKey.created}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {apiKey.lastUsed}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          apiKey.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }
                      >
                        {apiKey.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {mockApiKeys.map(apiKey => (
              <Card key={apiKey.id}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{apiKey.name}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge
                          variant="secondary"
                          className={
                            apiKey.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }
                        >
                          {apiKey.status}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 flex-shrink-0">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <div className="flex items-center gap-2 min-w-0">
                      <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded flex-1 truncate">
                        {visibleKeys.has(apiKey.id)
                          ? apiKey.key
                          : '••••••••••••••••••••••••••••'}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 flex-shrink-0"
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                      >
                        {visibleKeys.has(apiKey.id) ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 flex-shrink-0"
                        onClick={() => copyToClipboard(apiKey.key)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                    <span>Created: {apiKey.created}</span>
                    <span>Last: {apiKey.lastUsed}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API Usage Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">API Calls (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">45.2K</div>
            <p className="text-xs text-muted-foreground mt-1">+8.2% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">99.8%</div>
            <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Avg Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">142ms</div>
            <p className="text-xs text-muted-foreground mt-1">-12ms from yesterday</p>
          </CardContent>
        </Card>
      </div>

      {/* API Documentation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            API Documentation
          </CardTitle>
          <CardDescription>Quick links to API documentation and resources</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 border rounded-lg hover:bg-gray-50">
            <div className="flex-1 min-w-0">
              <p className="font-medium">REST API Reference</p>
              <p className="text-sm text-muted-foreground">Complete API endpoint documentation</p>
            </div>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">View Docs</Button>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 border rounded-lg hover:bg-gray-50">
            <div className="flex-1 min-w-0">
              <p className="font-medium">Authentication Guide</p>
              <p className="text-sm text-muted-foreground">Learn how to authenticate API requests</p>
            </div>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">View Docs</Button>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 border rounded-lg hover:bg-gray-50">
            <div className="flex-1 min-w-0">
              <p className="font-medium">Webhooks Configuration</p>
              <p className="text-sm text-muted-foreground">Set up webhooks for real-time events</p>
            </div>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">Configure</Button>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 border rounded-lg hover:bg-gray-50">
            <div className="flex-1 min-w-0">
              <p className="font-medium">Rate Limits</p>
              <p className="text-sm text-muted-foreground">Understanding API rate limits and quotas</p>
            </div>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">View Docs</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}