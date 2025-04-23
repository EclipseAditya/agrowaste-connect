
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Plus, Loader2, PencilIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface WasteListing {
  id: string;
  title: string;
  description: string;
  waste_type: string;
  quantity: number;
  unit: string;
  price: number;
  images: string[];
  created_at: string;
}

const WasteDashboard = () => {
  const [listings, setListings] = useState<WasteListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const { data, error } = await supabase
        .from("waste_listings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setListings(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch waste listings",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;

    try {
      const { error } = await supabase
        .from("waste_listings")
        .delete()
        .match({ id });

      if (error) throw error;

      setListings(listings.filter((listing) => listing.id !== id));
      toast({
        title: "Success",
        description: "Listing deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Waste Management</h1>
          <Link to="/dashboard/waste/new">
            <Button>
              <Plus className="h-5 w-5 mr-2" />
              Add New Listing
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : listings.length === 0 ? (
          <Card className="p-6">
            <p className="text-gray-500 text-center">
              No waste listings yet. Add your first listing!
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <Card key={listing.id} className="overflow-hidden">
                {listing.images?.[0] && (
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{listing.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{listing.description}</p>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">Type:</span>{" "}
                      {listing.waste_type.replace("_", " ")}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Quantity:</span>{" "}
                      {listing.quantity} {listing.unit}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Price:</span> ₹{listing.price}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-end gap-2">
                  <Button variant="outline" size="icon">
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(listing.id)}
                  >
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default WasteDashboard;
