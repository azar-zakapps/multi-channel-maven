
import { Calendar, LayoutDashboard, Megaphone, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/",
  },
  {
    title: "Campaigns",
    icon: Megaphone,
    url: "/campaigns",
  },
  {
    title: "Calendar",
    icon: Calendar,
    url: "/calendar",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/settings",
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-6">
          <h1 className="text-xl font-semibold text-primary">Campaign Hub</h1>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
