import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Search, BookOpen, Video, MessageCircle, FileText, HelpCircle, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const docCategories = [
  {
    title: 'Getting Started',
    icon: BookOpen,
    docs: [
      { title: 'Portal Overview', description: 'Introduction to the Krisgo Solutions Portal' },
      { title: 'Quick Start Guide', description: 'Get up and running in 5 minutes' },
      { title: 'User Roles & Permissions', description: 'Understanding access control' },
    ],
  },
  {
    title: 'Applications',
    icon: FileText,
    docs: [
      { title: 'App Directory', description: 'Browse and manage applications' },
      { title: 'Installing Applications', description: 'Add new apps to your portal' },
      { title: 'App Configuration', description: 'Configure application settings' },
    ],
  },
  {
    title: 'Administration',
    icon: HelpCircle,
    docs: [
      { title: 'User Management', description: 'Add and manage portal users' },
      { title: 'Tenant Configuration', description: 'Multi-tenant setup guide' },
      { title: 'Security Best Practices', description: 'Securing your portal' },
    ],
  },
];

export function Documentation() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Help & Documentation</CardTitle>
          <CardDescription>Find answers and learn how to use the Krisgo Solutions Portal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documentation..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Quick Links */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <BookOpen className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="font-semibold mb-1">Knowledge Base</h3>
                <p className="text-sm text-muted-foreground">
                  Browse our comprehensive documentation
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <Video className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="font-semibold mb-1">Video Tutorials</h3>
                <p className="text-sm text-muted-foreground">
                  Watch step-by-step video guides
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <MessageCircle className="h-8 w-8 text-green-600 mb-3" />
                <h3 className="font-semibold mb-1">Contact Support</h3>
                <p className="text-sm text-muted-foreground">
                  Get help from our support team
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Documentation Categories */}
      {docCategories.map((category) => {
        const Icon = category.icon;
        return (
          <Card key={category.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon className="h-5 w-5" />
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {category.docs.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <div>
                      <p className="font-medium">{doc.title}</p>
                      <p className="text-sm text-muted-foreground">{doc.description}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Support Ticket */}
      <Card>
        <CardHeader>
          <CardTitle>Submit a Support Ticket</CardTitle>
          <CardDescription>Can't find what you're looking for? Contact our support team</CardDescription>
        </CardHeader>
        <CardContent>
          <Button>
            <MessageCircle className="mr-2 h-4 w-4" />
            Create Support Ticket
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
