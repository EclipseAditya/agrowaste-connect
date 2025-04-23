
import DealerLayout from "@/components/dealer/DealerLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Book, Video, FileQuestion, Lightbulb, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";

const DealerLearning = () => {
  return (
    <DealerLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Learning Hub</h1>
          <div className="relative max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search resources..."
              className="pl-8"
            />
          </div>
        </div>
        
        <Tabs defaultValue="resources">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="faq">FAQs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="resources" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="overflow-hidden">
                <div className="h-40 bg-gray-100 relative">
                  <img 
                    src="https://via.placeholder.com/500x300?text=Sustainable+Product+Development" 
                    alt="Sustainable Product Development" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 rounded">
                    Guide
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <h3 className="font-medium">Sustainable Product Development Using Farm Waste</h3>
                  <p className="text-sm text-gray-500">Learn how to develop eco-friendly products using agricultural waste materials.</p>
                  <Button variant="ghost" className="w-full flex justify-between items-center">
                    Read More <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="h-40 bg-gray-100 relative">
                  <img 
                    src="https://via.placeholder.com/500x300?text=Supply+Chain+Management" 
                    alt="Supply Chain Management" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 rounded">
                    Case Study
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <h3 className="font-medium">Efficient Supply Chain Management for Farm Waste</h3>
                  <p className="text-sm text-gray-500">Best practices for managing the logistics of agricultural waste collection and processing.</p>
                  <Button variant="ghost" className="w-full flex justify-between items-center">
                    Read More <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="h-40 bg-gray-100 relative">
                  <img 
                    src="https://via.placeholder.com/500x300?text=Quality+Control" 
                    alt="Quality Control" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 rounded">
                    Handbook
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <h3 className="font-medium">Quality Control for Agricultural Waste Materials</h3>
                  <p className="text-sm text-gray-500">How to ensure the quality and consistency of farm waste for industrial use.</p>
                  <Button variant="ghost" className="w-full flex justify-between items-center">
                    Read More <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </div>
            
            <div className="mt-6">
              <h2 className="text-lg font-medium mb-4">Featured Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4 flex space-x-4">
                  <div className="flex-shrink-0 h-16 w-16 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Lightbulb className="h-8 w-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Innovative Uses of Coconut Husk in Packaging</h3>
                    <p className="text-sm text-gray-500">Explore how coconut husks are revolutionizing eco-friendly packaging solutions.</p>
                    <Button variant="link" className="p-0">Read Article</Button>
                  </div>
                </Card>
                
                <Card className="p-4 flex space-x-4">
                  <div className="flex-shrink-0 h-16 w-16 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Lightbulb className="h-8 w-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">Rice Husk Ash: Properties and Industrial Applications</h3>
                    <p className="text-sm text-gray-500">Learn about the beneficial properties of rice husk ash and its various industrial uses.</p>
                    <Button variant="link" className="p-0">Read Article</Button>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="videos" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="overflow-hidden">
                <div className="h-48 bg-gray-800 relative flex items-center justify-center">
                  <Video className="h-12 w-12 text-white opacity-70" />
                  <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    15:24
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-medium">How to Process Coconut Husks for Manufacturing</h3>
                  <p className="text-sm text-gray-500">A step-by-step guide on processing coconut husks for industrial use.</p>
                  <Button variant="ghost" className="w-full flex justify-between items-center">
                    Watch Now <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="h-48 bg-gray-800 relative flex items-center justify-center">
                  <Video className="h-12 w-12 text-white opacity-70" />
                  <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    08:37
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-medium">Success Story: Recycled Packaging from Agricultural Waste</h3>
                  <p className="text-sm text-gray-500">Interview with a successful entrepreneur using farm waste for packaging.</p>
                  <Button variant="ghost" className="w-full flex justify-between items-center">
                    Watch Now <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="h-48 bg-gray-800 relative flex items-center justify-center">
                  <Video className="h-12 w-12 text-white opacity-70" />
                  <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    12:05
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-medium">Platform Tutorial: Making the Most of AgriCycle</h3>
                  <p className="text-sm text-gray-500">Learn all the features of the AgriCycle platform to optimize your experience.</p>
                  <Button variant="ghost" className="w-full flex justify-between items-center">
                    Watch Now <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="faq" className="mt-6">
            <Card className="p-6">
              <h2 className="text-lg font-medium mb-4">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileQuestion className="h-3 w-3 text-primary" />
                    </div>
                    <h3 className="font-medium">How do I ensure consistent quality when ordering agricultural waste?</h3>
                  </div>
                  <div className="pl-9">
                    <p className="text-sm text-gray-600">
                      To ensure consistent quality, check farmer ratings and reviews, request samples before placing large orders, and establish clear quality metrics in your purchase agreements. You can also filter farmers by rating on our platform.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileQuestion className="h-3 w-3 text-primary" />
                    </div>
                    <h3 className="font-medium">What payment methods are accepted on the platform?</h3>
                  </div>
                  <div className="pl-9">
                    <p className="text-sm text-gray-600">
                      We currently accept credit/debit cards, net banking, UPI, and wallet payments. All transactions are secured through our payment processor. For large orders, you can also request an invoice for bank transfer.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileQuestion className="h-3 w-3 text-primary" />
                    </div>
                    <h3 className="font-medium">How can I track my orders?</h3>
                  </div>
                  <div className="pl-9">
                    <p className="text-sm text-gray-600">
                      You can track all your orders in the Orders section of your dashboard. For orders using our platform's logistics partners, real-time tracking is available. For self-pickup orders, you'll receive updates on preparation status.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileQuestion className="h-3 w-3 text-primary" />
                    </div>
                    <h3 className="font-medium">What happens if I receive poor quality materials?</h3>
                  </div>
                  <div className="pl-9">
                    <p className="text-sm text-gray-600">
                      If you receive materials that don't meet the agreed-upon quality standards, you can raise a dispute within 48 hours of delivery. Our team will review the case and facilitate a resolution between you and the farmer.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileQuestion className="h-3 w-3 text-primary" />
                    </div>
                    <h3 className="font-medium">Can I get a sample before placing a bulk order?</h3>
                  </div>
                  <div className="pl-9">
                    <p className="text-sm text-gray-600">
                      Yes, many farmers on our platform offer sample options. Look for the "Request Sample" button on listings. Sample fees are typically applied but may be credited toward your full order if you proceed with the purchase.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-center">
                  Can't find the answer you're looking for?
                  <Button variant="link">Contact Support</Button>
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DealerLayout>
  );
};

export default DealerLearning;
