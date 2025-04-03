import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/view/components/ui/sidebar";

import { AppSidebar } from "@/view/components/app-sidebar";
import { Outlet } from "react-router-dom";

export function DefaultLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex items-center gap-2 h-16 shrink-0">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
        <main className="flex flex-col flex-1 gap-4 p-4 pt-0">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
