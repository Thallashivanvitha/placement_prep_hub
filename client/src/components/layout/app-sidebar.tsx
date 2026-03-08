import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { 
  Building2, 
  Users, 
  MessageSquare, 
  BookOpen, 
  LayoutDashboard, 
  FileText,
  LogOut,
  GraduationCap
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  const [location] = useLocation();
  const { user, logout } = useAuth();

  const isAdmin = user?.role === "admin";

  const navigation = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Companies", url: "/companies", icon: Building2 },
    { title: "Placed Students", url: "/placed-students", icon: Users },
    { title: "Interview Experiences", url: "/interview-experiences", icon: MessageSquare },
    { title: "Resources", url: "/resources", icon: BookOpen },
    ...(!isAdmin ? [{ title: "Resume Builder", url: "/resume-builder", icon: FileText }] : []),
  ];

  return (
    <Sidebar className="border-r border-border/50 bg-card">
      <SidebarContent>
        <div className="p-6">
          <div className="flex items-center gap-3 text-primary">
            <div className="bg-primary/10 p-2 rounded-xl">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-foreground">PrepPortal</span>
          </div>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {navigation.map((item) => {
                const isActive = location === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                      <Link 
                        href={item.url} 
                        className={`
                          flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                          ${isActive 
                            ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 font-medium" 
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          }
                        `}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-border/50">
        <div className="flex items-center justify-between px-2 py-2">
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{user?.name}</span>
            <span className="text-xs text-muted-foreground capitalize">{user?.role}</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => logout.mutate()}
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
