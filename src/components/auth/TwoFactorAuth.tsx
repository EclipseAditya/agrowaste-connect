
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Smartphone, Key } from "lucide-react";

const TwoFactorAuth = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 6) {
      toast({
        title: "Verification successful",
        description: "Welcome to AgriCraft!",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Invalid code",
        description: "Please enter a valid 6-digit code.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-center space-x-4">
        <Smartphone className="w-6 h-6 text-primary" />
        <Key className="w-6 h-6 text-secondary" />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">
            Enter verification code
          </label>
          <Input
            id="code"
            type="text"
            placeholder="000000"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            className="block w-full input-ring"
            maxLength={6}
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary-600 text-white transition-colors"
          disabled={code.length !== 6}
        >
          Verify
        </Button>
      </form>
      <p className="text-sm text-center text-gray-600">
        Didn't receive a code?{" "}
        <button className="text-primary hover:text-primary-600 font-medium">
          Resend
        </button>
      </p>
    </div>
  );
};
// This helps in creating the two factor authentication for the website.
export default TwoFactorAuth;
