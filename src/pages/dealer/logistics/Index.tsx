
import DealerLayout from "@/components/dealer/DealerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Truck, 
  PackageCheck, 
  Calendar, 
  Clock, 
  MapPin,
  CheckCircle2
} from "lucide-react";

const Logistics = () => {
  return (
    <DealerLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Logistics & Delivery</h1>
        
        <Tabs defaultValue="upcoming">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming Pickups</TabsTrigger>
            <TabsTrigger value="preferences">Logistics Preferences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Truck className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">Rice Husks Pickup</h3>
                        <p className="text-sm text-gray-500">Order #ORD-2023-001</p>
                        
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm">April 10, 2025</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm">10:00 AM - 12:00 PM</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm">Green Valley Farms, Bangalore Rural</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 h-1 bg-primary"></div>
                      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 h-1 bg-gray-200"></div>
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <Truck className="h-4 w-4 text-gray-500" />
                      </div>
                      <div className="flex-1 h-1 bg-gray-200"></div>
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <PackageCheck className="h-4 w-4 text-gray-500" />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 text-xs text-center">
                      <div>Confirmed</div>
                      <div>Scheduled</div>
                      <div>In Transit</div>
                      <div>Delivered</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-between">
                    <Button variant="outline">Reschedule</Button>
                    <Button>Track Details</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Truck className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">Coconut Husk Pickup</h3>
                        <p className="text-sm text-gray-500">Order #ORD-2023-002</p>
                        
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm">April 15, 2025</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm">2:00 PM - 4:00 PM</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm">Ramesh Farms, Mysore</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 h-1 bg-gray-200"></div>
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-gray-500" />
                      </div>
                      <div className="flex-1 h-1 bg-gray-200"></div>
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <Truck className="h-4 w-4 text-gray-500" />
                      </div>
                      <div className="flex-1 h-1 bg-gray-200"></div>
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <PackageCheck className="h-4 w-4 text-gray-500" />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 text-xs text-center">
                      <div>Confirmed</div>
                      <div>Scheduled</div>
                      <div>In Transit</div>
                      <div>Delivered</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-between">
                    <Button variant="outline">Reschedule</Button>
                    <Button>Track Details</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="preferences" className="mt-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Delivery Preferences</h3>
                  <RadioGroup defaultValue="platform">
                    <div className="flex items-start space-x-2 mb-3">
                      <RadioGroupItem value="platform" id="platform" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="platform" className="font-medium">Platform Delivery</Label>
                        <p className="text-sm text-gray-500">
                          Our logistics partners will handle the delivery for you.
                          Additional fees may apply based on distance and weight.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value="self" id="self" />
                      <div className="grid gap-1.5">
                        <Label htmlFor="self" className="font-medium">Self Pickup</Label>
                        <p className="text-sm text-gray-500">
                          You'll arrange your own transportation to pick up the goods.
                          Coordinate directly with the farmer for pickup details.
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Default Shipping Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Company Name</Label>
                      <Input id="company" placeholder="Your Company Name" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="address">Address Line 1</Label>
                      <Input id="address" placeholder="Street Address" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="address2">Address Line 2</Label>
                      <Input id="address2" placeholder="Apt, Suite, etc." className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="City" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input id="state" placeholder="State" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="zip">Zip/Postal Code</Label>
                      <Input id="zip" placeholder="Postal Code" className="mt-1" />
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-4">Preferred Logistics Partners</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="partner1" 
                        className="rounded border-gray-300"
                      />
                      <label htmlFor="partner1">Green Logistics</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="partner2" 
                        className="rounded border-gray-300"
                      />
                      <label htmlFor="partner2">EcoTransport</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="partner3" 
                        className="rounded border-gray-300"
                      />
                      <label htmlFor="partner3">Swift Delivery</label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DealerLayout>
  );
};

export default Logistics;
