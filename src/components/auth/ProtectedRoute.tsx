
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "farmer" | "dealer" | "admin";
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { session, isLoading } = useAuth();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [checkingRole, setCheckingRole] = useState(true);

  useEffect(() => {
    const checkAuthAndRole = async () => {
      if (!isLoading) {
        if (!session) {
          navigate("/login");
          return;
        }

        if (requiredRole) {
          try {
            // Get the user role from the profiles table
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', session.user.id)
              .single();

            if (error) {
              console.error("Error fetching role:", error);
              navigate("/login");
              return;
            }

            setUserRole(profile?.role || null);
            console.log("Checking role access:", { required: requiredRole, user: profile?.role });

            if (profile?.role !== requiredRole) {
              console.log("Invalid role access, redirecting to appropriate dashboard");
              // Redirect to appropriate dashboard based on actual role
              if (profile?.role === "dealer") {
                navigate("/dealer");
              } else {
                navigate("/dashboard");
              }
            }
          } catch (error) {
            console.error("Error checking role:", error);
            navigate("/login");
          } finally {
            setCheckingRole(false);
          }
        } else {
          setCheckingRole(false);
        }
      }
    };

    checkAuthAndRole();
  }, [session, isLoading, navigate, requiredRole]);

  if (isLoading || (requiredRole && checkingRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return session ? <>{children}</> : null;
};

export default ProtectedRoute;
