import {
    BookOpen,
    GraduationCap,
    BarChart3,
    Settings,
    MessageSquare,
    CalendarDays,
    LogOut,
    Share2,
  } from "lucide-react";
  import {useRouter} from "next/navigation";
  import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarSeparator,
  } from "@/components/ui/sidebar";
  import { Button } from "@/components/ui/button";
  
  const contentItems = [
    { title: "Blog Posts", icon: BookOpen, key: "blog" },
    { title: "Courses", icon: GraduationCap, key: "courses" },
    // { title: "Events", icon: CalendarDays, key: "events" },
  ];
  
  const managementItems = [
    // { title: "Messages", icon: MessageSquare, key: "messages" },
    { title: "Affiliates", icon: Share2, key: "affiliates" },
    // { title: "Analytics", icon: BarChart3, key: "analytics" },
  ];
  
//   const systemItems = [
     // { title: "Settings", icon: Settings, key: "settings" },
//   ];
  
  interface AdminSidebarProps {
    activeSection: string;
    onSectionChange: (section: string) => void;
  }
  
  export function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {  
    const router = useRouter();
    const renderItems = (items: typeof contentItems) =>
      items.map((item) => (
        <SidebarMenuItem key={item.key}>
          <SidebarMenuButton
            isActive={activeSection === item.key}
            onClick={() => onSectionChange(item.key)}
            tooltip={item.title}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.title}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ));
    
      const handleLogout = async () => {
        await fetch("/admin/logout/api", {
          method: "POST",
        });
      
        router.push("/admin");
      };
  
    return (
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">N</span>
            </div>
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
              <span className="font-heading font-bold text-sm text-foreground">Navrademy</span>
              <span className="text-xs text-muted-foreground">Admin Panel</span>
            </div>
          </div>
        </SidebarHeader>
  
        <SidebarSeparator />
  
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Content</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>{renderItems(contentItems)}</SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
  
          <SidebarGroup>
            <SidebarGroupLabel>Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>{renderItems(managementItems)}</SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
  
          {/* <SidebarGroup>
            <SidebarGroupLabel>System</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>{renderItems(systemItems)}</SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup> */}
        </SidebarContent>
  
        <SidebarFooter className="p-2">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            <span className="group-data-[collapsible=icon]:hidden">Logout</span>
          </Button>
        </SidebarFooter>
      </Sidebar>
    );
} 