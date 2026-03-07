import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Search, Download, Filter } from 'lucide-react';

const mockLogs = [
  {
    id: '1',
    timestamp: '2026-03-04 14:32:15',
    user: 'john.doe@example.com',
    action: 'User Login',
    type: 'security',
    details: 'Successful login from Chrome on Windows',
    ip: '192.168.1.100',
  },
  {
    id: '2',
    timestamp: '2026-03-04 14:28:43',
    user: 'sarah.jones@example.com',
    action: 'Application Accessed',
    type: 'application',
    details: 'Opened CRM application',
    ip: '192.168.1.105',
  },
  {
    id: '3',
    timestamp: '2026-03-04 14:15:22',
    user: 'mike.wilson@example.com',
    action: 'API Key Created',
    type: 'api',
    details: 'Created new API key for production',
    ip: '192.168.1.110',
  },
  {
    id: '4',
    timestamp: '2026-03-04 13:45:10',
    user: 'john.doe@example.com',
    action: 'Settings Updated',
    type: 'system',
    details: 'Updated tenant configuration',
    ip: '192.168.1.100',
  },
  {
    id: '5',
    timestamp: '2026-03-04 13:30:55',
    user: 'emma.davis@example.com',
    action: 'User Created',
    type: 'user',
    details: 'Created new user account',
    ip: '192.168.1.115',
  },
  {
    id: '6',
    timestamp: '2026-03-04 12:15:33',
    user: 'system',
    action: 'Backup Completed',
    type: 'system',
    details: 'Automated database backup completed successfully',
    ip: 'internal',
  },
];

const actionTypes = {
  security: 'bg-red-100 text-red-800',
  application: 'bg-blue-100 text-blue-800',
  api: 'bg-purple-100 text-purple-800',
  system: 'bg-gray-100 text-gray-800',
  user: 'bg-green-100 text-green-800',
};

export function ActivityLogs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' || log.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Activity & Audit Logs</CardTitle>
              <CardDescription>Track user and system activity across the portal</CardDescription>
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4" />
              Export Logs
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="application">Application</SelectItem>
                <SelectItem value="api">API</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map(log => (
                  <TableRow key={log.id}>
                    <TableCell className="text-sm font-mono">{log.timestamp}</TableCell>
                    <TableCell className="text-sm">{log.user}</TableCell>
                    <TableCell className="font-medium">{log.action}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={actionTypes[log.type as keyof typeof actionTypes]}
                      >
                        {log.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                      {log.details}
                    </TableCell>
                    <TableCell className="text-sm font-mono">{log.ip}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {filteredLogs.map(log => (
              <Card key={log.id}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{log.action}</p>
                      <p className="text-sm text-muted-foreground">{log.user}</p>
                    </div>
                    <Badge
                      variant="secondary"
                      className={actionTypes[log.type as keyof typeof actionTypes]}
                    >
                      {log.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{log.details}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                    <span className="font-mono">{log.timestamp}</span>
                    <span className="font-mono">{log.ip}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}