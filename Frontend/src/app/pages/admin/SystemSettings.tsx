import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Separator } from '../../components/ui/separator';

export function SystemSettings() {
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [googleSsoEnabled, setGoogleSsoEnabled] = useState(true);
  const [microsoftSsoEnabled, setMicrosoftSsoEnabled] = useState(true);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
          <CardDescription>Configure global system preferences and security policies</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="security">
            <TabsList>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="authentication">Authentication</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
            </TabsList>

            <TabsContent value="security" className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Multi-Factor Authentication (MFA)</Label>
                    <p className="text-sm text-muted-foreground">
                      Require MFA for all user accounts
                    </p>
                  </div>
                  <Switch checked={mfaEnabled} onCheckedChange={setMfaEnabled} />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
                    <SelectTrigger id="session-timeout">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="480">8 hours</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Automatically log out inactive users after this duration
                  </p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="password-policy">Password Policy</Label>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <span>Minimum 8 characters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <span>Require uppercase and lowercase letters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <span>Require numbers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <span>Require special characters</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="authentication" className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Google SSO</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow users to sign in with Google
                    </p>
                  </div>
                  <Switch checked={googleSsoEnabled} onCheckedChange={setGoogleSsoEnabled} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Microsoft SSO</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow users to sign in with Microsoft
                    </p>
                  </div>
                  <Switch checked={microsoftSsoEnabled} onCheckedChange={setMicrosoftSsoEnabled} />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="oauth-config">OAuth Configuration</Label>
                  <div className="space-y-2">
                    <Input
                      placeholder="Google Client ID"
                      defaultValue="123456789-abcdefghijklmnop.apps.googleusercontent.com"
                    />
                    <Input
                      placeholder="Google Client Secret"
                      type="password"
                      defaultValue="••••••••••••••••"
                    />
                    <Input
                      placeholder="Microsoft Client ID"
                      defaultValue="a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8"
                    />
                    <Input
                      placeholder="Microsoft Client Secret"
                      type="password"
                      defaultValue="••••••••••••••••"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send system notifications via email
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Login Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify users of new login attempts
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Security Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Send alerts for security-related events
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="smtp-server">SMTP Configuration</Label>
                  <div className="space-y-2">
                    <Input placeholder="SMTP Server" defaultValue="smtp.example.com" />
                    <Input placeholder="SMTP Port" defaultValue="587" />
                    <Input placeholder="SMTP Username" defaultValue="portal@example.com" />
                    <Input placeholder="SMTP Password" type="password" defaultValue="••••••••" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="features" className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Beta Features</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable experimental features for testing
                    </p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Application Marketplace</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow users to install third-party apps
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>API Access</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable REST API for external integrations
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Audit Logging</Label>
                    <p className="text-sm text-muted-foreground">
                      Log all user and system activities
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 pt-6 border-t">
            <Button>Save Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
