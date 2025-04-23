
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DealerLayout from "@/components/dealer/DealerLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash2, Plus, Minus, AlertTriangle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [sellers, setSellers] = useState<Record<string, { full_name: string }>>({});

  // Fetch seller information for each item
  useEffect(() => {
    const fetchSellers = async () => {
      const sellerIds = [...new Set(items
        .filter(item => item.user_id) // Filter out items that don't have user_id
        .map(item => item.user_id))];
      
      for (const sellerId of sellerIds) {
        const { data, error } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', sellerId)
          .single();
          
        if (!error && data) {
          setSellers(prev => ({
            ...prev,
            [sellerId]: data
          }));
        }
      }
    };

    if (items.length > 0) {
      fetchSellers();
    }
  }, [items]);

  const handleQuantityChange = (id: string, increment: number) => {
    const item = items.find(item => item.id === id);
    if (!item) return;
    
    const newQuantity = item.quantity + increment;
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleInputQuantityChange = (id: string, value: string) => {
    const quantity = parseInt(value);
    if (!isNaN(quantity) && quantity >= 1) {
      updateQuantity(id, quantity);
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart before checkout.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      // In a real application, you would:
      // 1. Create an order in the database
      // 2. Process payment through a payment gateway
      // 3. Update inventory
      
      // For now, let's just simulate a successful checkout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Order placed successfully!",
        description: "Your order has been placed and will be processed soon.",
      });
      
      clearCart();
      navigate("/dealer/orders");
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <DealerLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          
          {items.length > 0 && (
            <Button variant="outline" onClick={clearCart}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          <Card className="p-8 text-center">
            <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-4">
              Looks like you haven't added any agricultural waste to your cart yet.
            </p>
            <Button onClick={() => navigate("/dealer/listings")}>
              Browse Listings
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex gap-4">
                    {item.image ? (
                      <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center">
                        <ShoppingCart className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          {item.user_id && sellers[item.user_id] && (
                            <p className="text-sm text-gray-500">
                              Seller: {sellers[item.user_id].full_name}
                            </p>
                          )}
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <p className="text-sm text-gray-500 mb-2">
                        Price: ₹{item.price}/{item.unit}
                      </p>
                      
                      <div className="flex items-center">
                        <button 
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="p-1 border rounded-l-md"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleInputQuantityChange(item.id, e.target.value)}
                          className="w-16 text-center rounded-none border-l-0 border-r-0"
                          min="1"
                          max={item.max_quantity}
                        />
                        <button 
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="p-1 border rounded-r-md"
                          disabled={item.quantity >= item.max_quantity}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        
                        <span className="ml-2 text-sm text-gray-500">
                          {item.quantity === item.max_quantity && (
                            <span className="flex items-center text-amber-600">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Max available
                            </span>
                          )}
                        </span>
                      </div>
                      
                      <p className="text-right font-medium mt-2">
                        Subtotal: ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div>
              <Card className="p-4 space-y-4 lg:sticky lg:top-6">
                <h3 className="font-medium text-lg">Order Summary</h3>
                
                <div>
                  <div className="flex justify-between py-2">
                    <span>Items ({getTotalItems()})</span>
                    <span>₹{getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span>Shipping</span>
                    <span>₹0.00</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span>Tax</span>
                    <span>₹0.00</span>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between py-2 font-medium">
                    <span>Total</span>
                    <span>₹{getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={handleCheckout}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Proceed to Checkout"}
                </Button>
              </Card>
            </div>
          </div>
        )}
      </div>
    </DealerLayout>
  );
};

export default Cart;
