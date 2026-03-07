import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { User, Mail, Building2, Shield, Key, Globe, Clock, Monitor } from 'lucide-react';

export function Profile() {
  const { user } = useAuth();
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('UTC-5');

  if (!user) return null;

  const userInitials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  // Mock active sessions
  const activeSessions = [
    {
      id: '1',
      device: 'Chrome on Windows',
      location: 'New York, USA',
      lastActive: '2 minutes ago',
      current: true,
    },
    {
      id: '2',
      device: 'Safari on iPhone',
      location: 'New York, USA',
      lastActive: '1 hour ago',
      current: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground mt-1 text-sm md:text-base">Manage your account settings and preferences</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Overview Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl">{userInitials}</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg mt-4">{user.name}</h3>
              <p className="text-sm text-muted-foreground truncate max-w-full px-2">{user.email}</p>
              <Badge className="mt-2 capitalize">{user.role}</Badge>
            </div>
            <Separator />
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-4 w-4 flex-shrink-0" />
                <span>{user.tenantIds.length} organizations</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="h-4 w-4 flex-shrink-0" />
                <span>Account verified</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Tabs */}
        <Card className="lg:col-span-2">
          <Tabs defaultValue="general">
            <CardHeader>
              <div className="overflow-x-auto -mx-6 px-6 md:mx-0 md:px-0">
                <TabsList className="inline-grid w-auto min-w-full md:w-full grid-cols-3">
                  <TabsTrigger value="general" className="text-xs sm:text-sm">General</TabsTrigger>
                  <TabsTrigger value="security" className="text-xs sm:text-sm">Security</TabsTrigger>
                  <TabsTrigger value="preferences" className="text-xs sm:text-sm">Preferences</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="general" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    <User className="inline h-4 w-4 mr-2" />
                    Full Name
                  </Label>
                  <Input id="name" defaultValue={user.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">
                    <Mail className="inline h-4 w-4 mr-2" />
                    Email Address
                  </Label>
                  <Input id="email" type="email" defaultValue={user.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                </div>
                <Button className="w-full sm:w-auto">Save Changes</Button>
              </TabsContent>

              <TabsContent value="security" className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Key className="h-4 w-4" />
                    Password
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Update your password or manage authentication providers
                  </p>
                  <Button variant="outline" className="w-full sm:w-auto">Change Password</Button>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Linked Accounts
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg gap-2">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <div className="w-8 h-8 bg-white border rounded flex items-center justify-center flex-shrink-0">
                          G
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm">Google</p>
                          <p className="text-xs text-muted-foreground truncate">john.doe@gmail.com</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="flex-shrink-0">Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg gap-2">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <div className="w-8 h-8 bg-white border rounded flex items-center justify-center flex-shrink-0">
                          M
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm">Microsoft</p>
                          <p className="text-xs text-muted-foreground">Not connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="flex-shrink-0">Connect</Button>
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Monitor className="h-4 w-4" />
                    Active Sessions
                  </h3>
                  <div className="space-y-2">
                    {activeSessions.map(session => (
                      <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm">{session.device}</p>
                          <p className="text-xs text-muted-foreground">
                            {session.location} · {session.lastActive}
                          </p>
                        </div>
                        {session.current ? (
                          <Badge variant="secondary" className="flex-shrink-0">Current</Badge>
                        ) : (
                          <Button variant="ghost" size="sm" className="flex-shrink-0">Revoke</Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="preferences" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">
                    <Globe className="inline h-4 w-4 mr-2" />
                    Language
                  </Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">
                    <Clock className="inline h-4 w-4 mr-2" />
                    Time Zone
                  </Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger id="timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                      <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
                      <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
                      <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full sm:w-auto">Save Preferences</Button>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}