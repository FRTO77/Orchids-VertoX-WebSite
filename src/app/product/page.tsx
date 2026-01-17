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
  Sparkles, 
  Cpu, 
  Layers, 
  Monitor,
  CheckCircle2
} from "lucide-react"

export default function ProductPage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <LovableBackground />
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-20 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/20 blur-[100px] -z-10"
            />
            <Badge variant="outline" className="mb-6 py-1.5 px-4 bg-background/50 backdrop-blur-sm border-primary/20 text-primary uppercase tracking-[0.2em] font-black text-[10px]">
              VertoX Voice Preservation
            </Badge>
            <h1 className="text-6xl md:text-8xl font-heading font-black tracking-tighter mb-8 leading-[0.85]">
              Same Voice, <br /><span className="text-primary italic">Same Feeling.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              VertoX translates live conversations, calls and events instantly while preserving speaker identity, tone and intent.
            </p>
          </div>

          {/* How VertoX Works - Dual Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto mb-32">
            {/* Web App Explainer */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="glass p-10 md:p-14 rounded-[56px] border-border/50 bg-black/40 backdrop-blur-3xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-2xl shadow-black">
                  <Globe className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold">How the Web App Works</h2>
              </div>
              <div className="space-y-6">
                {[
                  "Join a room from your browser (no install required).",
                  "Grant mic access and optionally select a voice-preservation profile.",
                  "VertoX captures, translates on the fly, and streams to listeners.",
                  "Listeners hear translation with your voice characteristics in <0.5s."
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0 mt-1">
                      {i + 1}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 pt-8 border-t border-white/5">
                <h4 className="text-sm font-black uppercase tracking-widest text-primary mb-4">Web Highlights</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["Instant join via link", "Headphone output", "On-page controls", "Language/Tone selector"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-bold text-zinc-400">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Desktop App Explainer */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="glass p-10 md:p-14 rounded-[56px] border-border/50 bg-black/40 backdrop-blur-3xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 shadow-2xl shadow-black">
                  <Monitor className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold">How the Desktop App Works</h2>
              </div>
              <div className="space-y-6">
                {[
                  "Install the VertoX desktop client (Windows/macOS).",
                  "Route system or device audio into VertoX via virtual drivers.",
                  "VertoX joins Zoom/Teams or system audio and translates in real time.",
                  "Output translated audio to selected audio devices and conferencing tools."
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 font-bold text-sm shrink-0 mt-1">
                      {i + 1}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 pt-8 border-t border-white/5">
                <h4 className="text-sm font-black uppercase tracking-widest text-purple-500 mb-4">Desktop Highlights</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["Native low-latency engine", "Virtual audio device", "Hardware integration", "Background co-pilot"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-bold text-zinc-400">
                      <CheckCircle2 className="w-4 h-4 text-purple-500" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Technical Snapshot Section */}
          <section className="mb-20">
            <div className="glass p-12 md:p-24 rounded-[80px] border-white/5 relative overflow-hidden bg-white/5 backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
                <svg viewBox="0 0 800 600" className="w-full h-full">
                  <path d="M0 300 Q200 100 400 300 T800 300" fill="none" stroke="var(--primary)" strokeWidth="0.5" />
                </svg>
              </div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-8">
                  <Badge className="bg-primary/20 text-primary py-2 px-6 rounded-full border border-primary/20 text-xs font-black tracking-widest uppercase">
                    Technical Snapshot
                  </Badge>
                  <h2 className="text-5xl md:text-7xl font-heading font-black leading-[0.9] tracking-tighter">
                    Built for <br /><span className="text-primary italic">Global Interaction.</span>
                  </h2>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    VertoX is the only real-time voice translation platform built to preserve human identity in translation across meetings, events and live streams.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { icon: Globe, label: "Languages Supported", value: "25+ Launch" },
                      { icon: Zap, label: "Typical Latency", value: "~0.5 Seconds" },
                      { icon: Mic2, label: "Audio Quality", value: "Wideband Hi-Fi" },
                      { icon: Shield, label: "Data Security", value: "E2E Encryption" }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col gap-2 p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                        <item.icon className="w-5 h-5 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{item.label}</span>
                        <span className="text-xl font-bold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative aspect-square">
                  <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full animate-pulse" />
                  <div className="relative h-full flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                      className="w-full h-full border border-dashed border-primary/20 rounded-full flex items-center justify-center"
                    >
                      <div className="w-[80%] h-[80%] border border-dashed border-primary/30 rounded-full flex items-center justify-center">
                        <div className="w-[60%] h-[60%] border border-dashed border-primary/40 rounded-full flex items-center justify-center">
                          <Sparkles className="w-20 h-20 text-primary opacity-50" />
                        </div>
                      </div>
                    </motion.div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl font-black text-primary mb-1">~0.5s</div>
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">Ultra-Low Latency</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Privacy & Security CTA */}
          <section className="py-24 max-w-5xl mx-auto text-center">
             <div className="space-y-6">
                <Badge variant="outline" className="text-green-500 border-green-500/30 uppercase tracking-widest px-4 py-1">Privacy & Security</Badge>
                <h2 className="text-4xl md:text-6xl font-heading font-black">Secure & Compliance-Ready</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  End-to-end encryption, consent-first workflows, and data minimization. Designed for GDPR & CCPA workflows with private cloud options.
                </p>
                <div className="flex flex-wrap justify-center gap-8 mt-12">
                   {["End-to-End TLS", "SOC2 Type II", "Consent Prompts", "Zero Storage Default"].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 font-bold uppercase tracking-wider text-xs">
                         <Shield className="w-4 h-4 text-primary" />
                         {item}
                      </div>
                   ))}
                </div>
             </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 text-center">
            <h2 className="text-4xl md:text-6xl font-heading font-black mb-10">Sound Like Yourself in Any Language.</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" className="rounded-full h-20 px-12 text-2xl font-black glow-primary">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-20 px-12 text-2xl font-black border-white/10 hover:bg-white/5">
                Request a Demo
              </Button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
