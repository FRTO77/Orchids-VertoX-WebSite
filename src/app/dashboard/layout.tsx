"use client"

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { User, Bell, Search, Settings, CreditCard, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState("")

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const query = searchValue.toLowerCase().trim()
      const routes: Record<string, string> = {
        "pricing": "/pricing",
        "blog": "/blog",
        "account": "/dashboard/account",
        "profile": "/dashboard/account",
        "settings": "/dashboard/settings",
        "dashboard": "/dashboard",
        "meet": "/dashboard/meet",
        "meeting": "/dashboard/meet",
        "voice": "/dashboard/voice",
        "llm": "/dashboard/llm",
        "home": "/",
        "contact": "/contact",
        "about": "/about",
      }

      if (routes[query]) {
        router.push(routes[query])
        setSearchValue("")
      }
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        <SidebarInset className="flex flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-md px-6">
            <SidebarTrigger />
            <div className="flex-1 flex items-center gap-4">
              <div className="relative w-full max-w-md hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search translations, meetings..." 
                  className="pl-10 h-10 rounded-full bg-muted/50 border-transparent focus:bg-background focus:border-primary/20 transition-all" 
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={handleSearch}
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="p-4 border-b">
                    <h4 className="font-bold">Notifications</h4>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    <div className="p-4 border-b hover:bg-muted/50 transition-colors cursor-pointer">
                      <p className="text-sm font-medium">New Translation Ready</p>
                      <p className="text-xs text-muted-foreground mt-1">Your meeting with Client X has been translated.</p>
                      <p className="text-[10px] text-muted-foreground mt-2 uppercase font-bold tracking-wider">2 mins ago</p>
                    </div>
                    <div className="p-4 border-b hover:bg-muted/50 transition-colors cursor-pointer">
                      <p className="text-sm font-medium">System Update</p>
                      <p className="text-xs text-muted-foreground mt-1">VertoX v2.4 is now live with improved accuracy.</p>
                      <p className="text-[10px] text-muted-foreground mt-2 uppercase font-bold tracking-wider">1 hour ago</p>
                    </div>
                  </div>
                  <div className="p-2 text-center">
                    <Button variant="ghost" size="sm" className="text-xs font-bold text-primary w-full">View all notifications</Button>
                  </div>
                </PopoverContent>
              </Popover>
              <ModeToggle />
              <div className="h-8 w-[1px] bg-border mx-2" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 px-2 rounded-full">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                      JD
                    </div>
                    <span className="text-sm font-medium hidden sm:inline-block">John Doe</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/account" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/pricing" className="cursor-pointer">
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Subscription</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 p-6 md:p-8 overflow-y-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
