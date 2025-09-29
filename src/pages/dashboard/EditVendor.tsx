import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data - replace with actual API
const mockVendor = {
  id: '1',
  name: 'Glamour Studio',
  email: 'contact@glamourstudio.com',
  phone: '+91 98765 43210',
  address: 'MG Road, Bangalore, Karnataka 560001',
  status: 'active',
  description: 'Premium beauty salon offering comprehensive hair, skin, and beauty services with expert stylists and modern equipment.',
  services: [
    { name: 'Hair Cut', price: '500' },
    { name: 'Hair Color', price: '2000' },
    { name: 'Facial', price: '800' },
  ],
};

const EditVendor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState<Array<{ name: string; price: string }>>([]);
  const [newService, setNewService] = useState({ name: '', price: '' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    description: '',
    status: 'pending',
  });

  useEffect(() => {
    // In real app, fetch vendor data using the id
    const vendor = mockVendor;
    setFormData({
      name: vendor.name,
      email: vendor.email,
      phone: vendor.phone,
      address: vendor.address,
      description: vendor.description,
      status: vendor.status,
    });
    setServices(vendor.services);
  }, [id]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addService = () => {
    if (newService.name && newService.price) {
      setServices(prev => [...prev, newService]);
      setNewService({ name: '', price: '' });
    }
  };

  const removeService = (index: number) => {
    setServices(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Success",
        description: "Vendor updated successfully!",
      });
      
      navigate(`/dashboard/vendors/${id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update vendor. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate(`/dashboard/vendors/${id}`)}
          className="hover:bg-accent"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Details
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Edit Vendor</h1>
          <p className="text-muted-foreground">Update vendor information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Update the vendor's basic details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Salon Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter salon name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="transition-all duration-200 focus:shadow-soft"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                      <SelectTrigger className="transition-all duration-200 focus:shadow-soft">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="transition-all duration-200 focus:shadow-soft"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="transition-all duration-200 focus:shadow-soft"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    placeholder="Enter complete address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="transition-all duration-200 focus:shadow-soft"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter salon description..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="min-h-[100px] transition-all duration-200 focus:shadow-soft"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Services & Pricing</CardTitle>
                <CardDescription>Update services offered by this vendor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Service name"
                    value={newService.name}
                    onChange={(e) => setNewService(prev => ({ ...prev, name: e.target.value }))}
                    className="flex-1"
                  />
                  <Input
                    placeholder="Price (₹)"
                    value={newService.price}
                    onChange={(e) => setNewService(prev => ({ ...prev, price: e.target.value }))}
                    className="w-32"
                  />
                  <Button
                    type="button"
                    onClick={addService}
                    disabled={!newService.name || !newService.price}
                    className="bg-gradient-primary"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {services.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Services:</h4>
                    <div className="grid gap-2">
                      {services.map((service, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div>
                            <span className="font-medium">{service.name}</span>
                            <Badge variant="outline" className="ml-2 bg-primary/10 text-primary">
                              ₹{service.price}
                            </Badge>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeService(index)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Update Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="p-3 rounded-lg bg-primary/10">
                  <p className="font-medium text-primary mb-1">Keep Updated</p>
                  <p className="text-muted-foreground">Regular updates improve visibility</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-50">
                  <p className="font-medium text-blue-700 mb-1">Service Pricing</p>
                  <p className="text-muted-foreground">Keep prices competitive and current</p>
                </div>
                <div className="p-3 rounded-lg bg-green-50">
                  <p className="font-medium text-green-700 mb-1">Contact Info</p>
                  <p className="text-muted-foreground">Verify all contact details are working</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(`/dashboard/vendors/${id}`)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-primary hover:shadow-medium transition-all duration-200"
          >
            {isLoading ? 'Updating...' : 'Update Vendor'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditVendor;