"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
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
  Monitor,
  CheckCircle2
} from "lucide-react"

const editorialEase = [0.22, 1, 0.36, 1] as const;

const features = [
  {
    title: "Voice Preservation",
    description: "Translate words while keeping the original speaker's timbre, pitch and emotion intact.",
  },
  {
    title: "Real-Time Latency",
    description: "End-to-end latency of ~0.5s for live calls and events under typical conditions.",
  },
  {
    title: "25+ Languages",
    description: "Native support for major world languages at launch, with continuous expansion.",
  },
  {
    title: "Multi-Platform",
    description: "Web app for instant joining and desktop app for advanced audio routing.",
  },
  {
    title: "Enterprise Security",
    description: "End-to-end encryption, role-based consent, and GDPR/CCPA compliance.",
  },
  {
    title: "Broadcast Ready",
    description: "Host multilingual meetings, live streams, and conference audio at scale.",
  },
];

export default function ProductPage() {
  return (
    <div className="min-h-screen flex flex-col relative bg-white dark:bg-black overflow-x-hidden">
      <div className="grain" />
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center bg-grid-black dark:bg-grid-white relative overflow-hidden pt-20">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-black" />
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: editorialEase }}
                className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-8"
              >
                VertoX Voice Preservation
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: editorialEase, delay: 0.1 }}
                className="text-6xl md:text-8xl lg:text-[10rem] font-serif font-light leading-[0.85] tracking-tight mb-8 text-black dark:text-white"
              >
                Same Voice, <br /><em className="italic">Same Feeling.</em>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: editorialEase, delay: 0.3 }}
                className="text-lg md:text-xl text-black/60 dark:text-white/60 font-light max-w-2xl mx-auto mb-12 leading-relaxed"
              >
                VertoX translates live conversations, calls and events instantly while preserving speaker identity, tone and intent.
              </motion.p>
            </div>
          </div>
        </section>

        {/* How VertoX Works - Dual Section */}
        <section className="py-32 bg-black text-white relative overflow-hidden">
          <div className="bg-grid-white absolute inset-0" />
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
              {/* Web App Explainer */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: editorialEase }}
                className="p-10 md:p-14 border border-white/10"
              >
                <div className="flex items-center gap-4 mb-8">
                  <Globe className="w-6 h-6 text-white/40" />
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">01 / Web App</p>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-light leading-[0.9] mb-8">
                  How the Web App <em className="italic">Works</em>
                </h2>
                <div className="space-y-6">
                  {[
                    "Join a room from your browser (no install required).",
                    "Grant mic access and optionally select a voice-preservation profile.",
                    "VertoX captures, translates on the fly, and streams to listeners.",
                    "Listeners hear translation with your voice characteristics in <0.5s."
                  ].map((step, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: editorialEase, delay: i * 0.1 }}
                      className="flex gap-6 items-start py-4 border-b border-white/10"
                    >
                      <span className="text-xs uppercase tracking-[0.3em] text-white/40 mt-1">0{i + 1}</span>
                      <p className="text-white/80 font-light leading-relaxed">{step}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-10 pt-8 border-t border-white/10">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-6">Web Highlights</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {["Instant join via link", "Headphone output", "On-page controls", "Language/Tone selector"].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                        <CheckCircle2 className="w-3 h-3" />
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
                viewport={{ once: true }}
                transition={{ duration: 1, ease: editorialEase, delay: 0.2 }}
                className="p-10 md:p-14 border border-white/10"
              >
                <div className="flex items-center gap-4 mb-8">
                  <Monitor className="w-6 h-6 text-white/40" />
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">02 / Desktop App</p>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-light leading-[0.9] mb-8">
                  How the Desktop App <em className="italic">Works</em>
                </h2>
                <div className="space-y-6">
                  {[
                    "Install the VertoX desktop client (Windows/macOS).",
                    "Route system or device audio into VertoX via virtual drivers.",
                    "VertoX joins Zoom/Teams or system audio and translates in real time.",
                    "Output translated audio to selected audio devices and conferencing tools."
                  ].map((step, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: editorialEase, delay: i * 0.1 }}
                      className="flex gap-6 items-start py-4 border-b border-white/10"
                    >
                      <span className="text-xs uppercase tracking-[0.3em] text-white/40 mt-1">0{i + 1}</span>
                      <p className="text-white/80 font-light leading-relaxed">{step}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-10 pt-8 border-t border-white/10">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-6">Desktop Highlights</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {["Native low-latency engine", "Virtual audio device", "Hardware integration", "Background co-pilot"].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
                        <CheckCircle2 className="w-3 h-3" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Technical Snapshot Section */}
        <section className="py-32 bg-white dark:bg-black text-black dark:text-white relative overflow-hidden">
          <div className="bg-grid-black dark:bg-grid-white absolute inset-0" />
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: editorialEase }}
                  className="space-y-8"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40">03 / Technical Snapshot</p>
                  <h2 className="text-5xl md:text-7xl font-serif font-light leading-[0.9]">
                    Built for <br /><em className="italic">Global Interaction.</em>
                  </h2>
                  <p className="text-lg text-black/60 dark:text-white/60 font-light leading-relaxed max-w-lg">
                    VertoX is the only real-time voice translation platform built to preserve human identity in translation across meetings, events and live streams.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-px bg-black/10 dark:bg-white/10 mt-12">
                    {[
                      { icon: Globe, label: "Languages Supported", value: "25+ Launch" },
                      { icon: Zap, label: "Typical Latency", value: "~0.5 Seconds" },
                      { icon: Mic2, label: "Audio Quality", value: "Wideband Hi-Fi" },
                      { icon: Shield, label: "Data Security", value: "E2E Encryption" }
                    ].map((item, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: editorialEase, delay: i * 0.1 }}
                        className="bg-white dark:bg-black p-8 group hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-700"
                      >
                        <item.icon className="w-4 h-4 mb-4 text-black/40 dark:text-white/40 group-hover:text-white/40 dark:group-hover:text-black/40 transition-colors duration-700" />
                        <p className="text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/40 group-hover:text-white/40 dark:group-hover:text-black/40 mb-2 transition-colors duration-700">{item.label}</p>
                        <p className="text-2xl font-serif font-light">{item.value}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: editorialEase, delay: 0.2 }}
                  className="relative aspect-square"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                      className="w-full h-full border border-dashed border-black/10 dark:border-white/10 rounded-full flex items-center justify-center"
                    >
                      <div className="w-[80%] h-[80%] border border-dashed border-black/20 dark:border-white/20 rounded-full flex items-center justify-center">
                        <div className="w-[60%] h-[60%] border border-dashed border-black/30 dark:border-white/30 rounded-full flex items-center justify-center">
                          <Sparkles className="w-16 h-16 text-black/20 dark:text-white/20" />
                        </div>
                      </div>
                    </motion.div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-5xl md:text-6xl font-serif font-light text-black dark:text-white mb-2">~0.5s</div>
                        <div className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40">Ultra-Low Latency</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 bg-black text-white relative overflow-hidden scroll-mt-20">
          <div className="bg-grid-white absolute inset-0" />
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: editorialEase }}
                className="text-center mb-20"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">04 / Capabilities</p>
                <h2 className="text-5xl md:text-7xl font-serif font-light leading-[0.9]">
                  Engineered for <em className="italic">connection</em>
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
                {features.map((feature, i) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: editorialEase, delay: i * 0.05 }}
                    className="bg-black p-10 group hover:bg-white hover:text-black transition-all duration-700"
                  >
                    <h3 className="text-2xl font-serif font-light mb-4 group-hover:translate-x-4 transition-transform duration-500">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-white/60 group-hover:text-black/60 leading-relaxed transition-colors duration-700">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Privacy & Security Section */}
        <section className="py-32 bg-white dark:bg-black text-black dark:text-white relative overflow-hidden">
          <div className="bg-grid-black dark:bg-grid-white absolute inset-0" />
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: editorialEase }}
                className="space-y-8"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40">05 / Privacy & Security</p>
                <h2 className="text-5xl md:text-7xl font-serif font-light leading-[0.9]">
                  Secure & <em className="italic">Compliance-Ready</em>
                </h2>
                <p className="text-lg text-black/60 dark:text-white/60 font-light max-w-3xl mx-auto leading-relaxed">
                  End-to-end encryption, consent-first workflows, and data minimization. Designed for GDPR & CCPA workflows with private cloud options.
                </p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: editorialEase, delay: 0.2 }}
                  className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-black/10 dark:border-white/10"
                >
                  {["End-to-End TLS", "SOC2 Type II", "Consent Prompts", "Zero Storage Default"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-black/60 dark:text-white/60">
                      <Shield className="w-4 h-4" />
                      {item}
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 md:py-48 bg-black text-white relative overflow-hidden">
          <div className="bg-grid-white absolute inset-0" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="text-[20vw] font-serif font-light text-white/[0.02] whitespace-nowrap">
              VertoX
            </span>
          </div>
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: editorialEase }}
                className="text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-[0.9] mb-12"
              >
                Sound Like <em className="italic">Yourself</em> in Any Language.
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: editorialEase, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  size="lg"
                  className="rounded-full h-16 px-12 text-sm uppercase tracking-[0.2em] font-medium bg-white text-black hover:bg-white/80 transition-all duration-500 group"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-16 px-12 text-sm uppercase tracking-[0.2em] font-medium border-white/20 hover:bg-white/5 transition-all duration-500 text-white"
                >
                  Request a Demo
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
