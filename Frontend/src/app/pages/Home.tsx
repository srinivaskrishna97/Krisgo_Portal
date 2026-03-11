import { useState, useRef, useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DndProvider, usePreview } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import { Link } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { useTenant } from '../contexts/TenantContext';
import { applications } from '../data/applications';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  ArrowRight,
  Clock,
  Star,
  TrendingUp,
  AlertCircle,
  GripVertical,
  LayoutDashboard,
  RotateCcw,
  Check,
  Info,
} from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const recentActivity = [
  { id: '1', action: 'Approved purchase order #PO-2026-0145', app: 'Finance', time: '30 minutes ago', icon: '💰' },
  { id: '2', action: 'Updated customer record for Acme Ltd', app: 'CRM', time: '2 hours ago', icon: '👥' },
  { id: '3', action: 'Generated monthly sales report', app: 'Analytics', time: '5 hours ago', icon: '📈' },
  { id: '4', action: 'Created new workflow for onboarding', app: 'Workflow Builder', time: '1 day ago', icon: '⚙️' },
];

const alerts = [
  { id: '1', title: '3 Pending Approvals', description: 'Review and approve pending requests', type: 'warning' as const, link: '/apps/workflows/approvals' },
  { id: '2', title: 'System Maintenance Scheduled', description: 'Scheduled for March 5, 2026 at 2:00 AM', type: 'info' as const, link: '/admin/system' },
];

const favoriteIds = ['crm', 'analytics', 'accounting', 'inventory'];

// ─── Widget Definitions ───────────────────────────────────────────────────────

interface WidgetDef {
  id: string;
  label: string;
}

const DEFAULT_WIDGETS: WidgetDef[] = [
  { id: 'alerts', label: 'Alerts' },
  { id: 'stats', label: 'Quick Stats & Links' },
  { id: 'favorites', label: 'Favorite Apps' },
  { id: 'activity', label: 'Recent Activity' },
];

const WIDGET_TYPE = 'DASHBOARD_WIDGET';

function loadWidgets(): WidgetDef[] {
  try {
    const saved = localStorage.getItem('dashboard-widget-order');
    if (saved) {
      const parsed: WidgetDef[] = JSON.parse(saved);
      // Ensure all default widgets exist (handles new widgets added later)
      const ids = new Set(parsed.map(w => w.id));
      const missing = DEFAULT_WIDGETS.filter(w => !ids.has(w.id));
      return [...parsed, ...missing];
    }
  } catch {}
  return DEFAULT_WIDGETS;
}

// ─── Widget Sub-components ────────────────────────────────────────────────────

function AlertsWidget() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {alerts.map(alert => (
        <Card
          key={alert.id}
          className={alert.type === 'warning' ? 'border-yellow-200 bg-yellow-50' : 'border-blue-200 bg-blue-50'}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              {alert.type === 'warning'
                ? <AlertCircle className="h-4 w-4 text-yellow-600 flex-shrink-0" />
                : <Info className="h-4 w-4 text-blue-600 flex-shrink-0" />
              }
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
  );
}

function StatsWidget() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
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
                <TrendingUp className="h-3 w-3 mr-1" />+2 this month
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold">248</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />+15 this month
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
              <div className="text-xs text-muted-foreground">Last 30 days</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { label: 'Browse All Apps', to: '/apps' },
            { label: 'Manage Users', to: '/admin/users' },
            { label: 'API Documentation', to: '/admin/api' },
            { label: 'Help & Support', to: '/help' },
          ].map(link => (
            <Link key={link.to} to={link.to}>
              <Button variant="outline" className="w-full justify-start">
                {link.label}
              </Button>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function FavoritesWidget() {
  const favoriteApps = applications.filter(app => favoriteIds.includes(app.id));
  return (
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
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {favoriteApps.map(app => (
            <Link key={app.id} to={app.link}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="text-3xl">{app.icon}</div>
                    {app.status !== 'active' && (
                      <Badge variant="secondary" className="text-xs">{app.status}</Badge>
                    )}
                  </div>
                  <h3 className="font-semibold mt-3">{app.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{app.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityWidget() {
  const recentlyUsedApps = applications.slice(0, 4);
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" /> Recent Activity
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
                  <p className="text-xs text-muted-foreground">{activity.app} · {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" /> Recently Used
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
                    <p className="text-xs text-muted-foreground capitalize">{app.category}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── DragPreview (touch-only floating label) ────────────────────────────────

function DragPreview() {
  const preview = usePreview<DragItem>();
  if (!preview.display) return null;
  const { item, style } = preview;
  return (
    <div
      style={{ ...style, zIndex: 9999 }}
      className="px-3 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg shadow-xl pointer-events-none"
    >
      {DEFAULT_WIDGETS.find(w => w.id === item.id)?.label ?? 'Widget'}
    </div>
  );
}

// ─── DraggableWidget ──────────────────────────────────────────────────────────

interface DragItem {
  id: string;
  index: number;
}

function DraggableWidget({
  widget,
  index,
  moveWidget,
  editMode,
  children,
}: {
  widget: WidgetDef;
  index: number;
  moveWidget: (from: number, to: number) => void;
  editMode: boolean;
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag<DragItem, void, { isDragging: boolean }>({
    type: WIDGET_TYPE,
    item: () => ({ id: widget.id, index }),
    collect: monitor => ({ isDragging: monitor.isDragging() }),
    canDrag: () => editMode,
  });

  const [{ isOver }, drop] = useDrop<DragItem, void, { isOver: boolean }>({
    accept: WIDGET_TYPE,
    hover(item, monitor) {
      if (!containerRef.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverRect = containerRef.current.getBoundingClientRect();
      const hoverMidY = (hoverRect.bottom - hoverRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientY = clientOffset.y - hoverRect.top;

      // Only move when cursor has crossed half the item height
      if (dragIndex < hoverIndex && hoverClientY < hoverMidY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMidY) return;

      moveWidget(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    collect: monitor => ({ isOver: monitor.isOver() }),
  });

  // Callback ref: keeps containerRef in sync for hover calculations AND registers drop target
  const containerCallbackRef = useCallback((el: HTMLDivElement | null) => {
    (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    drop(el);
  }, [drop]);

  return (
    <div
      ref={containerCallbackRef}
      className={`relative transition-all duration-200 ${
        isDragging ? 'opacity-30 scale-[0.98]' : 'opacity-100 scale-100'
      }`}
    >
      {/* Drop indicator ring */}
      {isOver && editMode && !isDragging && (
        <div className="absolute inset-0 rounded-xl ring-2 ring-blue-500 ring-offset-2 pointer-events-none z-20 bg-blue-50/10" />
      )}

      {/* Drag handle bar — ref={drag} registers the handle directly with react-dnd */}
      {editMode && (
        <div
          ref={drag}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-t-xl cursor-grab active:cursor-grabbing select-none group"
        >
          <GripVertical className="h-4 w-4 text-blue-400 group-hover:text-blue-600 transition-colors" />
          <span className="text-xs text-blue-600 font-medium">{widget.label}</span>
          <span className="ml-auto text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
            Drag to reorder
          </span>
        </div>
      )}

      {/* Widget content */}
      <div
        className={
          editMode
            ? 'border border-t-0 border-blue-200 rounded-b-xl overflow-hidden'
            : ''
        }
      >
        {children}
      </div>
    </div>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────

export function Home() {
  const { user } = useAuth();
  const { currentTenant } = useTenant();
  const [editMode, setEditMode] = useState(false);
  const [savedBanner, setSavedBanner] = useState(false);
  const [widgets, setWidgets] = useState<WidgetDef[]>(loadWidgets);

  const moveWidget = useCallback((fromIndex: number, toIndex: number) => {
    setWidgets(prev => {
      const updated = [...prev];
      const [removed] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, removed);
      return updated;
    });
  }, []);

  const handleSave = () => {
    localStorage.setItem('dashboard-widget-order', JSON.stringify(widgets));
    setEditMode(false);
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 2500);
  };

  const handleReset = () => {
    setWidgets(DEFAULT_WIDGETS);
    localStorage.removeItem('dashboard-widget-order');
  };

  const handleCancel = () => {
    setWidgets(loadWidgets());
    setEditMode(false);
  };

  const renderWidgetContent = (id: string) => {
    switch (id) {
      case 'alerts':    return <AlertsWidget />;
      case 'stats':     return <StatsWidget />;
      case 'favorites': return <FavoritesWidget />;
      case 'activity':  return <ActivityWidget />;
      default:          return null;
    }
  };

  return (
    <DndProvider options={HTML5toTouch}>
      <DragPreview />
      <div className="space-y-6">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {user?.name}!</h1>
            <p className="text-muted-foreground mt-1 text-sm md:text-base">
              {currentTenant?.name} · <span className="capitalize">{user?.role}</span>
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {editMode ? (
              <>
                <Button variant="outline" size="sm" onClick={handleReset} className="gap-1.5">
                  <RotateCcw className="h-3.5 w-3.5" /> Reset
                </Button>
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave} className="gap-1.5 bg-blue-600 hover:bg-blue-700">
                  <Check className="h-3.5 w-3.5" /> Save Layout
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setEditMode(true)} className="gap-1.5">
                <LayoutDashboard className="h-3.5 w-3.5" /> Edit Layout
              </Button>
            )}
          </div>
        </div>

        {/* ── Saved confirmation ── */}
        {savedBanner && (
          <div className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
            <Check className="h-4 w-4 flex-shrink-0" />
            Dashboard layout saved successfully!
          </div>
        )}

        {/* ── Edit mode hint ── */}
        {editMode && (
          <div className="flex items-start gap-2 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
            <GripVertical className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Edit mode active.</strong> Grab any widget's handle bar and drag it to rearrange your dashboard. Click <strong>Save Layout</strong> when done.
            </span>
          </div>
        )}

        {/* ── Widgets ── */}
        <div className="space-y-6">
          {widgets.map((widget, index) => (
            <DraggableWidget
              key={widget.id}
              widget={widget}
              index={index}
              moveWidget={moveWidget}
              editMode={editMode}
            >
              {renderWidgetContent(widget.id)}
            </DraggableWidget>
          ))}
        </div>

      </div>
    </DndProvider>
  );
}