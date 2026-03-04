import { useParams, Link } from 'react-router';
import { applications } from '../data/applications';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function AppPlaceholder() {
  const { appId } = useParams();
  const app = applications.find(a => a.id === appId);

  if (!app) {
    return (
      <div className="space-y-6">
        <Link to="/apps">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Apps
          </Button>
        </Link>
        <Card>
          <CardContent className="py-12 text-center">
            <h2 className="text-2xl font-bold mb-2">Application Not Found</h2>
            <p className="text-muted-foreground">The requested application could not be found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/apps">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Apps
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <div className="text-6xl mb-4">{app.icon}</div>
          <h2 className="text-2xl font-bold mb-2">{app.name}</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">{app.description}</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">
            <div className="h-2 w-2 bg-blue-600 rounded-full animate-pulse" />
            Application Interface Would Load Here
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            This is a placeholder. In production, this would be replaced with the actual application.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
