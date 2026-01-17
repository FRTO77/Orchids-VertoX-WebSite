"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Globe, 
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
  Palette,
  Sparkles,
  Search,
  CloudDownload
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

const navLinks = [
    { 
      name: "Product", 
      href: "/products",
      subLinks: [
        { 
          name: "Features", 
          href: "/product#features", 
          icon: Zap, 
          desc: "Real-time voice translation that preserves the speaker’s voice, tone and emotion across meetings and events.",
          visual: (
            <svg viewBox="0 0 100 100" className="absolute right-0 bottom-0 w-32 h-32 opacity-10 pointer-events-none group-hover:opacity-30 transition-all duration-700 group-hover:scale-110 group-hover:rotate-12">
              <defs>
                <linearGradient id="grad-zap" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="40" fill="none" stroke="url(#grad-zap)" strokeWidth="0.5" strokeDasharray="4 4" />
              <path d="M50 20 L50 80 M20 50 L80 50" stroke="currentColor" strokeWidth="0.2" />
              <path d="M30 30 L70 70 M70 30 L30 70" stroke="currentColor" strokeWidth="0.2" />
              <motion.path 
                d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" 
                fill="none" 
                stroke="var(--primary)" 
                strokeWidth="0.5"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          )
        },
        { 
          name: "Documentation", 
          href: "/docs", 
          icon: Book, 
          desc: "Comprehensive API references and SDKs for building real-time voice translation into your own applications.",
          visual: (
            <svg viewBox="0 0 100 100" className="absolute right-0 bottom-0 w-32 h-32 opacity-10 pointer-events-none group-hover:opacity-30 transition-all duration-700 group-hover:scale-110 group-hover:-rotate-12">
              <rect x="20" y="20" width="60" height="60" rx="4" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <line x1="30" y1="40" x2="70" y2="40" stroke="currentColor" strokeWidth="0.5" />
              <line x1="30" y1="50" x2="70" y2="50" stroke="currentColor" strokeWidth="0.5" />
              <line x1="30" y1="60" x2="50" y2="60" stroke="currentColor" strokeWidth="0.5" />
              <path d="M70 70 L85 85 M75 80 L80 75" stroke="var(--primary)" strokeWidth="1" />
              <circle cx="20" cy="20" r="15" fill="var(--primary)" fillOpacity="0.1" />
            </svg>
          )
        },
        { 
          name: "Download", 
          href: "/download", 
          icon: Download, 
            desc: "Native low-latency desktop clients for Windows and macOS with advanced audio routing and hardware integration.",
          visual: (
            <svg viewBox="0 0 100 100" className="absolute right-0 bottom-0 w-32 h-32 opacity-10 pointer-events-none group-hover:opacity-30 transition-all duration-700 group-hover:scale-125">
              <path d="M50 10 V70 M30 50 L50 70 L70 50" fill="none" stroke="var(--primary)" strokeWidth="1" />
              <path d="M20 85 H80" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="2 2" />
            </svg>
          )
        },
      ]
    },
  { 
    name: "Solutions", 
    href: "/solutions",
    subLinks: [
      { 
        name: "Online Meetings", 
        href: "/solutions/online-meetings", 
        icon: Video, 
        desc: "Translate Zoom, Teams, and Meet seamlessly while maintaining your voice identity." 
      },
      { 
        name: "Physical Meetings", 
        href: "/solutions/physical-meetings", 
        icon: Users, 
        desc: "Voice-preserving translation for boardrooms, events and conferences." 
      },
      { 
        name: "API Integration", 
        href: "/solutions/api", 
        icon: Cpu, 
        desc: "Build translation directly into your applications with our SDK." 
      },
    ]
  },
  { 
    name: "Resources", 
    href: "/resources",
    subLinks: [
      { 
        name: "Careers", 
        href: "/careers", 
        icon: Briefcase, 
        desc: "Join our global mission to break language barriers." 
      },
      { 
        name: "Blogs", 
        href: "/blog", 
        icon: FileText, 
        desc: "Latest news and AI research in voice preservation." 
      },
      { 
        name: "Community", 
        href: "/community", 
        icon: MessageSquare, 
        desc: "Connect with thousands of global VertoX users." 
      },
      { 
        name: "About Us", 
        href: "/about", 
        icon: Info, 
        desc: "VertoX is built to preserve human identity in translation." 
      },
    ]
  },
  { name: "Pricing", href: "/pricing" },
  { name: "Customers", href: "/customers" },
  { name: "Dashboard", href: "/dashboard" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b dark",
        scrolled
          ? "bg-black border-white/10 py-2"
          : "bg-black/80 backdrop-blur-md border-white/5 py-4",
        "text-white"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-heading font-bold tracking-tighter">
                Verto<span className="text-primary">X</span>
              </span>
            </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8" ref={dropdownRef}>
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.subLinks ? (
                  <button
                    onClick={() => toggleMenu(link.name)}
                    className={cn(
                      "flex items-center gap-1 text-sm font-medium transition-all hover:text-primary relative py-2",
                      activeMenu === link.name ? "text-primary" : ""
                    )}
                  >
                    {link.name}
                    <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", activeMenu === link.name ? "rotate-180" : "")} />
                    {activeMenu === link.name && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-[22px] left-0 right-0 h-0.5 bg-primary"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="text-sm font-medium hover:text-primary transition-colors py-2"
                  >
                    {link.name}
                  </Link>
                )}

                <AnimatePresence>
                  {link.subLinks && activeMenu === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[350px] bg-black/95 backdrop-blur-xl border border-white/10 rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 p-3"
                    >
                      <div className="grid gap-1">
                        {link.subLinks.map((sub, idx) => (
                            <motion.div
                              key={sub.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="relative"
                            >
                              <Link
                                href={sub.href}
                                className="group flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-all relative overflow-hidden"
                                onClick={() => setActiveMenu(null)}
                              >
                                {"visual" in sub && (sub as any).visual}
                                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform relative z-10">
                                  <sub.icon className="w-5 h-5 text-primary" />
                                </div>
                                <div className="space-y-1 relative z-10">
                                  <div className="text-sm font-bold flex items-center gap-1 group-hover:text-primary transition-colors">
                                    {sub.name}
                                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                  </div>
                                  <p className="text-[11px] leading-relaxed text-muted-foreground group-hover:text-white/70 transition-colors">
                                    {sub.desc}
                                  </p>
                                </div>
                              </Link>
                            </motion.div>
                        ))}
                      </div>
                      
                      <div className="mt-3 p-3 bg-primary/5 rounded-xl border border-primary/10 group/viewall">
                        <Link 
                          href={link.href} 
                          className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-primary hover:text-white transition-all"
                          onClick={() => setActiveMenu(null)}
                        >
                          <span className="flex items-center gap-2">
                            <Palette className="w-4 h-4" />
                            View Full Ecosystem
                          </span>
                          <ArrowRight className="w-4 h-4 group-hover/viewall:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-white/10 hover:bg-white/5 transition-all p-0 overflow-hidden">
                    <Avatar className="h-full w-full">
                      <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || ""} />
                      <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
                        {user.email?.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mt-2 bg-black/95 backdrop-blur-xl border-white/10 rounded-2xl p-2 shadow-2xl" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal p-2">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-bold leading-none text-white">
                        {user.user_metadata?.full_name || "User"}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <div className="p-1">
                    <Link href="/dashboard">
                      <DropdownMenuItem className="flex items-center gap-2 p-2 rounded-xl focus:bg-white/5 cursor-pointer text-white">
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Dashboard</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/dashboard/account">
                      <DropdownMenuItem className="flex items-center gap-2 p-2 rounded-xl focus:bg-white/5 cursor-pointer text-white">
                        <UserIcon className="w-4 h-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/dashboard/settings">
                      <DropdownMenuItem className="flex items-center gap-2 p-2 rounded-xl focus:bg-white/5 cursor-pointer text-white">
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                    </Link>
                  </div>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <div className="p-1">
                    <DropdownMenuItem 
                      className="flex items-center gap-2 p-2 rounded-xl focus:bg-red-500/10 focus:text-red-400 cursor-pointer text-muted-foreground hover:text-red-400 transition-colors"
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
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/signup">
                    <Button className="rounded-full px-6 glow-primary font-bold">Register</Button>
                  </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
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
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 absolute top-full left-0 right-0 overflow-hidden shadow-xl"
          >
            <div className="py-6 px-4 space-y-4">
              {navLinks.map((link) => (
                <div key={link.name} className="space-y-2">
                  {link.subLinks ? (
                    <>
                      <button
                        onClick={() => toggleMenu(link.name)}
                        className="flex items-center justify-between w-full text-lg font-medium"
                      >
                        {link.name}
                        <ChevronDown className={cn("w-5 h-5 transition-transform", activeMenu === link.name ? "rotate-180" : "")} />
                      </button>
                      <AnimatePresence>
                        {activeMenu === link.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-4 flex flex-col gap-4 overflow-hidden border-l border-white/10 ml-1 mt-2"
                          >
                            {link.subLinks.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                className="flex items-center gap-3 py-1 group"
                                onClick={() => setIsOpen(false)}
                              >
                                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center shrink-0">
                                  <sub.icon className="w-4 h-4 text-primary" />
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-base text-white group-hover:text-primary transition-colors font-medium">{sub.name}</span>
                                  <span className="text-xs text-muted-foreground">{sub.desc}</span>
                                </div>
                              </Link>
                            ))}
                            <Link
                              href={link.href}
                              className="flex items-center gap-3 py-2 text-primary font-bold text-sm"
                              onClick={() => setIsOpen(false)}
                            >
                              <Palette className="w-4 h-4" />
                              View Full Ecosystem
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className="block text-lg font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
                <div className="pt-4 flex flex-col gap-3">
                  {user ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 px-2">
                        <Avatar className="h-10 w-10 border border-white/10">
                          <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || ""} />
                          <AvatarFallback className="bg-primary/20 text-primary font-bold">
                            {user.email?.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-white">
                            {user.user_metadata?.full_name || "User"}
                          </span>
                          <span className="text-xs text-muted-foreground truncate max-w-[180px]">
                            {user.email}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Link href="/dashboard" className="w-full" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full justify-start gap-2 border-white/5 bg-white/5">
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                          </Button>
                        </Link>
                        <Link href="/dashboard/account" className="w-full" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full justify-start gap-2 border-white/5 bg-white/5">
                            <UserIcon className="w-4 h-4" />
                            Profile
                          </Button>
                        </Link>
                        <Link href="/dashboard/settings" className="w-full" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full justify-start gap-2 border-white/5 bg-white/5">
                            <Settings className="w-4 h-4" />
                            Settings
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start gap-2 border-red-500/10 bg-red-500/5 text-red-400"
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
                      <Button variant="outline" className="w-full">Sign In</Button>
                    </Link>
                    <Link href="/signup" onClick={() => setIsOpen(false)}>
                        <Button className="w-full glow-primary font-bold">Register</Button>
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
