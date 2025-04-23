
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/providers/AuthProvider";

// Define a type for the allowed roles
type UserRole = "farmer" | "dealer" | "admin";

const Verify = () => {
  const [searchParams] = useSearchParams();
  // Cast the role value to the UserRole type after validation
  const roleParam = searchParams.get("role") || localStorage.getItem("intended_role") || "farmer";
  // Validate that the role is one of the allowed values
  const role: UserRole = (["farmer", "dealer", "admin"].includes(roleParam) 
    ? roleParam 
    : "farmer") as UserRole;
  
  const navigate = useNavigate();
  const { session } = useAuth();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const processAuth = async () => {
      // If we have a session, update the user's role in the profiles table
      if (session?.user) {
        try {
          console.log("Processing authentication with role:", role);
          
          // Check if user already has a profile
          const { data: existingProfile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
            
          if (!existingProfile) {
            // Create a profile with the selected role
            const { error: insertError } = await supabase
              .from('profiles')
              .insert({
                id: session.user.id,
                full_name: session.user.user_metadata.full_name || session.user.email,
                role: role
              });
              
            if (insertError) {
              console.error("Error creating profile:", insertError);
              toast({
                title: "Error setting up your account",
                description: "We couldn't complete your registration. Please try again.",
                variant: "destructive",
              });
              navigate("/login");
              return;
            }
          } else if (existingProfile.role !== role) {
            // Update role if it's different from the intended role
            const { error: updateError } = await supabase
              .from('profiles')
              .update({ role: role })
              .eq('id', session.user.id);
              
            if (updateError) {
              console.error("Error updating role:", updateError);
            }
          }
          
          // Clear the stored role
          localStorage.removeItem("intended_role");
          
          // Redirect based on the role
          if (role === "dealer") {
            navigate("/dealer", { replace: true });
          } else {
            navigate("/dashboard", { replace: true });
          }
        } catch (error) {
          console.error("Error in verification process:", error);
          toast({
            title: "Verification error",
            description: "An error occurred during account setup. Please try again.",
            variant: "destructive",
          });
          navigate("/login");
        } finally {
          setIsProcessing(false);
        }
      } else {
        // If no session, wait a bit and check again (might be processing auth)
        const checkAuthTimeout = setTimeout(() => {
          if (!session) {
            console.log("No session detected after timeout");
            setIsProcessing(false);
            navigate("/login");
          }
        }, 5000); // 5 second timeout
        
        return () => clearTimeout(checkAuthTimeout);
      }
    };
    
    processAuth();
  }, [session, navigate, role]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isProcessing ? "Setting up your account..." : "Verification Complete"}
        </h1>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
        <p className="text-center mt-4 text-gray-600">
          {isProcessing 
            ? "Please wait while we complete your account setup." 
            : "Redirecting you to your dashboard..."}
        </p>
      </div>
    </div>
  );
};

export default Verify;
