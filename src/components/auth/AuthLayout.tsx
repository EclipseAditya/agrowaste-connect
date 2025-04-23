
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-100 to-secondary-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl animate-fadeIn">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary">AgriCraft</h2>
          <p className="mt-2 text-gray-600">Transform waste into worth</p>
        </div>
        {children}
      </div>
    </div>
  );
};
// This exports the authentication layout for the website.
export default AuthLayout;
