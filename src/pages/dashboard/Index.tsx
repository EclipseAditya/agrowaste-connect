import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Wallet, Package, Clock, History } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const [activeListings, setActiveListings] = useState(0);

  useEffect(() => {
    const fetchListingsCount = async () => {
      const { count } = await supabase
        .from("waste_listings")
        .select("*", { count: 'exact' })
        .eq('available', true);
      
      setActiveListings(count || 0);
    };

    fetchListingsCount();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 space-y-2">
            <div className="flex items-center space-x-2 text-primary">
              <Wallet className="h-5 w-5" />
              <h3 className="font-medium">Total Earnings</h3>
            </div>
            <p className="text-2xl font-bold">₹0.00</p>
          </Card>
          
          <Card className="p-6 space-y-2">
            <div className="flex items-center space-x-2 text-primary">
              <Package className="h-5 w-5" />
              <h3 className="font-medium">Active Listings</h3>
            </div>
            <p className="text-2xl font-bold">{activeListings}</p>
          </Card>
          
          <Card className="p-6 space-y-2">
            <div className="flex items-center space-x-2 text-primary">
              <Clock className="h-5 w-5" />
              <h3 className="font-medium">Pending Orders</h3>
            </div>
            <p className="text-2xl font-bold">0</p>
          </Card>
          
          <Card className="p-6 space-y-2">
            <div className="flex items-center space-x-2 text-primary">
              <History className="h-5 w-5" />
              <h3 className="font-medium">Recent Transactions</h3>
            </div>
            <p className="text-2xl font-bold">0</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
            <div className="text-sm text-gray-500">No recent activity</div>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Upcoming Orders</h3>
            <div className="text-sm text-gray-500">No upcoming orders</div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
