"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LovableBackground } from "@/components/LovableBackground"
import { motion } from "framer-motion"
import { Terminal, Monitor, Globe, Apple, Laptop, ArrowRight, CloudDownload, Zap, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

function LocalBadge({ children, className, variant }: { children: React.ReactNode; className?: string; variant?: any }) {
  return (
    <Badge variant={variant} className={className}>
      {children}
    </Badge>
  )
}

export default function DownloadPage() {
  const platforms = [
    { 
      name: "macOS", 
      icon: Apple, 
      version: "v2.5.2", 
      size: "88MB", 
      type: "Universal (M1/M2/Intel)",
      desc: "Optimized for Apple Silicon with native neural engine support.",
      visual: (
        <svg viewBox="0 0 100 100" className="absolute -right-5 -bottom-5 w-32 h-32 opacity-10 pointer-events-none group-hover:opacity-20 transition-all duration-700">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M50 20 L50 80 M20 50 L80 50" stroke="currentColor" strokeWidth="0.2" />
        </svg>
      )
    },
    { 
      name: "Windows", 
      icon: Monitor, 
      version: "v2.5.2", 
      size: "96MB", 
      type: "Windows 10/11 (64-bit)",
      desc: "High-performance client with ASIO audio driver support.",
      visual: (
        <svg viewBox="0 0 100 100" className="absolute -right-5 -bottom-5 w-32 h-32 opacity-10 pointer-events-none group-hover:opacity-20 transition-all duration-700 group-hover:rotate-45">
          <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M20 50 H80 M50 20 V80" stroke="currentColor" strokeWidth="0.2" />
        </svg>
      )
    },
    { 
      name: "Linux", 
      icon: Terminal, 
      version: "v2.5.2", 
      size: "72MB", 
      type: "AppImage / Deb / RPM",
      desc: "Native Linux client with full support for Wayland and X11.",
      visual: (
        <svg viewBox="0 0 100 100" className="absolute -right-5 -bottom-5 w-32 h-32 opacity-10 pointer-events-none group-hover:opacity-20 transition-all duration-700">
          <path d="M20 30 L80 30 L80 70 L20 70 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M30 45 L40 50 L30 55" fill="none" stroke="currentColor" strokeWidth="1" />
          <line x1="45" y1="55" x2="55" y2="55" stroke="currentColor" strokeWidth="1" />
        </svg>
      )
    },
  ]

  return (
    <div className="min-h-screen flex flex-col relative">
      <LovableBackground />
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-4 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-24 relative"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 blur-[120px] -z-10" />
              <LocalBadge variant="outline" className="mb-6 py-2 px-6 bg-background/50 backdrop-blur-sm border-primary/20 text-primary uppercase tracking-[0.3em] font-black text-[10px]">
                Deploy Anywhere
              </LocalBadge>
              <h1 className="text-6xl md:text-8xl font-heading font-black mb-8 tracking-tighter leading-[0.85]">
                Seamless Access <br /><span className="text-primary italic">On Every Device.</span>
              </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience the full power of the VertoX neural engine with our native high-performance clients. Optimized for minimal latency and maximum privacy.
            </p>
          </motion.div>

          {/* Platforms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {platforms.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative glass p-10 rounded-[56px] border-border/50 hover:border-primary/50 transition-all duration-500 overflow-hidden bg-black/40 backdrop-blur-3xl h-full flex flex-col"
              >
                {p.visual}
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-2xl shadow-black">
                  <p.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-3 group-hover:text-primary transition-colors duration-500">{p.name}</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed flex-grow">
                  {p.desc}
                </p>
                <div className="space-y-2 mb-8 p-4 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Version</span>
                    <span className="text-white">{p.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Size</span>
                    <span className="text-white">{p.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target</span>
                    <span className="text-white">{p.type}</span>
                  </div>
                </div>
                <Button className="w-full rounded-3xl py-8 text-lg font-black group-hover:glow-primary transition-all flex gap-3">
                  <CloudDownload className="w-6 h-6" />
                  Download
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Secondary Options */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="glass p-12 rounded-[64px] border-primary/20 bg-primary/5 relative overflow-hidden group hover:bg-primary/10 transition-all duration-500"
            >
              <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <Globe className="w-64 h-64 text-primary" />
              </div>
                <div className="relative z-10">
                  <LocalBadge className="mb-6 bg-primary/20 text-primary border-none py-1.5 px-4 rounded-full text-[10px] font-black uppercase tracking-widest">Web Extension</LocalBadge>
                  <h2 className="text-4xl font-black mb-6">VertoX for Browser</h2>
                <p className="text-muted-foreground mb-10 text-lg leading-relaxed">Inject real-time captions and neural translation directly into any web-based meeting platform. Compatible with Chrome, Edge, and Brave.</p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="default" className="rounded-2xl px-10 h-16 text-lg font-black glow-primary flex items-center gap-3">
                    Add to Chrome <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="glass p-12 rounded-[64px] border-white/10 bg-white/5 relative overflow-hidden group hover:bg-white/10 transition-all duration-500"
            >
              <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <Shield className="w-64 h-64 text-white" />
              </div>
                <div className="relative z-10">
                  <LocalBadge className="mb-6 bg-white/10 text-white border-none py-1.5 px-4 rounded-full text-[10px] font-black uppercase tracking-widest">CLI Engine</LocalBadge>
                  <h2 className="text-4xl font-black mb-6">VertoX Core CLI</h2>
                <p className="text-muted-foreground mb-10 text-lg leading-relaxed">For developers and power users. A high-performance command line interface for headless translation and batch processing.</p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline" className="rounded-2xl px-10 h-16 text-lg font-black border-white/10 hover:bg-white/5 flex items-center gap-3">
                    <Zap className="w-5 h-5" />
                    npm install vertox
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
