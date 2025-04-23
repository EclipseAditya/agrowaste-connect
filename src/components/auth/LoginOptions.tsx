
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, Building2 } from "lucide-react";

interface LoginOptionsProps {
  onRoleSelect: (role: "farmer" | "dealer") => void;
}

const LoginOptions = ({ onRoleSelect }: LoginOptionsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-4 w-full">
        <Button
          type="button"
          className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700"
          onClick={() => onRoleSelect("farmer")}
        >
          <User className="h-5 w-5" />
          <span>Sign in as Farmer</span>
        </Button>
        <Button
          type="button"
          className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700"
          onClick={() => onRoleSelect("dealer")}
        >
          <Building2 className="h-5 w-5" />
          <span>Sign in as Dealer</span>
        </Button>
      </div>
      
      <div className="flex items-center">
        <Separator className="flex-1" />
        <span className="px-3 text-xs text-gray-500 uppercase">Or continue with email</span>
        <Separator className="flex-1" />
      </div>
    </div>
  );
};

export default LoginOptions;
