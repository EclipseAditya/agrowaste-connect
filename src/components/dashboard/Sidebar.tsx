import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Recycle, 
  ShoppingCart, 
  Book, 
  MessageSquare, 
  Settings,
  ShieldCheck
} from "lucide-react";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  SidebarFooter
} from "@/components/ui/sidebar";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Waste Management",
    href: "/dashboard/waste",
    icon: Recycle,
  },
  {
    title: "Orders",
    href: "/dashboard/orders",
    icon: ShoppingCart,
  },
  {
    title: "Learning",
    href: "/dashboard/learning",
    icon: Book,
  },
  {
    title: "Surakshit Bharat",
    href: "/dashboard/surakshit",
    icon: ShieldCheck,
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <ShadcnSidebar>
      <SidebarHeader className="p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-primary">AgriCycle</h2>
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors",
                      isActive
                        ? "bg-primary text-white"
                        : "text-gray-600 hover:bg-primary-100"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </SidebarContent>
    </ShadcnSidebar>
  );
};

export default Sidebar;
