import { useState } from 'react';
import { Link } from 'react-router';
import { useNotifications } from '../contexts/NotificationContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Bell, Check, CheckCheck, Clock, Shield, Workflow, AlertCircle, AppWindow } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function Notifications() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = notifications.filter(n =>
    filter === 'all' ? true : !n.read
  );

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'system':
        return <Bell className="h-5 w-5 text-blue-600" />;
      case 'security':
        return <Shield className="h-5 w-5 text-red-600" />;
      case 'workflow':
        return <Workflow className="h-5 w-5 text-purple-600" />;
      case 'approval':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'application':
        return <AppWindow className="h-5 w-5 text-green-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getNotificationBgColor = (type: string, read: boolean) => {
    if (read) return 'bg-white';
    switch (type) {
      case 'system':
        return 'bg-blue-50';
      case 'security':
        return 'bg-red-50';
      case 'workflow':
        return 'bg-purple-50';
      case 'approval':
        return 'bg-yellow-50';
      case 'application':
        return 'bg-green-50';
      default:
        return 'bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline" className="w-full sm:w-auto">
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark All as Read
          </Button>
        )}
      </div>

      <Tabs value={filter} onValueChange={(v) => setFilter(v as 'all' | 'unread')}>
        <TabsList>
          <TabsTrigger value="all">
            All ({notifications.length})
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread ({unreadCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="space-y-3 mt-6">
          {filteredNotifications.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Bell className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <p className="text-muted-foreground">
                  {filter === 'unread'
                    ? 'No unread notifications'
                    : 'No notifications yet'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map(notification => (
              <Card
                key={notification.id}
                className={`${getNotificationBgColor(notification.type, notification.read)} ${
                  !notification.read ? 'border-l-4 border-l-blue-600' : ''
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex gap-3 sm:gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-semibold text-sm sm:text-base">{notification.title}</h3>
                            {!notification.read && (
                              <Badge variant="secondary" className="text-xs">New</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                            </span>
                            {notification.appName && (
                              <Badge variant="outline" className="text-xs">
                                {notification.appName}
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs capitalize">
                              {notification.type}
                            </Badge>
                          </div>
                        </div>
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="h-8 w-8 p-0 flex-shrink-0"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      {notification.link && (
                        <Link to={notification.link}>
                          <Button variant="outline" size="sm" className="mt-3 w-full sm:w-auto">
                            View Details
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}