"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  MessageSquare,
  Video,
  Mic2,
  Settings,
  User,
  LogOut,
  Globe,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { supabase } from "@/lib/supabase"

const mainNav = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "LLM Chat", href: "/dashboard/llm", icon: MessageSquare },
  { name: "VertoX Meet", href: "/dashboard/meet", icon: Video },
  { name: "Voice Translation", href: "/dashboard/voice", icon: Mic2 },
]

const accountNav = [
  { name: "Account", href: "/dashboard/account", icon: User },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-heading font-bold tracking-tighter">
            Verto<span className="text-primary">X</span>
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.name}
                  >
                    <Link href={item.href}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Preferences</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountNav.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.name}
                  >
                    <Link href={item.href}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive"
          onClick={handleSignOut}
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
