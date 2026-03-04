import { useState } from 'react';
import { Link } from 'react-router';
import { applications, categoryLabels, statusColors } from '../data/applications';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Search, Star, Grid3x3, ExternalLink } from 'lucide-react';

export function AppsDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteApps, setFavoriteApps] = useState<string[]>(['crm', 'analytics', 'accounting']);

  const toggleFavorite = (appId: string) => {
    setFavoriteApps(prev =>
      prev.includes(appId)
        ? prev.filter(id => id !== appId)
        : [...prev, appId]
    );
  };

  const filteredApps = applications.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const AppCard = ({ app }: { app: typeof applications[0] }) => {
    const isFavorite = favoriteApps.includes(app.id);

    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="text-4xl">{app.icon}</div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(app.id);
                }}
                className="h-8 w-8"
              >
                <Star
                  className={`h-4 w-4 ${
                    isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'
                  }`}
                />
              </Button>
            </div>
          </div>
          <CardTitle className="mt-2">{app.name}</CardTitle>
          <CardDescription className="line-clamp-2">{app.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="capitalize">
                {app.category}
              </Badge>
              {app.status !== 'active' && (
                <Badge className={statusColors[app.status]} variant="secondary">
                  {app.status}
                </Badge>
              )}
            </div>
            
            {app.deepLinks && app.deepLinks.length > 0 && (
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground mb-2">Quick Links:</p>
                <div className="space-y-1">
                  {app.deepLinks.slice(0, 3).map(link => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <Link to={app.link}>
              <Button className="w-full mt-2">Launch App</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Applications</h1>
        <p className="text-muted-foreground mt-1">
          Browse and launch your enterprise applications
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search applications..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Tabs by Category */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">
            <Grid3x3 className="h-4 w-4 mr-2" />
            All Apps ({applications.length})
          </TabsTrigger>
          <TabsTrigger value="favorites">
            <Star className="h-4 w-4 mr-2" />
            Favorites ({favoriteApps.length})
          </TabsTrigger>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <TabsTrigger key={key} value={key}>
              {label} ({applications.filter(app => app.category === key).length})
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredApps.map(app => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="favorites">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredApps
              .filter(app => favoriteApps.includes(app.id))
              .map(app => (
                <AppCard key={app.id} app={app} />
              ))}
          </div>
          {favoriteApps.length === 0 && (
            <div className="text-center py-12">
              <Star className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <p className="text-muted-foreground">
                No favorite apps yet. Click the star icon on any app to add it to favorites.
              </p>
            </div>
          )}
        </TabsContent>

        {Object.entries(categoryLabels).map(([category]) => (
          <TabsContent key={category} value={category}>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredApps
                .filter(app => app.category === category)
                .map(app => (
                  <AppCard key={app.id} app={app} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {filteredApps.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No applications found matching your search.</p>
        </div>
      )}
    </div>
  );
}
