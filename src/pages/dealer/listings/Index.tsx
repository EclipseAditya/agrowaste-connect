
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DealerLayout from "@/components/dealer/DealerLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/components/ui/use-toast";
import ListingCard from "@/components/dealer/listings/ListingCard";
import FilterSidebar from "@/components/dealer/listings/FilterSidebar";
import SearchBar from "@/components/dealer/listings/SearchBar";

interface WasteListing {
  id: string;
  title: string;
  description: string;
  waste_type: string;
  quantity: number;
  unit: string;
  price: number;
  images?: string[];
  created_at: string;
  user_id: string;
  available?: boolean;
  currency?: string;
  updated_at?: string;
  location?: string | null;
}

const wasteTypeOptions = [
  { value: "coconut_husks", label: "Coconut Husk" },
  { value: "banana_peels", label: "Banana Peels" },
  { value: "rice_husks", label: "Rice Husks" },
  { value: "sugarcane_bagasse", label: "Sugarcane Bagasse" },
  { value: "other", label: "Other" },
];

const formatWasteType = (type: string) => {
  const option = wasteTypeOptions.find(opt => opt.value === type);
  return option ? option.label : type.replace(/_/g, ' ');
};

const BrowseListings = () => {
  const navigate = useNavigate();
  const { addItem, getTotalItems } = useCart();

  const [listings, setListings] = useState<WasteListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]); // Increasing max price range
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [minRating, setMinRating] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Set up real-time subscription for new/updated/deleted listings
    const channel = supabase
      .channel("public:waste_listings")
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "waste_listings",
      }, payload => {
        console.log("New listing received:", payload);
        const newListing = payload.new as WasteListing;
        
        setListings(prev => [newListing, ...prev]);
        toast({
          title: "New listing available!",
          description: `${newListing.title} - ${newListing.quantity} ${newListing.unit} available at ₹${newListing.price}/${newListing.unit}`,
          action: (
            <Button
              variant="outline"
              onClick={() =>
                navigate("/dealer/listings", { replace: true })
              }
            >
              View Now
            </Button>
          ),
        });
      })
      .on("postgres_changes", {
        event: "UPDATE",
        schema: "public",
        table: "waste_listings",
      }, payload => {
        console.log("Listing updated:", payload);
        const updatedListing = payload.new as WasteListing;
        
        setListings(prev =>
          prev.map(listing =>
            listing.id === updatedListing.id ? updatedListing : listing
          )
        );
      })
      .on("postgres_changes", {
        event: "DELETE",
        schema: "public",
        table: "waste_listings",
      }, payload => {
        console.log("Listing deleted:", payload);
        const deletedListingId = payload.old.id;
        setListings(prev => prev.filter(listing => listing.id !== deletedListingId));
      })
      .subscribe();

    // Fetch initial listings
    fetchListings();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchListings = async () => {
    try {
      setIsLoading(true);
      console.log("Fetching listings...");
      
      const { data, error } = await supabase
        .from("waste_listings")
        .select("*")
        .eq("available", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching listings:", error);
        throw error;
      }

      console.log("Fetched listings raw data:", data);
      
      // Convert and type-cast the data to WasteListing[]
      const wasteListing = data as WasteListing[];
      setListings(wasteListing);
      
      console.log("Listings after set:", wasteListing);
    } catch (error) {
      console.error("Error fetching listings:", error);
      toast({
        title: "Error",
        description: "Failed to fetch listings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredListings = listings.filter(listing => {
    // Search filter
    if (searchQuery && !listing.title?.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    // Waste type filter
    if (selectedTypes.length > 0 && !selectedTypes.includes(listing.waste_type)) {
      return false;
    }
    // Price filter
    if (listing.price < priceRange[0] || listing.price > priceRange[1]) {
      return false;
    }
    // Location filter if selected
    if (selectedLocation !== "all" && listing.location !== selectedLocation) {
      return false;
    }
    return true;
  });

  const handleAddToCart = (listing: WasteListing) => {
    addItem({
      id: listing.id,
      title: listing.title,
      quantity: 1,
      price: listing.price,
      max_quantity: listing.quantity,
      unit: listing.unit,
      image: listing.images?.[0] || undefined,
      user_id: listing.user_id || "",
    });
    
    toast({
      title: "Added to cart",
      description: `${listing.title} has been added to your cart.`,
    });
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedTypes([]);
    setPriceRange([0, 1000]);
    setSelectedLocation("all");
    setMinRating(0);
  };

  console.log("Filtered listings count:", filteredListings.length);
  console.log("Total listings count:", listings.length);

  return (
    <DealerLayout>
      <div className="space-y-6">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          getTotalItems={getTotalItems}
          onCartClick={() => navigate("/dealer/cart")}
        />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <FilterSidebar
            show={showFilters}
            onClose={() => setShowFilters(false)}
            wasteTypeOptions={wasteTypeOptions}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            minRating={minRating}
            setMinRating={setMinRating}
            handleResetFilters={handleResetFilters}
          />
          <div className="lg:col-span-3 space-y-6">
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : listings.length === 0 ? (
              <Card className="p-6 text-center">
                <h3 className="font-medium mb-2">No listings available</h3>
                <p className="text-gray-500">
                  There are currently no waste listings available.
                </p>
              </Card>
            ) : filteredListings.length === 0 ? (
              <Card className="p-6 text-center">
                <h3 className="font-medium mb-2">No listings found</h3>
                <p className="text-gray-500">
                  No waste listings match your current filters.
                </p>
                <Button variant="outline" className="mt-4" onClick={handleResetFilters}>
                  Reset Filters
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredListings.map(listing => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    formatWasteType={formatWasteType}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
            {!isLoading && filteredListings.length > 0 && (
              <div className="flex justify-center">
                <Button variant="outline">Load More</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DealerLayout>
  );
};

export default BrowseListings;
