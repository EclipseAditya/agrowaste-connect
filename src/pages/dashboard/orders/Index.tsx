
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Orders = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        
        <Tabs defaultValue="incoming">
          <TabsList>
            <TabsTrigger value="incoming">Incoming Orders</TabsTrigger>
            <TabsTrigger value="history">Order History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="incoming">
            <Card className="p-6">
              <p className="text-gray-500">No incoming orders at the moment.</p>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card className="p-6">
              <p className="text-gray-500">No order history available.</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Orders;
