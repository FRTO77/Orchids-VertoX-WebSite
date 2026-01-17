"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LovableBackground } from "@/components/LovableBackground"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  ArrowRight, 
  Zap, 
  Mic2, 
  Shield, 
  Globe, 
  Cpu, 
  Video, 
  Smartphone, 
  Cloud,
  Layers,
  Sparkles,
  Headphones,
  Monitor,
  Terminal,
  Database
} from "lucide-react"
import Link from "next/link"

const products = [
  {
    id: "vertox-core",
    name: "VertoX Core",
    badge: "Flagship",
    description: "Our high-performance neural engine for real-time translation. The foundation of the VertoX ecosystem, optimized for sub-200ms latency.",
    features: ["Sub-second Neural Translation", "Hyper-realistic Voice Cloning", "Contextual Nuance Engine"],
    icon: Zap,
    color: "text-primary",
    bgColor: "bg-primary/10",
    href: "/product",
    visual: (
      <svg viewBox="0 0 200 200" className="absolute -right-10 -bottom-10 w-64 h-64 opacity-10 pointer-events-none group-hover:opacity-20 transition-all duration-700">
        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
        <path d="M100 20 L100 180 M20 100 L180 100" stroke="currentColor" strokeWidth="0.2" />
        <motion.path 
          d="M50 50 L150 150 M150 50 L50 150" 
          stroke="currentColor" 
          strokeWidth="0.2"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </svg>
    )
  },
  {
    id: "vertox-studio",
    name: "VertoX Studio",
    badge: "Creative",
    description: "Professional multi-track dubbing and vocal synthesis platform. Perfect for content creators, filmmakers, and global educators.",
    features: ["Multi-track Emotional Sync", "Studio-grade Audio Export", "Dynamic Tone Calibration"],
    icon: Headphones,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    href: "/product#studio",
    visual: (
      <svg viewBox="0 0 200 200" className="absolute -right-10 -bottom-10 w-64 h-64 opacity-10 pointer-events-none group-hover:opacity-20 transition-all duration-700 group-hover:rotate-12">
        <rect x="40" y="40" width="120" height="120" rx="12" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <path d="M60 100 Q100 20 140 100 T220 100" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    )
  },
  {
    id: "vertox-enterprise",
    name: "VertoX Enterprise",
    badge: "Security",
    description: "Secure, scalable communication infrastructure for global organizations. Features zero-trust data handling and on-prem deployment.",
    features: ["On-Premise Deployment", "Zero Data Retention Policy", "SSO & Audit Logging"],
    icon: Shield,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    href: "/solutions/physical-meetings",
    visual: (
      <svg viewBox="0 0 200 200" className="absolute -right-10 -bottom-10 w-64 h-64 opacity-10 pointer-events-none group-hover:opacity-20 transition-all duration-700">
        <path d="M100 20 L180 50 V110 Q100 190 20 110 V50 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <rect x="80" y="80" width="40" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
    )
  },
  {
    id: "vertox-api",
    name: "VertoX API",
    badge: "Developer",
    description: "Developer-first translation and cloning APIs. Build custom voice applications with our robust REST and WebSocket interfaces.",
    features: ["Streaming WebSocket API", "Advanced Voice Tuning SDK", "Global Edge Latency"],
    icon: Terminal,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    href: "/solutions/api",
    visual: (
      <svg viewBox="0 0 200 200" className="absolute -right-10 -bottom-10 w-64 h-64 opacity-10 pointer-events-none group-hover:opacity-20 transition-all duration-700 group-hover:scale-110">
        <rect x="30" y="40" width="140" height="120" rx="8" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <path d="M50 70 L70 90 L50 110" fill="none" stroke="currentColor" strokeWidth="1" />
        <line x1="80" y1="110" x2="110" y2="110" stroke="currentColor" strokeWidth="1" />
      </svg>
    )
  },
  {
    id: "vertox-connect",
    name: "VertoX Connect",
    badge: "Integrations",
    description: "Native connectors for Zoom, Microsoft Teams, and Google Meet. Unified communication bridge for hybrid workplaces.",
    features: ["One-click Meeting Join", "Multi-platform Sync", "Automatic Transcription"],
    icon: Video,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    href: "/solutions/online-meetings",
    visual: (
      <svg viewBox="0 0 200 200" className="absolute -right-10 -bottom-10 w-64 h-64 opacity-10 pointer-events-none group-hover:opacity-20 transition-all duration-700">
        <path d="M40 60 H140 V140 H40 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <path d="M140 80 L180 60 V140 L140 120 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    )
  },
    {
      id: "vertox-linux",
      name: "VertoX for Linux",
      badge: "Native",
      description: "A high-performance, native client for the Linux ecosystem. Optimized for Wayland, X11, and major distributions with sub-millisecond local processing.",
      features: ["Native AppImage & Deb", "Wayland/X11 Optimized", "Low-level ALSA Integration"],
      icon: Terminal,
      color: "text-orange-400",
      bgColor: "bg-orange-400/10",
      href: "/download",
      visual: (
        <svg viewBox="0 0 200 200" className="absolute -right-10 -bottom-10 w-64 h-64 opacity-10 pointer-events-none group-hover:opacity-20 transition-all duration-700">
          <path d="M40 40 L160 40 L160 140 L40 140 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <path d="M50 60 L70 80 L50 100" fill="none" stroke="currentColor" strokeWidth="1" />
          <line x1="80" y1="100" x2="110" y2="100" stroke="currentColor" strokeWidth="1" />
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.1" strokeDasharray="2 2" />
        </svg>
      )
    }
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <LovableBackground />
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center mb-24 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -top-20 left-1/2 -translate-x-1/2 w-full h-96 bg-primary/10 blur-[150px] -z-10"
            />
            <Badge variant="outline" className="mb-6 py-2 px-6 bg-background/50 backdrop-blur-sm border-primary/20 text-primary uppercase tracking-[0.4em] font-black text-[10px]">
              The Complete Product Suite
            </Badge>
            <h1 className="text-6xl md:text-9xl font-heading font-black tracking-tighter mb-8 leading-[0.8]">
              The VertoX <br /><span className="text-primary italic">Ecosystem.</span>
            </h1>
            <p className="text-xl md:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              From individual communication to global infrastructure, we've built a unified platform to erase the boundaries of language.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="group relative glass p-10 rounded-[64px] border-border/50 hover:border-primary/30 transition-all duration-700 overflow-hidden bg-black/40 backdrop-blur-3xl flex flex-col h-full"
              >
                {product.visual}
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-10">
                    <div className={`w-16 h-16 ${product.bgColor} rounded-2xl flex items-center justify-center ${product.color} group-hover:scale-110 transition-transform duration-500 shadow-2xl shadow-black`}>
                      <product.icon className="w-8 h-8" />
                    </div>
                    <Badge variant="secondary" className="bg-white/5 border-white/10 text-[10px] font-black uppercase tracking-widest text-white/50">
                      {product.badge}
                    </Badge>
                  </div>

                  <h3 className="text-4xl font-bold mb-4 group-hover:text-primary transition-colors duration-500">{product.name}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-10 text-lg flex-grow">
                    {product.description}
                  </p>

                  <div className="space-y-3 mb-12 p-6 rounded-3xl bg-white/5 border border-white/5">
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-white/70">
                        <Sparkles className={`w-4 h-4 ${product.color}`} />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Link href={product.href} className="w-full">
                    <Button className="w-full rounded-3xl py-8 text-xl font-black group-hover:glow-primary transition-all flex items-center justify-center gap-3">
                      View Details
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Infrastructure Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-32 glass p-12 md:p-24 rounded-[80px] border-white/5 bg-white/5 relative overflow-hidden text-center max-w-6xl mx-auto"
          >
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-10">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.1" />
                <path d="M10 50 Q50 10 90 50 T10 50" fill="none" stroke="currentColor" strokeWidth="0.1" />
              </svg>
            </div>
            
            <Badge className="bg-primary/20 text-primary mb-8 px-6 py-2 rounded-full border-none text-xs font-black uppercase tracking-widest">Global Infrastructure</Badge>
            <h2 className="text-5xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">Powered by <br /><span className="text-primary italic">Deep Fluency.</span></h2>
            <p className="text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Our ecosystem is built on a proprietary global edge network, ensuring that no matter where you are, your voice is heard clearly and instantly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" className="rounded-3xl h-20 px-12 text-2xl font-black glow-primary">
                Explore Network
              </Button>
              <Button size="lg" variant="outline" className="rounded-3xl h-20 px-12 text-2xl font-black border-white/10 hover:bg-white/5">
                Technical Whitepaper
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
