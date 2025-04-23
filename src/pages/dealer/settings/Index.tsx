
import DealerLayout from "@/components/dealer/DealerLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Building, CreditCard, Bell, Globe, LogOut, Shield } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const DealerSettings = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "There was an error signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <DealerLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        
        <Tabs defaultValue="profile">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6">
            <Card className="p-6 space-y-6">
              <div className="flex items-center space-x-2 text-primary">
                <Building className="h-5 w-5" />
                <h3 className="font-medium">Business Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" placeholder="Your company name" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <select id="businessType" className="w-full rounded-md border border-input bg-background px-3 py-2">
                    <option value="">Select business type</option>
                    <option value="manufacturer">Manufacturer</option>
                    <option value="distributor">Distributor</option>
                    <option value="retailer">Retailer</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="business@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+91 1234567890" />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio">Business Description</Label>
                  <textarea 
                    id="bio" 
                    rows={4} 
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    placeholder="Tell us about your business and how you use agricultural waste..."
                  ></textarea>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">Business Address</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="address1">Address Line 1</Label>
                    <Input id="address1" placeholder="Street address" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address2">Address Line 2</Label>
                    <Input id="address2" placeholder="Apt, Suite, etc. (optional)" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="City" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" placeholder="State" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="zip">Postal Code</Label>
                    <Input id="zip" placeholder="Postal code" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" placeholder="Country" />
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">Tax Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="gst">GST Number</Label>
                    <Input id="gst" placeholder="GST Number" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pan">PAN Number</Label>
                    <Input id="pan" placeholder="PAN Number" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="payment" className="mt-6">
            <Card className="p-6 space-y-6">
              <div className="flex items-center space-x-2 text-primary">
                <CreditCard className="h-5 w-5" />
                <h3 className="font-medium">Payment Methods</h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-14 bg-white rounded border flex items-center justify-center">
                      <span className="font-bold text-blue-600">Visa</span>
                    </div>
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-xs text-gray-500">Expires 12/25</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-red-500">Remove</Button>
                  </div>
                </div>
                
                <Button variant="outline">Add Payment Method</Button>
              </div>
              
              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">Billing Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="sameAsAddress" 
                      className="rounded border-gray-300"
                      defaultChecked
                    />
                    <Label htmlFor="sameAsAddress">Same as business address</Label>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">Payment Preferences</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Default Payment Method</p>
                      <p className="text-sm text-gray-500">Choose which payment method to use by default</p>
                    </div>
                    <select className="rounded-md border border-input bg-background px-3 py-2">
                      <option value="visa">Visa •••• 4242</option>
                      <option value="upi">UPI</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Save Payment Receipt</p>
                      <p className="text-sm text-gray-500">Automatically save payment receipts to your account</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6">
            <Card className="p-6 space-y-6">
              <div className="flex items-center space-x-2 text-primary">
                <Bell className="h-5 w-5" />
                <h3 className="font-medium">Notification Preferences</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive notifications about orders and offers via email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-gray-500">Receive notifications about orders and offers via SMS</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-gray-500">Receive notifications about orders and offers on your device</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h4 className="font-medium mb-4">Notification Types</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New Listings</p>
                      <p className="text-sm text-gray-500">Notify when new waste listings are posted</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Offer Status Updates</p>
                      <p className="text-sm text-gray-500">Notify when your offers are accepted or rejected</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Order Status Changes</p>
                      <p className="text-sm text-gray-500">Notify when order status changes (e.g., shipping, delivered)</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Messages</p>
                      <p className="text-sm text-gray-500">Notify when you receive new messages</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Newsletter & Updates</p>
                      <p className="text-sm text-gray-500">Receive platform news and updates</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button>Save Preferences</Button>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="mt-6">
            <Card className="p-6 space-y-6">
              <div className="flex items-center space-x-2 text-primary">
                <Shield className="h-5 w-5" />
                <h3 className="font-medium">Security Settings</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Change Password</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" className="mt-1" />
                    </div>
                  </div>
                  <Button className="mt-3">Update Password</Button>
                </div>
                
                <div className="border-t pt-6">
                  <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-500 mb-3">
                    Add an extra layer of security to your account by enabling two-factor authentication.
                  </p>
                  <Button variant="outline">Enable Two-Factor Authentication</Button>
                </div>
                
                <div className="border-t pt-6">
                  <h4 className="font-medium mb-2">Session Management</h4>
                  <p className="text-sm text-gray-500 mb-3">
                    Manage your active sessions and sign out from other devices.
                  </p>
                  <Button variant="outline">Manage Sessions</Button>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 mt-6">
              <div className="flex items-center space-x-2 text-primary mb-4">
                <Globe className="h-5 w-5" />
                <h3 className="font-medium">Language & Region</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <select id="language" className="w-full rounded-md border border-input bg-background px-3 py-2 mt-1">
                    <option value="en">English</option>
                    <option value="hi">हिंदी (Hindi)</option>
                    <option value="te">తెలుగు (Telugu)</option>
                    <option value="ta">தமிழ் (Tamil)</option>
                    <option value="kn">ಕನ್ನಡ (Kannada)</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <select id="timezone" className="w-full rounded-md border border-input bg-background px-3 py-2 mt-1">
                    <option value="ist">Indian Standard Time (IST)</option>
                    <option value="gmt">Greenwich Mean Time (GMT)</option>
                    <option value="est">Eastern Standard Time (EST)</option>
                    <option value="pst">Pacific Standard Time (PST)</option>
                  </select>
                </div>
              </div>
              
              <Button className="mt-4">Save Preferences</Button>
            </Card>
            
            <Card className="p-6 mt-6">
              <div className="flex items-center space-x-2 text-red-500">
                <LogOut className="h-5 w-5" />
                <h3 className="font-medium">Account Management</h3>
              </div>
              
              <div className="mt-4 space-y-4">
                <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
                
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500 mb-2">
                    This will permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DealerLayout>
  );
};

export default DealerSettings;
