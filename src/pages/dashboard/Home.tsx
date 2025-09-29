import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  TrendingUp, 
  Star, 
  Calendar,
  Plus,
  BarChart3,
  Clock,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Vendors',
      value: '24',
      change: '+2 this month',
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Revenue',
      value: '₹1,24,500',
      change: '+15% from last month',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Average Rating',
      value: '4.8',
      change: '+0.2 from last month',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Appointments',
      value: '156',
      change: '+8 today',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'New vendor registration',
      description: 'Beauty Bliss Salon joined the marketplace',
      time: '2 hours ago',
      icon: Users,
    },
    {
      id: 2,
      title: 'Payment received',
      description: 'Payment of ₹5,000 from Glamour Studio',
      time: '4 hours ago',
      icon: TrendingUp,
    },
    {
      id: 3,
      title: 'New review posted',
      description: '5-star review for Hair Craft Salon',
      time: '6 hours ago',
      icon: Star,
    },
  ];

  const quickActions = [
    {
      title: 'Add New Vendor',
      description: 'Onboard a new salon to your marketplace',
      icon: Plus,
      action: () => navigate('/dashboard/vendors/create'),
      color: 'bg-gradient-primary',
    },
    {
      title: 'View Analytics',
      description: 'Check detailed performance metrics',
      icon: BarChart3,
      action: () => navigate('/dashboard/analytics'),
      color: 'bg-gradient-secondary',
    },
    {
      title: 'Manage Reviews',
      description: 'Moderate and respond to reviews',
      icon: Star,
      action: () => navigate('/dashboard/reviews'),
      color: 'bg-gradient-primary',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-muted-foreground mt-2">
            Here's what's happening with your saloon marketplace today.
          </p>
        </div>
        <Button 
          onClick={() => navigate('/dashboard/vendors/create')}
          className="bg-gradient-primary hover:shadow-medium transition-all duration-200"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Vendor
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-soft hover:shadow-medium transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates from your marketplace</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="p-2 rounded-full bg-primary/10">
                  <activity.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={action.action}
                className="w-full justify-start h-auto p-4 text-left hover:shadow-soft transition-all duration-200"
              >
                <div className={`p-2 rounded-full mr-3 ${action.color}`}>
                  <action.icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{action.title}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;