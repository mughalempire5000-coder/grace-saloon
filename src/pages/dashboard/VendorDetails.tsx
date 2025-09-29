import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Users,
  TrendingUp,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data - replace with actual API
const mockVendor = {
  id: '1',
  name: 'Glamour Studio',
  email: 'contact@glamourstudio.com',
  phone: '+91 98765 43210',
  address: 'MG Road, Bangalore, Karnataka 560001',
  rating: 4.8,
  reviewCount: 45,
  status: 'active',
  joinedDate: '2024-01-15',
  description: 'Premium beauty salon offering comprehensive hair, skin, and beauty services with expert stylists and modern equipment.',
  image: null,
  services: [
    { name: 'Hair Cut', price: '₹500' },
    { name: 'Hair Color', price: '₹2000' },
    { name: 'Facial', price: '₹800' },
    { name: 'Hair Styling', price: '₹1000' },
    { name: 'Spa Treatment', price: '₹1500' },
  ],
  stats: {
    totalBookings: 1250,
    monthlyRevenue: '₹45,000',
    completedServices: 1180,
    avgServiceTime: '45 min'
  },
  workingHours: {
    monday: '9:00 AM - 8:00 PM',
    tuesday: '9:00 AM - 8:00 PM',
    wednesday: '9:00 AM - 8:00 PM',
    thursday: '9:00 AM - 8:00 PM',
    friday: '9:00 AM - 9:00 PM',
    saturday: '9:00 AM - 9:00 PM',
    sunday: '10:00 AM - 6:00 PM',
  },
  recentReviews: [
    {
      id: 1,
      customerName: 'Priya Sharma',
      rating: 5,
      comment: 'Excellent service! The staff is very professional and the ambiance is great.',
      date: '2024-03-15',
    },
    {
      id: 2,
      customerName: 'Rahul Kumar',
      rating: 4,
      comment: 'Good hair cut, reasonable prices. Will visit again.',
      date: '2024-03-12',
    },
    {
      id: 3,
      customerName: 'Anjali Patel',
      rating: 5,
      comment: 'Amazing facial treatment. My skin feels so smooth and refreshed!',
      date: '2024-03-10',
    },
  ],
};

const VendorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // In real app, fetch vendor data using the id
  const vendor = mockVendor;

  const handleDeleteVendor = () => {
    // Show confirmation dialog in real app
    toast({
      title: "Success",
      description: "Vendor deleted successfully",
    });
    navigate('/dashboard/vendors');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard/vendors')}
            className="hover:bg-accent"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Vendors
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{vendor.name}</h1>
            <p className="text-muted-foreground">Vendor Details</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            asChild
            variant="outline"
            className="hover:bg-primary hover:text-primary-foreground"
          >
            <Link to={`/dashboard/vendors/${id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeleteVendor}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info Card */}
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-20 w-20 shadow-medium">
                  <AvatarImage src={vendor.image || undefined} />
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground font-bold text-xl">
                    {getInitials(vendor.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-2xl">{vendor.name}</CardTitle>
                    {getStatusBadge(vendor.status)}
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    {renderStars(vendor.rating)}
                    <span className="ml-2 text-sm text-muted-foreground">
                      {vendor.rating} ({vendor.reviewCount} reviews)
                    </span>
                  </div>
                  <CardDescription className="text-base">
                    {vendor.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{vendor.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{vendor.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">{vendor.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Joined</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(vendor.joinedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Services */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Services & Pricing</CardTitle>
              <CardDescription>Available services and their rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {vendor.services.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span className="font-medium">{service.name}</span>
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      {service.price}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Reviews */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Recent Reviews</CardTitle>
              <CardDescription>Latest customer feedback</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {vendor.recentReviews.map((review) => (
                <div key={review.id} className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">
                          {getInitials(review.customerName)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{review.customerName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Performance Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{vendor.stats.totalBookings}</p>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-green-100">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">{vendor.stats.monthlyRevenue}</p>
                  <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-100">
                  <Star className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{vendor.stats.completedServices}</p>
                  <p className="text-sm text-muted-foreground">Completed Services</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-purple-100">
                  <Clock className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">{vendor.stats.avgServiceTime}</p>
                  <p className="text-sm text-muted-foreground">Avg Service Time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Working Hours */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Working Hours</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {Object.entries(vendor.workingHours).map(([day, hours]) => (
                <div key={day} className="flex justify-between text-sm">
                  <span className="capitalize font-medium">{day}</span>
                  <span className="text-muted-foreground">{hours}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VendorDetails;