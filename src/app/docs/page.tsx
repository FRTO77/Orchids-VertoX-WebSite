"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LovableBackground } from "@/components/LovableBackground"
import { Search, ChevronRight, Book, Code, Rocket, Shield, Terminal, ArrowRight, Sparkles, MessageSquare, BookOpen, Layers } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const categories = [
    { 
      title: "Getting Started", 
      icon: Rocket, 
      color: "text-blue-500", 
      items: ["Quick Start Guide", "System Requirements", "Installation", "Core Concepts"], 
      desc: "Begin your journey into the VertoX ecosystem with our curated onboarding guides.",
      visual: (
        <svg viewBox="0 0 100 100" className="absolute -right-5 -top-5 w-32 h-32 opacity-5 pointer-events-none group-hover:opacity-10 transition-all duration-700">
          <path d="M50 10 L80 80 L50 70 L20 80 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.1" />
        </svg>
      ) 
    },
    { 
      title: "Voice Cloning", 
      icon: BookOpen, 
      color: "text-purple-500", 
      items: ["Recording Samples", "Optimization", "Vocal Identity", "Ethical Usage"], 
      desc: "Master the art of neural voice synthesis and character preservation.",
      visual: (
        <svg viewBox="0 0 100 100" className="absolute -right-5 -top-5 w-32 h-32 opacity-5 pointer-events-none group-hover:opacity-10 transition-all duration-700 group-hover:rotate-12">
          <path d="M30 40 Q50 20 70 40 T70 80 Q50 60 30 80 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M40 50 L60 50 M40 60 L60 60" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      ) 
    },
    { 
      title: "API Reference", 
      icon: Code, 
      color: "text-orange-500", 
      items: ["Authentication", "Endpoints", "Webhooks", "SDKs & Libraries"], 
      desc: "Deep technical documentation for integrating VertoX into your custom workflows.",
      visual: (
        <svg viewBox="0 0 100 100" className="absolute -right-5 -top-5 w-32 h-32 opacity-5 pointer-events-none group-hover:opacity-10 transition-all duration-700 group-hover:scale-110">
          <rect x="20" y="30" width="60" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M30 45 L40 50 L30 55" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <line x1="45" y1="55" x2="65" y2="55" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      ) 
    },
    { 
      title: "Security", 
      icon: Shield, 
      color: "text-green-500", 
      items: ["Data Privacy", "Encryption", "Compliance", "Access Control"], 
      desc: "Explore our zero-trust architecture and how we protect your sensitive data.",
      visual: (
        <svg viewBox="0 0 100 100" className="absolute -right-5 -top-5 w-32 h-32 opacity-5 pointer-events-none group-hover:opacity-10 transition-all duration-700">
          <path d="M50 15 L85 30 V60 Q50 90 15 60 V30 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      ) 
    },
]

export default function DocsPage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <LovableBackground />
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-4 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center mb-16 relative"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/10 blur-[120px] -z-10" />
            <Badge variant="outline" className="mb-6 py-2 px-6 bg-background/50 backdrop-blur-sm border-primary/20 text-primary uppercase tracking-[0.3em] font-black text-[10px]">
              Master the Core
            </Badge>
            <h1 className="text-6xl md:text-8xl font-heading font-black mb-8 leading-[0.85] tracking-tighter">
              Documentation <br /><span className="text-primary italic">& Resources.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Unlock the full potential of VertoX with our comprehensive guides, deep API references, and collaborative community resources.
            </p>
            <div className="relative max-w-2xl mx-auto group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                className="pl-14 h-20 rounded-[32px] bg-white/5 border-white/10 text-xl backdrop-blur-xl focus:border-primary/50 focus:ring-primary/20 shadow-2xl" 
                placeholder="Search the knowledge base..." 
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                <span className="text-sm">⌘</span> K
              </div>
            </div>
          </motion.div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-24">
            {categories.map((cat, i) => (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="rounded-[56px] border-border/50 bg-black/40 backdrop-blur-3xl overflow-hidden hover:border-primary/30 transition-all group h-full relative">
                    {cat.visual}
                    <CardContent className="p-12 relative z-10">
                      <div className="flex items-center gap-6 mb-8">
                        <div className={`w-16 h-16 rounded-2xl bg-muted/10 flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform duration-500 shadow-2xl shadow-black`}>
                          <cat.icon className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-3xl font-bold">{cat.title}</h3>
                          <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">{cat.desc}</p>
                        </div>
                      </div>
                      <ul className="space-y-3">
                        {cat.items.map((item) => (
                          <li key={item}>
                            <button className="flex items-center justify-between w-full p-5 rounded-2xl hover:bg-white/5 transition-all text-left group/btn border border-transparent hover:border-white/5">
                              <span className="font-bold text-muted-foreground group-hover/btn:text-foreground transition-colors text-lg">{item}</span>
                              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover/btn:text-primary transition-all group-hover/btn:translate-x-1" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
            ))}
          </div>

          {/* Interactive Playground Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass p-12 md:p-24 rounded-[80px] border-primary/20 bg-primary/5 max-w-6xl mx-auto relative overflow-hidden group hover:bg-primary/10 transition-all duration-700"
          >
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <pattern id="grid-docs" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid-docs)" />
              </svg>
            </div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-grow space-y-8 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
                  <Sparkles className="w-5 h-5" />
                  Live Developer Experience
                </div>
                  <h2 className="text-4xl md:text-6xl font-black leading-[0.9] tracking-tighter text-white">
                    The VertoX <br /><span className="text-primary italic">API Playground.</span>
                  </h2>
                  <p className="text-zinc-300 text-xl leading-relaxed max-w-xl">
                    Don't just read about it—test it. Our interactive playground allows you to simulate translation streams and voice cloning logic in real-time.
                  </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <Button size="lg" className="rounded-3xl px-12 h-20 text-2xl font-black glow-primary whitespace-nowrap">
                    Launch Studio
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-3xl px-12 h-20 text-2xl font-black border-white/10 hover:bg-white/5 whitespace-nowrap">
                    Join Discord
                  </Button>
                </div>
              </div>

              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full animate-pulse" />
                <div className="relative glass p-10 rounded-[48px] border-white/10 bg-black/40 transform lg:rotate-6 group-hover:rotate-0 transition-transform duration-700">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <Terminal className="w-6 h-6 text-primary" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Interactive Terminal</span>
                    </div>
                    <div className="space-y-3 font-mono text-sm">
                      <div className="flex gap-3"><span className="text-primary">$</span> <span>vertox login</span></div>
                      <div className="flex gap-3 text-green-400"><span className="text-primary">$</span> <span>Success! Connected to V3 Core</span></div>
                      <div className="flex gap-3"><span className="text-primary">$</span> <span>vertox stream --kazakh</span></div>
                      <div className="flex gap-3 opacity-50"><span className="text-primary">$</span> <span>Listening for audio...</span></div>
                    </div>
                    <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                      <Badge className="bg-primary/20 text-primary border-none">Active Session</Badge>
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500/20" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LovableBackground } from "@/components/LovableBackground"
import { Search, ChevronRight, Book, Code, Rocket, Shield, Terminal, ArrowRight, Sparkles, MessageSquare, BookOpen, Layers } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const categories = [
    { 
      title: "Getting Started", 
      icon: Rocket, 
      color: "text-blue-500", 
      items: ["Quick Start Guide", "System Requirements", "Installation", "Core Concepts"], 
      desc: "Begin your journey into the VertoX ecosystem with our curated onboarding guides.",
      visual: (
        <svg viewBox="0 0 100 100" className="absolute -right-5 -top-5 w-32 h-32 opacity-5 pointer-events-none group-hover:opacity-10 transition-all duration-700">
          <path d="M50 10 L80 80 L50 70 L20 80 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.1" />
        </svg>
      ) 
    },
    { 
      title: "Voice Cloning", 
      icon: BookOpen, 
      color: "text-purple-500", 
      items: ["Recording Samples", "Optimization", "Vocal Identity", "Ethical Usage"], 
      desc: "Master the art of neural voice synthesis and character preservation.",
      visual: (
        <svg viewBox="0 0 100 100" className="absolute -right-5 -top-5 w-32 h-32 opacity-5 pointer-events-none group-hover:opacity-10 transition-all duration-700 group-hover:rotate-12">
          <path d="M30 40 Q50 20 70 40 T70 80 Q50 60 30 80 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M40 50 L60 50 M40 60 L60 60" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      ) 
    },
    { 
      title: "API Reference", 
      icon: Code, 
      color: "text-orange-500", 
      items: ["Authentication", "Endpoints", "Webhooks", "SDKs & Libraries"], 
      desc: "Deep technical documentation for integrating VertoX into your custom workflows.",
      visual: (
        <svg viewBox="0 0 100 100" className="absolute -right-5 -top-5 w-32 h-32 opacity-5 pointer-events-none group-hover:opacity-10 transition-all duration-700 group-hover:scale-110">
          <rect x="20" y="30" width="60" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M30 45 L40 50 L30 55" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <line x1="45" y1="55" x2="65" y2="55" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      ) 
    },
    { 
      title: "Security", 
      icon: Shield, 
      color: "text-green-500", 
      items: ["Data Privacy", "Encryption", "Compliance", "Access Control"], 
      desc: "Explore our zero-trust architecture and how we protect your sensitive data.",
      visual: (
        <svg viewBox="0 0 100 100" className="absolute -right-5 -top-5 w-32 h-32 opacity-5 pointer-events-none group-hover:opacity-10 transition-all duration-700">
          <path d="M50 15 L85 30 V60 Q50 90 15 60 V30 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      ) 
    },
]

export default function DocsPage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <LovableBackground />
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-4 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center mb-16 relative"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/10 blur-[120px] -z-10" />
            <Badge variant="outline" className="mb-6 py-2 px-6 bg-background/50 backdrop-blur-sm border-primary/20 text-primary uppercase tracking-[0.3em] font-black text-[10px]">
              Master the Core
            </Badge>
              <h1 className="text-6xl md:text-8xl font-heading font-black mb-8 leading-[0.85] tracking-tighter text-white">
                Documentation <br /><span className="text-primary italic">& Resources.</span>
              </h1>
              <p className="text-xl md:text-2xl text-zinc-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Unlock the full potential of VertoX with our comprehensive guides, deep API references, and collaborative community resources.
              </p>
            <div className="relative max-w-2xl mx-auto group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                className="pl-14 h-20 rounded-[32px] bg-white/5 border-white/10 text-xl backdrop-blur-xl focus:border-primary/50 focus:ring-primary/20 shadow-2xl" 
                placeholder="Search the knowledge base..." 
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                <span className="text-sm">⌘</span> K
              </div>
            </div>
          </motion.div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-24">
            {categories.map((cat, i) => (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="rounded-[56px] border-border/50 bg-black/40 backdrop-blur-3xl overflow-hidden hover:border-primary/30 transition-all group h-full relative">
                    {cat.visual}
                    <CardContent className="p-12 relative z-10">
                      <div className="flex items-center gap-6 mb-8">
                        <div className={`w-16 h-16 rounded-2xl bg-muted/10 flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform duration-500 shadow-2xl shadow-black`}>
                          <cat.icon className="w-8 h-8" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-3xl font-bold">{cat.title}</h3>
                          <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">{cat.desc}</p>
                        </div>
                      </div>
                      <ul className="space-y-3">
                        {cat.items.map((item) => (
                          <li key={item}>
                            <button className="flex items-center justify-between w-full p-5 rounded-2xl hover:bg-white/5 transition-all text-left group/btn border border-transparent hover:border-white/5">
                              <span className="font-bold text-muted-foreground group-hover/btn:text-foreground transition-colors text-lg">{item}</span>
                              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover/btn:text-primary transition-all group-hover/btn:translate-x-1" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
            ))}
          </div>

          {/* Interactive Playground Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass p-12 md:p-24 rounded-[80px] border-primary/20 bg-primary/5 max-w-6xl mx-auto relative overflow-hidden group hover:bg-primary/10 transition-all duration-700"
          >
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <pattern id="grid-docs" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid-docs)" />
              </svg>
            </div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-grow space-y-8 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
                  <Sparkles className="w-5 h-5" />
                  Live Developer Experience
                </div>
                  <h2 className="text-4xl md:text-6xl font-black leading-[0.9] tracking-tighter text-white">
                    The VertoX <br /><span className="text-primary italic">API Playground.</span>
                  </h2>
                  <p className="text-zinc-300 text-xl leading-relaxed max-w-xl">
                    Don't just read about it—test it. Our interactive playground allows you to simulate translation streams and voice cloning logic in real-time.
                  </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <Button size="lg" className="rounded-3xl px-12 h-20 text-2xl font-black glow-primary whitespace-nowrap">
                    Launch Studio
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-3xl px-12 h-20 text-2xl font-black border-white/10 hover:bg-white/5 whitespace-nowrap">
                    Join Discord
                  </Button>
                </div>
              </div>

              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full animate-pulse" />
                <div className="relative glass p-10 rounded-[48px] border-white/10 bg-black/40 transform lg:rotate-6 group-hover:rotate-0 transition-transform duration-700">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <Terminal className="w-6 h-6 text-primary" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Interactive Terminal</span>
                    </div>
                    <div className="space-y-3 font-mono text-sm">
                      <div className="flex gap-3"><span className="text-primary">$</span> <span>vertox login</span></div>
                      <div className="flex gap-3 text-green-400"><span className="text-primary">$</span> <span>Success! Connected to V3 Core</span></div>
                      <div className="flex gap-3"><span className="text-primary">$</span> <span>vertox stream --kazakh</span></div>
                      <div className="flex gap-3 opacity-50"><span className="text-primary">$</span> <span>Listening for audio...</span></div>
                    </div>
                    <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                      <Badge className="bg-primary/20 text-primary border-none">Active Session</Badge>
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500/20" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LovableBackground } from "@/components/LovableBackground"
import { Search, ChevronRight, Book, Code, Rocket, Shield, Terminal, ArrowRight, Sparkles, MessageSquare, BookOpen, Layers } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const categories = [
    { 
      title: "Getting Started", 
      icon: Rocket, 
      color: "text-blue-500", 
      items: ["Quick Start Guide", "System Requirements", "Installation", "Core Concepts"], 
      desc: "Begin your journey into the VertoX ecosystem with our curated onboarding guides.",
      visual: (
        <svg viewBox="0 0 100 100" className="absolute -right-5 -top-5 w-32 h-32 opacity-5 pointer-events-none group-hover:opacity-10 transition-all duration-700">
          <path d="M50 10 L80 80 L50 70 L20 80 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.1" />
        </svg>
      ) 
    },
    { 
      title: "Voice Cloning", 
      icon: BookOpen, 
      color: "text-purple-500", 
      items: ["Recording Samples", "Optimization", "Vocal Identity", "Ethical Usage"], 
      desc: "Master the art of neural voice synthesis and character preservation.",
      visual: (
        <svg viewBox="0 0 100 100" className="absolute -right-5 -top-5 w-32 h-32 opacity-5 pointer-events-none group-hover:opacity-10 transition-all duration-700 group-hover:rotate-12">
          <path d="M30 40 Q50 20 70 40 T70 80 Q50 60 30 80 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M40 50 L60 50 M40 60 L60 60" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      ) 
    },
    { 
      title: "API Reference", 
      icon: Code, 
      color: "text-orange-500", 
      items: ["Authentication", "Endpoints", "Webhooks", "SDKs & Libraries"], 
      desc: "Deep technical documentation for integrating VertoX into your custom workflows.",
      visual: (
        <svg viewBox="0 0 100 100" className="absolute -right-5 -top-5 w-32 h-32 opacity-5 pointer-events-none group-hover:opacity-10 transition-all duration-700 group-hover:scale-110">
          <rect x="20" y="30" width="60" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M30 45 L40 50 L30 55" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <line x1="45" y1="55" x2="65" y2="55" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      ) 
    },
    { 
      title: "Security", 
      icon: Shield, 
      color: "text-green-500", 
      items: ["Data Privacy", "Encryption", "Compliance", "Access Control"], 
      desc: "Explore our zero-trust architecture and how we protect your sensitive data.",
      visual: (
        <svg viewBox="0 0 100 100" className="absolute -right-5 -top-5 w-32 h-32 opacity-5 pointer-events-none group-hover:opacity-10 transition-all duration-700">
          <path d="M50 15 L85 30 V60 Q50 90 15 60 V30 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      ) 
    },
]

export default function DocsPage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <LovableBackground />
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-4 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center mb-16 relative"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/10 blur-[120px] -z-10" />
            <Badge variant="outline" className="mb-6 py-2 px-6 bg-background/50 backdrop-blur-sm border-primary/20 text-primary uppercase tracking-[0.3em] font-black text-[10px]">
              Master the Core
            </Badge>
              <h1 className="text-6xl md:text-8xl font-heading font-black mb-8 leading-[0.85] tracking-tighter text-white">
                Documentation <br /><span className="text-primary italic">& Resources.</span>
              </h1>
              <p className="text-xl md:text-2xl text-zinc-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Unlock the full potential of VertoX with our comprehensive guides, deep API references, and collaborative community resources.
              </p>
            <div className="relative max-w-2xl mx-auto group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input 
                className="pl-14 h-20 rounded-[32px] bg-white/5 border-white/10 text-xl backdrop-blur-xl focus:border-primary/50 focus:ring-primary/20 shadow-2xl" 
                placeholder="Search the knowledge base..." 
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                <span className="text-sm">⌘</span> K
              </div>
            </div>
          </motion.div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-24">
            {categories.map((cat, i) => (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="rounded-[56px] border-border/50 bg-black/40 backdrop-blur-3xl overflow-hidden hover:border-primary/30 transition-all group h-full relative">
                    {cat.visual}
                      <CardContent className="p-12 relative z-10">
                        <div className="flex items-center gap-6 mb-8">
                          <div className={`w-16 h-16 rounded-2xl bg-muted/10 flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform duration-500 shadow-2xl shadow-black`}>
                            <cat.icon className="w-8 h-8" />
                          </div>
                          <div className="space-y-1">
                            <h3 className="text-3xl font-bold text-white">{cat.title}</h3>
                            <p className="text-xs text-zinc-400 font-medium uppercase tracking-widest">{cat.desc}</p>
                          </div>
                        </div>
                        <ul className="space-y-3">
                          {cat.items.map((item) => (
                            <li key={item}>
                              <button className="flex items-center justify-between w-full p-5 rounded-2xl hover:bg-white/5 transition-all text-left group/btn border border-transparent hover:border-white/5">
                                <span className="font-bold text-zinc-300 group-hover/btn:text-white transition-colors text-lg">{item}</span>
                                <ChevronRight className="w-5 h-5 text-zinc-500 group-hover/btn:text-primary transition-all group-hover/btn:translate-x-1" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                  </Card>
                </motion.div>
            ))}
          </div>

          {/* Interactive Playground Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass p-12 md:p-24 rounded-[80px] border-primary/20 bg-primary/5 max-w-6xl mx-auto relative overflow-hidden group hover:bg-primary/10 transition-all duration-700"
          >
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <pattern id="grid-docs" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid-docs)" />
              </svg>
            </div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-grow space-y-8 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
                  <Sparkles className="w-5 h-5" />
                  Live Developer Experience
                </div>
                  <h2 className="text-4xl md:text-6xl font-black leading-[0.9] tracking-tighter text-white">
                    The VertoX <br /><span className="text-primary italic">API Playground.</span>
                  </h2>
                  <p className="text-zinc-300 text-xl leading-relaxed max-w-xl">
                    Don't just read about it—test it. Our interactive playground allows you to simulate translation streams and voice cloning logic in real-time.
                  </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <Button size="lg" className="rounded-3xl px-12 h-20 text-2xl font-black glow-primary whitespace-nowrap">
                    Launch Studio
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-3xl px-12 h-20 text-2xl font-black border-white/10 hover:bg-white/5 whitespace-nowrap">
                    Join Discord
                  </Button>
                </div>
              </div>

              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full animate-pulse" />
                <div className="relative glass p-10 rounded-[48px] border-white/10 bg-black/40 transform lg:rotate-6 group-hover:rotate-0 transition-transform duration-700">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <Terminal className="w-6 h-6 text-primary" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Interactive Terminal</span>
                    </div>
                    <div className="space-y-3 font-mono text-sm">
                      <div className="flex gap-3"><span className="text-primary">$</span> <span>vertox login</span></div>
                      <div className="flex gap-3 text-green-400"><span className="text-primary">$</span> <span>Success! Connected to V3 Core</span></div>
                      <div className="flex gap-3"><span className="text-primary">$</span> <span>vertox stream --kazakh</span></div>
                      <div className="flex gap-3 opacity-50"><span className="text-primary">$</span> <span>Listening for audio...</span></div>
                    </div>
                    <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                      <Badge className="bg-primary/20 text-primary border-none">Active Session</Badge>
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500/20" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
