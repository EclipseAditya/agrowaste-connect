import DealerLayout from "@/components/dealer/DealerLayout";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Package, Clock, CreditCard, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const DealerDashboard = () => {
  const [activeOffers, setActiveOffers] = useState(0);

  useEffect(() => {
    const fetchActiveOffers = async () => {
      const { count } = await supabase
        .from("waste_listings")
        .select("*", { count: 'exact' })
        .eq('available', true);
      
      setActiveOffers(count || 0);
    };

    fetchActiveOffers();
  }, []);

  return (
    <DealerLayout>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 space-y-2">
            <div className="flex items-center space-x-2 text-primary">
              <ShoppingCart className="h-5 w-5" />
              <h3 className="font-medium">Current Orders</h3>
            </div>
            <p className="text-2xl font-bold">0</p>
          </Card>
          
          <Card className="p-6 space-y-2">
            <div className="flex items-center space-x-2 text-primary">
              <Package className="h-5 w-5" />
              <h3 className="font-medium">Active Offers</h3>
            </div>
            <p className="text-2xl font-bold">{activeOffers}</p>
          </Card>
          
          <Card className="p-6 space-y-2">
            <div className="flex items-center space-x-2 text-primary">
              <CreditCard className="h-5 w-5" />
              <h3 className="font-medium">Total Purchases</h3>
            </div>
            <p className="text-2xl font-bold">₹0.00</p>
          </Card>
          
          <Card className="p-6 space-y-2">
            <div className="flex items-center space-x-2 text-primary">
              <Clock className="h-5 w-5" />
              <h3 className="font-medium">Pending Payments</h3>
            </div>
            <p className="text-2xl font-bold">₹0.00</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Notifications</h3>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-3 py-2">
                <p className="font-medium">New waste listing available</p>
                <p className="text-sm text-gray-500">Coconut husks - 500kg available in Bangalore</p>
              </div>
              <div className="border-l-4 border-primary pl-3 py-2">
                <p className="font-medium">Offer accepted</p>
                <p className="text-sm text-gray-500">Your offer for banana peels has been accepted</p>
              </div>
              <div className="border-l-4 border-primary pl-3 py-2">
                <p className="font-medium">Shipping update</p>
                <p className="text-sm text-gray-500">Your order #1234 is out for delivery</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Recent Listings</h3>
              <Button variant="outline" size="sm">Browse All</Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-medium">Rice Husks</p>
                  <p className="text-sm text-gray-500">1000kg available</p>
                </div>
                <p className="font-medium text-primary">₹5/kg</p>
              </div>
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <p className="font-medium">Sugarcane Bagasse</p>
                  <p className="text-sm text-gray-500">750kg available</p>
                </div>
                <p className="font-medium text-primary">₹3/kg</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Corn Cobs</p>
                  <p className="text-sm text-gray-500">300kg available</p>
                </div>
                <p className="font-medium text-primary">₹6/kg</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DealerLayout>
  );
};

export default DealerDashboard;
