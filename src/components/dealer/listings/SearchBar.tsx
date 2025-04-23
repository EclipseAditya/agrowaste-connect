
import { Search, Filter, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  getTotalItems: () => number;
  onCartClick: () => void;
}

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  showFilters,
  setShowFilters,
  getTotalItems,
  onCartClick,
}: SearchBarProps) => (
  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
    <h1 className="text-2xl font-bold text-gray-900">Browse Waste Listings</h1>
    <div className="flex gap-2">
      <div className="relative flex-grow">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search listings..."
          className="pl-8 w-full md:w-64"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
        <Filter className="h-4 w-4 mr-2" />
        Filters
      </Button>
      <Button
        variant="outline"
        className="relative"
        onClick={onCartClick}
      >
        <ShoppingCart className="h-4 w-4" />
        {getTotalItems() > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
            {getTotalItems()}
          </Badge>
        )}
      </Button>
    </div>
  </div>
);

export default SearchBar;
