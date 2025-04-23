
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

// Define the waste type as a TypeScript type that matches the Supabase enum
type WasteType = Database['public']['Enums']['waste_type'];

const wasteTypes = [
  { value: "coconut_husks", label: "Coconut Husks" },
  { value: "banana_peels", label: "Banana Peels" },
  { value: "rice_husks", label: "Rice Husks" },
  { value: "sugarcane_bagasse", label: "Sugarcane Bagasse" },
  { value: "other", label: "Other" },
];

const NewWasteListing = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    waste_type: "" as WasteType,
    quantity: "",
    unit: "",
    price: "",
    location: "", // Location field
  });

  // Fetch the current user on component mount
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser({ id: data.user.id });
      }
    };
    
    fetchUser();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Check if user is authenticated
      if (!user) {
        throw new Error("You must be logged in to create a listing");
      }

      const imageUrls: string[] = [];

      // Upload images
      for (const image of images) {
        const fileName = `${crypto.randomUUID()}-${image.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("waste_images")
          .upload(fileName, image);

        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from("waste_images")
          .getPublicUrl(fileName);
          
        imageUrls.push(publicUrl);
      }

      // Create waste listing - ensure waste_type is properly typed
      const { data, error: insertError } = await supabase
        .from("waste_listings")
        .insert({
          title: formData.title,
          description: formData.description,
          waste_type: formData.waste_type,
          quantity: parseFloat(formData.quantity),
          unit: formData.unit,
          price: parseFloat(formData.price),
          images: imageUrls,
          available: true,
          user_id: user?.id,
          location: formData.location, // Include location field
        })
        .select();

      if (insertError) throw insertError;

      toast({
        title: "Success",
        description: "Your waste listing has been created and is now available to dealers.",
      });

      navigate("/dashboard/waste");
    } catch (error: any) {
      console.error("Error creating listing:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Waste Listing</h1>
        
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <Input
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Fresh Coconut Husks Available"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Waste Type</label>
              <Select
                value={formData.waste_type}
                onValueChange={(value) => setFormData({ ...formData, waste_type: value as WasteType })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select waste type" />
                </SelectTrigger>
                <SelectContent>
                  {wasteTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your waste material..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <Input
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Unit</label>
                <Input
                  required
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  placeholder="kg, tons, etc."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Price (INR)</label>
              <Input
                required
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Images</label>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">
                You can upload multiple images. Supported formats: JPG, PNG
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <Input
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Mumbai, Maharashtra"
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Listing
            </Button>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default NewWasteListing;
