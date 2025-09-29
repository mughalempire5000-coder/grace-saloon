import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Search, 
  Filter, 
  Star, 
  MessageCircle, 
  ThumbsUp,
  Clock,
  TrendingUp,
  Users
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data - replace with actual API
const mockReviews = [
  {
    id: '1',
    customerName: 'Priya Sharma',
    vendorName: 'Glamour Studio',
    rating: 5,
    comment: 'Excellent service! The staff is very professional and the ambiance is great. I had a wonderful experience with the hair styling.',
    date: '2024-03-15',
    status: 'published',
    response: null,
    serviceType: 'Hair Styling',
  },
  {
    id: '2',
    customerName: 'Rahul Kumar',
    vendorName: 'Beauty Bliss Salon',
    rating: 4,
    comment: 'Good hair cut, reasonable prices. Will visit again. The only thing is the waiting time was a bit long.',
    date: '2024-03-12',
    status: 'published',
    response: 'Thank you for your feedback! We are working on reducing wait times.',
    serviceType: 'Hair Cut',
  },
  {
    id: '3',
    customerName: 'Anjali Patel',
    vendorName: 'Hair Craft Salon',
    rating: 5,
    comment: 'Amazing facial treatment. My skin feels so smooth and refreshed! Highly recommend this place.',
    date: '2024-03-10',
    status: 'pending',
    response: null,
    serviceType: 'Facial',
  },
  {
    id: '4',
    customerName: 'Vikram Singh',
    vendorName: 'Glamour Studio',
    rating: 2,
    comment: 'Service was not up to the mark. The staff seemed inexperienced and the result was disappointing.',
    date: '2024-03-08',
    status: 'flagged',
    response: null,
    serviceType: 'Hair Color',
  },
];

const Reviews = () => {
  const [reviews, setReviews] = useState(mockReviews);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [responseText, setResponseText] = useState<{[key: string]: string}>({});
  const { toast } = useToast();

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || review.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleResponse = (reviewId: string) => {
    const response = responseText[reviewId];
    if (!response?.trim()) {
      toast({
        title: "Error",
        description: "Please enter a response",
        variant: "destructive",
      });
      return;
    }

    setReviews(prevReviews => 
      prevReviews.map(review => 
        review.id === reviewId 
          ? { ...review, response } 
          : review
      )
    );

    setResponseText(prev => ({ ...prev, [reviewId]: '' }));
    
    toast({
      title: "Success",
      description: "Response added successfully",
    });
  };

  const updateReviewStatus = (reviewId: string, newStatus: string) => {
    setReviews(prevReviews => 
      prevReviews.map(review => 
        review.id === reviewId 
          ? { ...review, status: newStatus } 
          : review
      )
    );

    toast({
      title: "Success",
      description: `Review ${newStatus} successfully`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-100 text-green-800">Published</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'flagged':
        return <Badge variant="destructive" className="bg-red-100 text-red-800">Flagged</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 3) return 'text-yellow-600';
    return 'text-red-600';
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

  const stats = {
    total: reviews.length,
    avgRating: (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1),
    pending: reviews.filter(r => r.status === 'pending').length,
    flagged: reviews.filter(r => r.status === 'flagged').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reviews Management</h1>
        <p className="text-muted-foreground">Monitor and respond to customer reviews</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Reviews
            </CardTitle>
            <MessageCircle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.total}</div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Rating
            </CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.avgRating}</div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Reviews
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Flagged Reviews
            </CardTitle>
            <Users className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.flagged}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Status: {filterStatus === 'all' ? 'All' : filterStatus}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilterStatus('all')}>
              All Status
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus('published')}>
              Published
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus('pending')}>
              Pending
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus('flagged')}>
              Flagged
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id} className="shadow-soft hover:shadow-medium transition-all duration-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 shadow-soft">
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground font-medium">
                      {getInitials(review.customerName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{review.customerName}</h3>
                      {getStatusBadge(review.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {review.vendorName} • {review.serviceType}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    {renderStars(review.rating)}
                    <span className={`ml-1 font-semibold ${getRatingColor(review.rating)}`}>
                      {review.rating}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">{review.comment}</p>
              
              {review.response && (
                <div className="p-3 rounded-lg bg-muted/50 border-l-4 border-primary">
                  <p className="text-sm font-medium text-primary mb-1">Response:</p>
                  <p className="text-sm text-foreground">{review.response}</p>
                </div>
              )}

              {!review.response && (review.status === 'published' || review.status === 'pending') && (
                <div className="space-y-2">
                  <Textarea
                    placeholder="Write a response..."
                    value={responseText[review.id] || ''}
                    onChange={(e) => setResponseText(prev => ({ ...prev, [review.id]: e.target.value }))}
                    className="min-h-[80px]"
                  />
                  <Button
                    onClick={() => handleResponse(review.id)}
                    className="bg-gradient-primary"
                    size="sm"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Respond
                  </Button>
                </div>
              )}

              <div className="flex gap-2 pt-2 border-t">
                {review.status === 'pending' && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateReviewStatus(review.id, 'published')}
                      className="text-green-600 hover:bg-green-50"
                    >
                      <ThumbsUp className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateReviewStatus(review.id, 'flagged')}
                      className="text-red-600 hover:bg-red-50"
                    >
                      Flag
                    </Button>
                  </>
                )}
                {review.status === 'flagged' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateReviewStatus(review.id, 'published')}
                    className="text-green-600 hover:bg-green-50"
                  >
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <Card className="shadow-soft">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No reviews found</h3>
            <p className="text-muted-foreground text-center">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Reviews will appear here once customers start leaving feedback'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Reviews;