
import DealerLayout from "@/components/dealer/DealerLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Download, 
  Truck, 
  FileEdit,
  Trash2
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";

interface OrderType {
  id: string;
  buyer_id: string;
  seller_id: string;
  waste_listing_id: string;
  total_price: number;
  quantity: number;
  status: string;
  created_at: string;
  listing: any;
  farmer_name: string;
}

const DealerOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders for this dealer and pull in listing + farmer name
  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      if (!user) return;
      const { data: orderData, error } = await supabase
        .from("orders")
        .select(`
          *,
          listing:waste_listing_id (
            id, title, quantity, unit, price, currency, user_id
          )
        `)
        .eq("buyer_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        setOrders([]);
        setLoading(false);
        return;
      }

      // Fetch all farmer names in one go
      const sellerIds = [
        ...new Set((orderData || []).map((o: any) => o.listing?.user_id).filter(Boolean)),
      ];

      let farmerNames: Record<string, string> = {};

      if (sellerIds.length > 0) {
        const { data: farmerProfiles } = await supabase
          .from("profiles")
          .select("id, full_name")
          .in("id", sellerIds);

        farmerProfiles?.forEach((profile: any) => {
          farmerNames[profile.id] = profile.full_name || "Unknown Farmer";
        });
      }

      const normalizedOrders = (orderData || []).map((order: any) => ({
        ...order,
        farmer_name: farmerNames[order.listing?.user_id] || "Unknown Farmer",
      }));

      setOrders(normalizedOrders);
      setLoading(false);
    }
    fetchOrders();
  }, [user]);

  return (
    <DealerLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Orders & Offers Management</h1>
        
        <Tabs defaultValue="orders">
          <TabsList className="grid w-full grid-cols-2">
            {/* You can add Offers logic later */}
            <TabsTrigger value="offers">My Offers</TabsTrigger>
            <TabsTrigger value="orders">My Orders</TabsTrigger>
          </TabsList>
          
          <TabsContent value="offers" className="mt-6">
            <Card className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-lg font-medium">Submitted Offers</h2>
                {/* You can add an offer creation button if needed */}
              </div>
              <p className="text-gray-400 italic">Feature coming soon: You'll see your submitted offers here.</p>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders" className="mt-6">
            <Card className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <h2 className="text-lg font-medium">Order History</h2>
              </div>
              {loading ? (
                <div className="text-center text-gray-500 py-8">Loading orders...</div>
              ) : orders.length === 0 ? (
                <div className="text-center text-gray-500 py-8">No orders found!</div>
              ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Waste Item</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Seller</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">#{order.id.slice(0,8)}</TableCell>
                        <TableCell>
                          {order.listing?.title || <span className="text-gray-400">[Deleted]</span>}
                        </TableCell>
                        <TableCell>
                          {order.quantity} {order.listing?.unit}
                        </TableCell>
                        <TableCell>{order.farmer_name}</TableCell>
                        <TableCell>
                          {order.total_price}
                          {order.listing?.currency === "INR" || !order.listing?.currency ? " ₹" : ` ${order.listing?.currency}`}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {
                              order.status === "pending" ? (
                                <Clock className="h-4 w-4 text-yellow-500 mr-1" />
                              ) : order.status === "shipped" ? (
                                <Truck className="h-4 w-4 text-blue-500 mr-1" />
                              ) : order.status === "delivered" ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                              ) : order.status === "rejected" ? (
                                <XCircle className="h-4 w-4 text-red-500 mr-1" />
                              ) : (
                                <Clock className="h-4 w-4 text-gray-400 mr-1" />
                              )
                            }
                            <span className="text-sm capitalize">{order.status || "pending"}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(order.created_at).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DealerLayout>
  );
};

export default DealerOrders;
