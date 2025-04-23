
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Lock, Mail, Building2 } from "lucide-react";

interface FormData {
  email: string;
  password: string;
  fullName: string;
  role: "farmer" | "dealer" | "admin";
}

interface EmailFormProps {
  isSignUp: boolean;
  formData: FormData;
  isLoading: boolean;
  onFormDataChange: (data: Partial<FormData>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onToggleSignUp: () => void;
  onForgotPassword: () => void;
}

const EmailForm = ({
  isSignUp,
  formData,
  isLoading,
  onFormDataChange,
  onSubmit,
  onToggleSignUp,
  onForgotPassword,
}: EmailFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {isSignUp && (
        <>
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                className="pl-10 input-ring"
                value={formData.fullName}
                onChange={(e) => onFormDataChange({ fullName: e.target.value })}
                required={isSignUp}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building2 className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="role"
                className="pl-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={formData.role}
                onChange={(e) => onFormDataChange({ role: e.target.value as "farmer" | "dealer" | "admin" })}
                required
              >
                <option value="farmer">Farmer</option>
                <option value="dealer">Dealer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </>
      )}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="pl-10 input-ring"
            value={formData.email}
            onChange={(e) => onFormDataChange({ email: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className="pl-10 input-ring"
            value={formData.password}
            onChange={(e) => onFormDataChange({ password: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
            Remember me
          </label>
        </div>
        {!isSignUp && (
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm font-medium text-primary hover:text-primary-600"
          >
            Forgot password?
          </button>
        )}
      </div>
      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary-600 text-white transition-colors"
        disabled={isLoading}
      >
        {isLoading ? "Please wait..." : isSignUp ? "Sign up" : "Sign in"}
      </Button>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            className="font-medium text-primary hover:text-primary-600"
            onClick={onToggleSignUp}
          >
            {isSignUp ? "Sign in" : "Sign up"}
          </button>
        </p>
      </div>
    </form>
  );
};

export default EmailForm;
