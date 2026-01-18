"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Menu, 
  X, 
  ChevronDown, 
  Zap, 
  Book, 
  Download, 
  Video, 
  Users, 
  Cpu, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Info,
  ArrowRight,
  LayoutDashboard,
  Settings,
  User as UserIcon,
  LogOut,
  Sun,
  Moon,
  Monitor,
  Terminal,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"
import { User } from "@supabase/supabase-js"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useTheme } from "next-themes"

const navLinks = [
  { 
    name: "Product", 
    href: "/products",
    subLinks: [
      { name: "Features", href: "/product#features", icon: Zap, desc: "Real-time voice translation preserving identity" },
      { name: "Documentation", href: "/docs", icon: Book, desc: "API references and integration guides" },
      { name: "Download", href: "/download", icon: Download, desc: "Desktop clients for Windows and macOS" },
    ]
  },
  { 
    name: "Solutions", 
    href: "/solutions",
    subLinks: [
      { name: "Online Meetings", href: "/solutions/online-meetings", icon: Video, desc: "Zoom, Teams, Meet integration" },
      { name: "Physical Meetings", href: "/solutions/physical-meetings", icon: Users, desc: "Boardrooms and conferences" },
      { name: "API Integration", href: "/solutions/api", icon: Cpu, desc: "Build into your applications" },
        { name: "API Playground", href: "/api-playground", icon: Terminal, desc: "Test our voice APIs live" },
    ]
  },
  { 
    name: "Resources", 
    href: "/resources",
    subLinks: [
      { name: "Careers", href: "/careers", icon: Briefcase, desc: "Join our global mission" },
      { name: "Blog", href: "/blog", icon: FileText, desc: "News and AI research" },
      { name: "Community", href: "/community", icon: MessageSquare, desc: "Connect with users" },
      { name: "About", href: "/about", icon: Info, desc: "Our story and mission" },
    ]
  },
  { name: "Pricing", href: "/pricing" },
  { name: "Customers", href: "/customers" },
  { name: "Dashboard", href: "/dashboard" },
]

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full hover:bg-black/5 dark:hover:bg-white/5">
        <Sun className="w-4 h-4" />
      </Button>
    )
  }

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark")
    else if (theme === "dark") setTheme("system")
    else setTheme("light")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="w-9 h-9 rounded-full hover:bg-black/5 dark:hover:bg-white/5 border border-black/10 dark:border-white/10"
        >
          {resolvedTheme === "dark" ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36 bg-white dark:bg-black border-black/10 dark:border-white/10">
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className={cn("flex items-center gap-2 cursor-pointer", theme === "light" && "bg-black/5 dark:bg-white/5")}
        >
          <Sun className="w-4 h-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className={cn("flex items-center gap-2 cursor-pointer", theme === "dark" && "bg-black/5 dark:bg-white/5")}
        >
          <Moon className="w-4 h-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className={cn("flex items-center gap-2 cursor-pointer", theme === "system" && "bg-black/5 dark:bg-white/5")}
        >
          <Monitor className="w-4 h-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveMenu(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const isDashboard = pathname.startsWith("/dashboard")
  if (isDashboard) return null

  const toggleMenu = (name: string) => {
    setActiveMenu(activeMenu === name ? null : name)
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-black/5 dark:border-white/5"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="text-xl font-serif tracking-tight">
              Verto<span className="italic">X</span>
            </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10" ref={dropdownRef}>
            {navLinks.map((link) => (
              <div key={link.name} className="relative">
                {link.subLinks ? (
                  <button
                    onClick={() => toggleMenu(link.name)}
                    className={cn(
                      "flex items-center gap-1 text-sm font-light tracking-wide transition-all duration-300 hover:text-black dark:hover:text-white",
                      activeMenu === link.name ? "text-black dark:text-white" : "text-black/60 dark:text-white/60"
                    )}
                  >
                    {link.name}
                    <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", activeMenu === link.name ? "rotate-180" : "")} />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="text-sm font-light tracking-wide text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                )}

                <AnimatePresence>
                  {link.subLinks && activeMenu === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[320px] bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/50 border border-black/5 dark:border-white/10 overflow-hidden z-50"
                      >
                        <div className="p-2">
                          {link.subLinks.map((sub, idx) => (
                            <motion.div
                              key={sub.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                            >
                              <Link
                                href={sub.href}
                                className="group flex items-start gap-4 px-4 py-3.5 rounded-xl hover:bg-black/[0.03] dark:hover:bg-white/[0.06] transition-all duration-300"
                                onClick={() => setActiveMenu(null)}
                              >
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-black/5 to-black/10 dark:from-white/10 dark:to-white/5 flex items-center justify-center group-hover:from-black group-hover:to-black/80 dark:group-hover:from-white dark:group-hover:to-white/80 transition-all duration-300">
                                  <sub.icon className="w-4 h-4 text-black/50 dark:text-white/50 group-hover:text-white dark:group-hover:text-black transition-colors duration-300" />
                                </div>
                                <div className="flex-1 pt-0.5">
                                  <div className="text-sm font-semibold text-black dark:text-white group-hover:translate-x-0.5 transition-transform duration-300">
                                    {sub.name}
                                  </div>
                                  <p className="text-xs text-black/50 dark:text-white/50 mt-0.5 leading-relaxed">
                                    {sub.desc}
                                  </p>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full border border-black/10 dark:border-white/10 p-0 overflow-hidden hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300">
                    <Avatar className="h-full w-full">
                      <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || ""} />
                      <AvatarFallback className="bg-black/5 dark:bg-white/5 text-xs font-medium">
                        {user.email?.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mt-2 bg-white dark:bg-black border-black/10 dark:border-white/10" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal p-3">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.user_metadata?.full_name || "User"}</p>
                      <p className="text-xs text-black/40 dark:text-white/40 truncate">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-black/5 dark:bg-white/5" />
                  <div className="p-1">
                    <Link href="/dashboard">
                      <DropdownMenuItem className="flex items-center gap-2 p-2 cursor-pointer">
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Dashboard</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/dashboard/account">
                      <DropdownMenuItem className="flex items-center gap-2 p-2 cursor-pointer">
                        <UserIcon className="w-4 h-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/dashboard/settings">
                      <DropdownMenuItem className="flex items-center gap-2 p-2 cursor-pointer">
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                    </Link>
                  </div>
                  <DropdownMenuSeparator className="bg-black/5 dark:bg-white/5" />
                  <div className="p-1">
                    <DropdownMenuItem 
                      className="flex items-center gap-2 p-2 cursor-pointer text-black/60 dark:text-white/60 hover:text-red-500 transition-colors"
                      onClick={handleSignOut}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/signin">
                  <Button variant="ghost" className="text-sm font-light tracking-wide hover:bg-black/5 dark:hover:bg-white/5">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="rounded-full px-6 text-sm font-light tracking-wide bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80 transition-all duration-300">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="hover:bg-black/5 dark:hover:bg-white/5"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-black border-t border-black/5 dark:border-white/5 absolute top-full left-0 right-0 overflow-hidden"
          >
            <div className="py-6 px-6 space-y-4">
              {navLinks.map((link) => (
                <div key={link.name} className="space-y-2">
                  {link.subLinks ? (
                    <>
                      <button
                        onClick={() => toggleMenu(link.name)}
                        className="flex items-center justify-between w-full text-lg font-light"
                      >
                        {link.name}
                        <ChevronDown className={cn("w-4 h-4 transition-transform", activeMenu === link.name ? "rotate-180" : "")} />
                      </button>
                      <AnimatePresence>
                        {activeMenu === link.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 space-y-3 border-l border-black/10 dark:border-white/10 mt-3"
                          >
                            {link.subLinks.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                className="flex items-center gap-3 py-1 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
                                onClick={() => setIsOpen(false)}
                              >
                                <sub.icon className="w-4 h-4" />
                                <span>{sub.name}</span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className="block text-lg font-light"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 flex flex-col gap-3 border-t border-black/5 dark:border-white/5 mt-4">
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-black/10 dark:border-white/10">
                        <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || ""} />
                        <AvatarFallback className="bg-black/5 dark:bg-white/5 font-medium">
                          {user.email?.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="text-sm font-medium">{user.user_metadata?.full_name || "User"}</span>
                        <span className="text-xs text-black/40 dark:text-white/40 block truncate max-w-[180px]">{user.email}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full justify-start gap-2 border-black/10 dark:border-white/10">
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start gap-2 border-black/10 dark:border-white/10 text-red-500"
                        onClick={() => { handleSignOut(); setIsOpen(false); }}
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link href="/signin" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full border-black/10 dark:border-white/10">Sign In</Button>
                    </Link>
                    <Link href="/signup" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-black text-white dark:bg-white dark:text-black">Register</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
