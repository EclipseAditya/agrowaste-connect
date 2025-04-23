
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Recycle, 
  Search, 
  Handshake, 
  Leaf, 
  Users, 
  Factory, 
  ArrowRight, 
  Check 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-100 to-secondary-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fadeIn">
          <h1 className="text-5xl font-bold text-primary">
            Transform Agricultural Waste into Value
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with businesses and artisans to give your agricultural waste a second life
            while contributing to a sustainable future.
          </p>
          <div className="space-x-4">
            <Button
              onClick={() => navigate("/login")}
              className="bg-primary hover:bg-primary-600 text-white px-8 py-6 text-lg hover-lift"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              className="px-8 py-6 text-lg border-primary text-primary hover:bg-primary-100 hover-lift"
              onClick={() => document.getElementById("learn-more")?.scrollIntoView({ behavior: "smooth" })}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Learn More Section */}
      <div id="learn-more" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* About Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About AgroWaste Connect</h2>
            <p className="text-xl text-gray-600">
              AgroWaste Connect is a platform that bridges the gap between agricultural waste producers and buyers. 
              We empower sustainable practices by giving waste a second life, transforming what was once discarded 
              into valuable resources for businesses and artisans.
            </p>
          </div>

          {/* How It Works */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              🌾 How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-primary/10 rounded-full">
                  <Recycle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Farmers List Waste</h3>
                <p className="text-gray-600">
                  Farmers upload details and photos of their agricultural waste, specifying quantities and availability.
                </p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-primary/10 rounded-full">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Dealers Explore</h3>
                <p className="text-gray-600">
                  Businesses or artisans browse available waste products suited to their needs, filtering by type and location.
                </p>
              </div>
              
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-primary/10 rounded-full">
                  <Handshake className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Connect & Transact</h3>
                <p className="text-gray-600">
                  They connect through the platform to negotiate and finalize deals, with secure payments and logistics support.
                </p>
              </div>
            </div>
          </div>

          {/* For Farmers & Dealers */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">👩‍🌾 For Farmers</h3>
              </div>
              
              <ul className="space-y-4">
                <li className="flex">
                  <Check className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                  <span>Easy waste listing with photo uploads and detailed descriptions</span>
                </li>
                <li className="flex">
                  <Check className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                  <span>Dashboard to manage uploads, track offers, and monitor sales</span>
                </li>
                <li className="flex">
                  <Check className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                  <span>Get insights on demand trends and pricing recommendations</span>
                </li>
                <li className="flex">
                  <Check className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                  <span>Turn agricultural waste into a new revenue stream</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <Factory className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">🏭 For Dealers & Artisans</h3>
              </div>
              
              <ul className="space-y-4">
                <li className="flex">
                  <Check className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                  <span>Searchable catalog of raw agricultural materials with detailed specifications</span>
                </li>
                <li className="flex">
                  <Check className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                  <span>Filter by type (e.g. coconut husk, paddy straw, etc.) and location</span>
                </li>
                <li className="flex">
                  <Check className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                  <span>Connect with verified farmers with rating and review system</span>
                </li>
                <li className="flex">
                  <Check className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                  <span>Sustainable sourcing made simple with streamlined ordering</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Impact Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
              🌱 Our Impact
            </h2>
            
            <div className="text-center mb-10">
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Our platform is helping create a more sustainable future by reducing agricultural waste 
                pollution, promoting circular economy, and empowering rural communities.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <Card className="bg-primary/5">
                  <CardContent className="p-6">
                    <p className="text-4xl font-bold text-primary mb-2">1000+</p>
                    <p className="text-gray-600">KG waste repurposed</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-primary/5">
                  <CardContent className="p-6">
                    <p className="text-4xl font-bold text-primary mb-2">50+</p>
                    <p className="text-gray-600">Successful connections</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-primary/5">
                  <CardContent className="p-6">
                    <p className="text-4xl font-bold text-primary mb-2">25+</p>
                    <p className="text-gray-600">Rural communities supported</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-primary/5">
                  <CardContent className="p-6">
                    <p className="text-4xl font-bold text-primary mb-2">15+</p>
                    <p className="text-gray-600">Product innovations</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          {/* Testimonials Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
              🧑‍💻 Success Stories
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <p className="text-gray-600 italic mb-4">
                      "AgroWaste Connect helped our business source sustainable materials directly 
                      from farmers. We've reduced our raw material costs by 20% while making our 
                      supply chain more eco-friendly."
                    </p>
                    <div className="mt-auto pt-4 border-t">
                      <p className="font-semibold">Priya Sharma</p>
                      <p className="text-sm text-gray-500">EcoProducts Ltd, Dealer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <p className="text-gray-600 italic mb-4">
                      "I used to burn my coconut husks, creating pollution. Now I sell them 
                      through this platform, earning additional income while helping the environment. 
                      It's a win-win solution!"
                    </p>
                    <div className="mt-auto pt-4 border-t">
                      <p className="font-semibold">Rajesh Kumar</p>
                      <p className="text-sm text-gray-500">Coconut Farm Owner, Kerala</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Join Us Section */}
          <div className="py-10 bg-primary/5 rounded-lg text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              🤝 Join AgroWaste Connect
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Be part of the solution. Join our growing community of farmers and businesses 
              committed to sustainable practices and circular economy.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Button 
                onClick={() => navigate("/login?role=farmer")} 
                className="bg-primary hover:bg-primary-600 text-white px-6 py-2"
              >
                Register as a Farmer <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button 
                onClick={() => navigate("/login?role=dealer")} 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary-100 px-6 py-2"
              >
                Join as a Dealer <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
