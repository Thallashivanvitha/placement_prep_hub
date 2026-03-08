import { useAuth } from "@/hooks/use-auth";
import { FullPageSpinner } from "@/components/ui/spinner";
import { AppSidebar } from "./app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useLocation } from "wouter";
import { useEffect } from "react";

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation("/login");
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) return <FullPageSpinner />;
  if (!user) return null;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background print:bg-white print:min-h-0">
        <div className="print:hidden">
          <AppSidebar />
        </div>
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden print:overflow-visible">
          <header className="h-16 flex items-center px-6 border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10 print:hidden">
            <SidebarTrigger className="-ml-2 hover:bg-secondary rounded-lg p-2 transition-colors" />
          </header>
          <main className="flex-1 overflow-y-auto p-4 md:p-8 print:p-0 print:overflow-visible">
            <div className="max-w-7xl mx-auto h-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
