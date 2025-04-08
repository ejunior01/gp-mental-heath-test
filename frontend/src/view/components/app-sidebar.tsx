import * as React from "react";

import { FileUp, ListTodo } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/view/components/ui/sidebar";

import { NavMain } from "@/view/components/nav-main";

const data = {
  navMain: [
    {
      title: "Pesquisas",
      url: "/",
      icon: ListTodo,
    },
    {
      title: "Upload de pesquisas",
      url: "/upload-surveys",
      icon: FileUp,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="default" asChild>
              <div className="flex-1 grid text-sm text-left leading-tight">
                <span className="font-semibold truncate">Survey Manager</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
