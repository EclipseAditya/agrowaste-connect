
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Book, Award, Lightbulb } from "lucide-react";

const Learning = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Learning & Resources</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center space-x-2 text-primary">
              <Book className="h-5 w-5" />
              <h3 className="font-medium">Best Practices</h3>
            </div>
            <p className="text-gray-600">Learn how to maximize your waste profitability.</p>
          </Card>
          
          <Card className="p-6 space-y-4">
            <div className="flex items-center space-x-2 text-primary">
              <Lightbulb className="h-5 w-5" />
              <h3 className="font-medium">Product Use Cases</h3>
            </div>
            <p className="text-gray-600">Discover what businesses create from agricultural waste.</p>
          </Card>
          
          <Card className="p-6 space-y-4">
            <div className="flex items-center space-x-2 text-primary">
              <Award className="h-5 w-5" />
              <h3 className="font-medium">Success Stories</h3>
            </div>
            <p className="text-gray-600">Read about farmers who succeeded on our platform.</p>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Learning;
