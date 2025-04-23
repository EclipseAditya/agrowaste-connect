
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Package,
  Truck,
  MessageSquare,
  Star,
  BookOpen,
  Settings,
  LogOut,
  ShoppingCart,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarTrigger,
  SidebarFooter 
} from "@/components/ui/sidebar";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active: boolean;
  badge?: number;
}

const NavItem = ({ icon, label, href, active, badge }: NavItemProps) => (
  <Link to={href}>
    <Button
      variant={active ? "default" : "ghost"}
      className="w-full justify-start mb-1"
    >
      {icon}
      <span className="ml-2">{label}</span>
      {badge !== undefined && badge > 0 && (
        <Badge className="ml-auto">{badge}</Badge>
      )}
    </Button>
  </Link>
);

const DealerSidebar = () => {
  const location = useLocation();
  const { getTotalItems } = useCart();
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const navItems = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
      href: "/dealer",
    },
    {
      icon: <Package className="h-5 w-5" />,
      label: "Browse Listings",
      href: "/dealer/listings",
    },
    {
      icon: <ShoppingCart className="h-5 w-5" />,
      label: "Cart",
      href: "/dealer/cart",
      badge: getTotalItems(),
    },
    {
      icon: <Truck className="h-5 w-5" />,
      label: "Orders & Offers",
      href: "/dealer/orders",
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: "Messages",
      href: "/dealer/messages",
    },
    {
      icon: <Truck className="h-5 w-5" />,
      label: "Logistics",
      href: "/dealer/logistics",
    },
    {
      icon: <Star className="h-5 w-5" />,
      label: "Reviews",
      href: "/dealer/reviews",
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      label: "Learning",
      href: "/dealer/learning",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      href: "/dealer/settings",
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">WasteTrade</h2>
          <SidebarTrigger />
        </div>
        <p className="text-sm text-gray-500">Dealer Portal</p>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="flex-1 px-2">
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                active={location.pathname === item.href}
                badge={item.badge}
              />
            ))}
          </div>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="mt-auto pt-4 px-2 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50 mb-1"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span className="ml-2">Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DealerSidebar;
