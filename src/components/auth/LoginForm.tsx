
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/providers/AuthProvider";
import LoginOptions from "./LoginOptions";
import EmailForm from "./EmailForm";
import ResetPasswordDialog from "./ResetPasswordDialog";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    role: "farmer" as "farmer" | "dealer" | "admin",
  });

  const { signInWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = async (role: "farmer" | "dealer") => {
    try {
      await signInWithGoogle(role);
      // The redirect will be handled by the OAuth flow
    } catch (error: any) {
      console.error("Google sign in error:", error);
      toast({
        title: "Authentication error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
              role: formData.role,
            },
          },
        });

        if (signUpError) throw signUpError;

        toast({
          title: "Account created successfully",
          description: "Please check your email to verify your account.",
        });
      } else {
        console.log("Attempting to sign in...");
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (signInError) {
          console.error("Sign in error:", signInError);
          throw signInError;
        }

        console.log("Sign in successful, user data:", data);
        
        // Get user role from metadata
        const userRole = data.user?.user_metadata?.role;
        console.log("User role:", userRole);

        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });

        // Redirect based on user role
        setTimeout(() => {
          console.log("Navigating to dashboard based on role...");
          if (userRole === 'dealer') {
            navigate("/dealer", { replace: true });
          } else {
            navigate("/dashboard", { replace: true });
          }
        }, 100);
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      toast({
        title: "Authentication error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resetPassword(resetEmail);
      setIsResetDialogOpen(false);
    } catch (error) {
      // Errors are already handled in the resetPassword function
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <LoginOptions onRoleSelect={handleRoleSelect} />
      
      <EmailForm
        isSignUp={isSignUp}
        formData={formData}
        isLoading={isLoading}
        onFormDataChange={(data) => setFormData((prev) => ({ ...prev, ...data }))}
        onSubmit={handleSubmit}
        onToggleSignUp={() => setIsSignUp(!isSignUp)}
        onForgotPassword={() => setIsResetDialogOpen(true)}
      />

      <ResetPasswordDialog
        isOpen={isResetDialogOpen}
        onOpenChange={setIsResetDialogOpen}
        resetEmail={resetEmail}
        onResetEmailChange={setResetEmail}
        onSubmit={handlePasswordReset}
      />
    </div>
  );
};

export default LoginForm;
