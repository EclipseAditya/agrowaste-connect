
import DealerLayout from "@/components/dealer/DealerLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Star, ChevronRight, ThumbsUp } from "lucide-react";

const Reviews = () => {
  return (
    <DealerLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Reviews & Ratings</h1>
        
        <Tabs defaultValue="submit">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="submit">Submit Reviews</TabsTrigger>
            <TabsTrigger value="browse">Browse Farmer Ratings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="submit" className="mt-6">
            <Card className="p-6">
              <h2 className="text-lg font-medium mb-4">Pending Reviews</h2>
              
              <div className="space-y-6">
                <div className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Ramesh Farms</h3>
                        <p className="text-sm text-gray-500">Order #ORD-2023-002 (Coconut Husk)</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Rate Now
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Green Valley</h3>
                        <p className="text-sm text-gray-500">Order #ORD-2023-001 (Rice Husks)</p>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-1/2 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="rating">Rating</Label>
                        <div className="flex items-center space-x-1">
                          <Star className="h-7 w-7 fill-yellow-400 text-yellow-400 cursor-pointer" />
                          <Star className="h-7 w-7 fill-yellow-400 text-yellow-400 cursor-pointer" />
                          <Star className="h-7 w-7 fill-yellow-400 text-yellow-400 cursor-pointer" />
                          <Star className="h-7 w-7 fill-yellow-400 text-yellow-400 cursor-pointer" />
                          <Star className="h-7 w-7 text-gray-300 cursor-pointer" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="review">Review</Label>
                        <Textarea 
                          placeholder="Write your review here..." 
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="title">Review Title</Label>
                        <Input placeholder="Summarize your experience" />
                      </div>
                      <div className="flex justify-end">
                        <Button>Submit Review</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="browse" className="mt-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium">Top Rated Farmers</h2>
                <div className="relative">
                  <Input placeholder="Search by name..." className="w-64" />
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Farmer 1 */}
                <div className="border rounded-lg overflow-hidden">
                  <div className="p-4 flex items-start justify-between bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">Ramesh Farms</h3>
                        <div className="flex items-center mt-1">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <Star className="h-4 w-4 text-gray-300" />
                          </div>
                          <span className="text-sm text-gray-500 ml-2">4.0 (16 reviews)</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View Profile <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                  
                  <div className="p-4 space-y-4">
                    <div className="border-b pb-4">
                      <div className="flex justify-between mb-2">
                        <div>
                          <span className="font-medium">Great quality coconut husks</span>
                          <div className="flex items-center mt-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">April 1, 2025</span>
                      </div>
                      <p className="text-sm">The quality of coconut husks was excellent. Very consistent size and quality. Would definitely order again.</p>
                      <div className="flex items-center mt-2">
                        <Button variant="ghost" size="sm" className="text-xs h-7">
                          <ThumbsUp className="h-3 w-3 mr-1" /> Helpful (3)
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <div>
                          <span className="font-medium">Prompt delivery</span>
                          <div className="flex items-center mt-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <Star className="h-3 w-3 text-gray-300" />
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">March 25, 2025</span>
                      </div>
                      <p className="text-sm">Very reliable and prompt with delivery. The husks were properly dried and ready to use.</p>
                      <div className="flex items-center mt-2">
                        <Button variant="ghost" size="sm" className="text-xs h-7">
                          <ThumbsUp className="h-3 w-3 mr-1" /> Helpful (1)
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Farmer 2 */}
                <div className="border rounded-lg overflow-hidden">
                  <div className="p-4 flex items-start justify-between bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">Green Valley</h3>
                        <div className="flex items-center mt-1">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          </div>
                          <span className="text-sm text-gray-500 ml-2">5.0 (28 reviews)</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View Profile <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                  
                  <div className="p-4 space-y-4">
                    <div className="border-b pb-4">
                      <div className="flex justify-between mb-2">
                        <div>
                          <span className="font-medium">Exceptional quality and service</span>
                          <div className="flex items-center mt-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">April 5, 2025</span>
                      </div>
                      <p className="text-sm">Green Valley provides the best rice husks I've found. Their communication is excellent and they're very reliable.</p>
                      <div className="flex items-center mt-2">
                        <Button variant="ghost" size="sm" className="text-xs h-7">
                          <ThumbsUp className="h-3 w-3 mr-1" /> Helpful (5)
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DealerLayout>
  );
};

export default Reviews;
