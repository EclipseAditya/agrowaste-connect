
import { Star, ShoppingCart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface ListingCardProps {
  listing: {
    id: string;
    title: string;
    description?: string;
    waste_type: string;
    quantity: number;
    unit: string;
    price: number;
    images?: string[];
    location?: string | null;
    user_id: string;
  };
  formatWasteType: (type: string) => string;
  onAddToCart: (listing: any) => void;
}

const ListingCard = ({
  listing,
  formatWasteType,
  onAddToCart,
}: ListingCardProps) => (
  <Card className="overflow-hidden">
    <div className="relative h-48 bg-gray-100">
      {listing.images?.[0] ? (
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-gray-400">No Image</span>
        </div>
      )}
    </div>
    <div className="p-4 space-y-4">
      <div>
        <h3 className="font-medium text-lg">{listing.title}</h3>
        <Badge variant="outline" className="mt-1">
          {formatWasteType(listing.waste_type)}
        </Badge>
        {(listing.location ?? "Unknown location") && (
          <p className="text-sm text-gray-500 mt-1">
            📍 {listing.location ?? "Unknown location"}
          </p>
        )}
        <div className="flex items-center gap-1 mt-1">
          {/* Placeholder for rating */}
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <Star className="h-3 w-3 text-gray-300" />
          <span className="text-xs text-gray-500">(16)</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">Quantity</p>
          <p className="font-medium">
            {listing.quantity} {listing.unit}
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-500 text-sm">Price</p>
          <p className="font-bold text-primary">
            ₹{listing.price}/{listing.unit}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1">
          Make Offer
        </Button>
        <Button
          size="sm"
          className="flex-1"
          onClick={() => onAddToCart(listing)}
        >
          <ShoppingCart className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>
    </div>
  </Card>
);

export default ListingCard;
