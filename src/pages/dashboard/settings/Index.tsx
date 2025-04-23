import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, CreditCard, Globe, LogOut } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const Settings = () => {
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
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        
        <div className="grid gap-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center space-x-2 text-primary">
              <User className="h-5 w-5" />
              <h3 className="font-medium">Profile Information</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <Input placeholder="Your full name" className="mt-1" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <Input type="email" placeholder="your@email.com" className="mt-1" />
              </div>
              <Button>Save Changes</Button>
            </div>
          </Card>
          
          <Card className="p-6 space-y-4">
            <div className="flex items-center space-x-2 text-primary">
              <CreditCard className="h-5 w-5" />
              <h3 className="font-medium">Payment Methods</h3>
            </div>
            <p className="text-gray-600">No payment methods added yet.</p>
            <Button variant="outline">Add Payment Method</Button>
          </Card>
          
          <Card className="p-6 space-y-4">
            <div className="flex items-center space-x-2 text-primary">
              <Globe className="h-5 w-5" />
              <h3 className="font-medium">Language Preferences</h3>
            </div>
            <select className="w-full rounded-md border border-input bg-background px-3 py-2">
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
            </select>
          </Card>
          
          <Card className="p-6 space-y-4">
            <div className="flex items-center space-x-2 text-red-500">
              <LogOut className="h-5 w-5" />
              <h3 className="font-medium">Sign Out</h3>
            </div>
            <p className="text-gray-600">Sign out from your account.</p>
            <Button variant="destructive" onClick={handleSignOut}>Sign Out</Button>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
