
import { Star, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface WasteTypeOption {
  value: string;
  label: string;
}

interface FilterSidebarProps {
  show: boolean;
  onClose: () => void;
  wasteTypeOptions: WasteTypeOption[];
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  priceRange: [number, number];
  setPriceRange: (rng: [number, number]) => void;
  minRating: number;
  setMinRating: (num: number) => void;
  handleResetFilters: () => void;
}

const FilterSidebar = ({
  show,
  onClose,
  wasteTypeOptions,
  selectedTypes,
  setSelectedTypes,
  selectedLocation,
  setSelectedLocation,
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  handleResetFilters,
}: FilterSidebarProps) => (
  <Card className={`p-4 space-y-6 h-fit lg:sticky lg:top-6 ${show ? 'block' : 'hidden lg:block'}`}>
    <h3 className="font-medium border-b pb-2">Filters</h3>

    <div className="space-y-3">
      <h4 className="text-sm font-medium">Waste Type</h4>
      <div className="space-y-2">
        {wasteTypeOptions.map(option => (
          <div key={option.value} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={option.value}
              className="rounded border-gray-300"
              checked={selectedTypes.includes(option.value)}
              onChange={e => {
                if (e.target.checked) {
                  setSelectedTypes([...selectedTypes, option.value]);
                } else {
                  setSelectedTypes(selectedTypes.filter(type => type !== option.value));
                }
              }}
            />
            <Label htmlFor={option.value}>{option.label}</Label>
          </div>
        ))}
      </div>
    </div>

    <div className="space-y-3">
      <h4 className="text-sm font-medium">Location</h4>
      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
        <SelectTrigger>
          <SelectValue placeholder="Select location" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Locations</SelectItem>
          <SelectItem value="mumbai">Mumbai</SelectItem>
          <SelectItem value="delhi">Delhi</SelectItem>
          <SelectItem value="bangalore">Bangalore</SelectItem>
          <SelectItem value="chennai">Chennai</SelectItem>
          <SelectItem value="pind">Pind</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div className="space-y-3">
      <div className="flex justify-between">
        <h4 className="text-sm font-medium">Price Range</h4>
        <span className="text-sm text-gray-500">
          ₹{priceRange[0]} - ₹{priceRange[1]}
        </span>
      </div>
      <Slider
        defaultValue={[0, 1000]}
        min={0}
        max={1000}
        step={10}
        value={priceRange}
        onValueChange={value => setPriceRange(value as [number, number])}
      />
    </div>

    <div className="space-y-3">
      <h4 className="text-sm font-medium">Farmer Rating</h4>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`h-4 w-4 cursor-pointer ${star <= minRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            onClick={() => setMinRating(star)}
          />
        ))}
        <span className="text-sm text-gray-500 ml-1">
          {minRating > 0 ? `& Up` : ''}
        </span>
      </div>
    </div>

    <div className="pt-2 flex gap-2">
      <Button variant="outline" className="w-1/2" onClick={handleResetFilters}>
        Reset
      </Button>
      <Button className="w-1/2" onClick={onClose}>
        Apply
      </Button>
    </div>
  </Card>
);

export default FilterSidebar;
