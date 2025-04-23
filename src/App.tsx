import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/providers/AuthProvider";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/dashboard/Index";
import WasteDashboard from "./pages/dashboard/waste/Index";
import NewWasteListing from "./pages/dashboard/waste/NewWasteListing";
import Orders from "./pages/dashboard/orders/Index";
import Learning from "./pages/dashboard/learning/Index";
import Messages from "./pages/dashboard/messages/Index";
import Settings from "./pages/dashboard/settings/Index";
import ResetPassword from "./pages/ResetPassword";
import SurakshitBharatPage from "./pages/dashboard/surakshit/Index";
import DealerDashboard from "./pages/dealer/Index";
import BrowseListings from "./pages/dealer/listings/Index";
import DealerCart from "./pages/dealer/cart/Index";
import DealerOrders from "./pages/dealer/orders/Index";
import DealerMessages from "./pages/dealer/messages/Index";
import Logistics from "./pages/dealer/logistics/Index";
import Reviews from "./pages/dealer/reviews/Index";
import DealerLearning from "./pages/dealer/learning/Index";
import DealerSettings from "./pages/dealer/settings/Index";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              
              {/* Farmer Dashboard Routes - Protected for farmers */}
              <Route path="/dashboard" element={<ProtectedRoute requiredRole="farmer"><Dashboard /></ProtectedRoute>} />
              <Route path="/dashboard/waste" element={<ProtectedRoute requiredRole="farmer"><WasteDashboard /></ProtectedRoute>} />
              <Route path="/dashboard/waste/new" element={<ProtectedRoute requiredRole="farmer"><NewWasteListing /></ProtectedRoute>} />
              <Route path="/dashboard/orders" element={<ProtectedRoute requiredRole="farmer"><Orders /></ProtectedRoute>} />
              <Route path="/dashboard/learning" element={<ProtectedRoute requiredRole="farmer"><Learning /></ProtectedRoute>} />
              <Route path="/dashboard/messages" element={<ProtectedRoute requiredRole="farmer"><Messages /></ProtectedRoute>} />
              <Route path="/dashboard/settings" element={<ProtectedRoute requiredRole="farmer"><Settings /></ProtectedRoute>} />
              <Route path="/dashboard/surakshit" element={<ProtectedRoute requiredRole="farmer"><SurakshitBharatPage /></ProtectedRoute>} />
              
              {/* Dealer Dashboard Routes - Protected for dealers */}
              <Route path="/dealer" element={<ProtectedRoute requiredRole="dealer"><DealerDashboard /></ProtectedRoute>} />
              <Route path="/dealer/listings" element={<ProtectedRoute requiredRole="dealer"><BrowseListings /></ProtectedRoute>} />
              <Route path="/dealer/cart" element={<ProtectedRoute requiredRole="dealer"><DealerCart /></ProtectedRoute>} />
              <Route path="/dealer/orders" element={<ProtectedRoute requiredRole="dealer"><DealerOrders /></ProtectedRoute>} />
              <Route path="/dealer/messages" element={<ProtectedRoute requiredRole="dealer"><DealerMessages /></ProtectedRoute>} />
              <Route path="/dealer/logistics" element={<ProtectedRoute requiredRole="dealer"><Logistics /></ProtectedRoute>} />
              <Route path="/dealer/reviews" element={<ProtectedRoute requiredRole="dealer"><Reviews /></ProtectedRoute>} />
              <Route path="/dealer/learning" element={<ProtectedRoute requiredRole="dealer"><DealerLearning /></ProtectedRoute>} />
              <Route path="/dealer/settings" element={<ProtectedRoute requiredRole="dealer"><DealerSettings /></ProtectedRoute>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
