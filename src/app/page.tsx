"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Globe,
  Zap,
  Shield,
  Mic2,
  CheckCircle2,
  Play,
  Lock,
  Sparkles,
  Code,
  Cpu,
  Volume2,
  Layers,
  Monitor } from
"lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LovableBackground } from "@/components/LovableBackground";
import { SolutionsShowcase } from "@/components/solutions-showcase";
import { VideoDialog } from "@/components/video-dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger } from
"@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const features = [
{
  title: "True Voice Preservation",
  description: "Translate words while keeping the original speaker’s timbre, pitch and emotion.",
  icon: Mic2,
  color: "text-blue-500"
},
{
  title: "Real-Time, Low Latency",
  description: "End-to-end latency ~0.5s for live calls and events (typical conditions).",
  icon: Zap,
  color: "text-purple-500"
},
{
  title: "Multi-Language Support",
  description: "Native support for 25+ languages at launch, with continuous expansion.",
  icon: Globe,
  color: "text-green-500"
},
{
  title: "Web + Desktop Clients",
  description: "Web app for instant joining and a desktop app for advanced audio routing.",
  icon: Monitor,
  color: "text-orange-500"
},
{
  title: "Multi-Party & Broadcast",
  description: "Host multilingual meetings (1:N and N:N), live streams, and conference audio.",
  icon: Layers,
  color: "text-red-500"
},
{
  title: "Secure & Compliance-Ready",
  description: "End-to-end encryption, role-based consent, and GDPR/CCPA-friendly privacy.",
  icon: Shield,
  color: "text-cyan-500"
}];


const languages = [
"English", "Russian", "Spanish", "Kazakh", "Uzbek", "German",
"French", "Mandarin", "Japanese", "Portuguese", "Italian", "Korean",
"Arabic", "Hindi", "Turkish", "Dutch", "Polish", "Vietnamese"];


const faqs = [
{
  question: "How accurate is VertoX’s translation?",
  answer: "VertoX uses state-of-the-art speech recognition + neural translation models and voice-preserving synthesis. Accuracy depends on audio quality and domain — typical conversational accuracy rivals human interpreters for common business speech. We provide domain adaptation for specialized vocabularies."
},
{
  question: "Which languages do you support?",
  answer: "We support 25+ languages at launch (major European, Asian and Middle Eastern languages). We are adding new languages monthly and provide priority language support for enterprise customers."
},
{
  question: "What is the latency? Will it feel natural in meetings?",
  answer: "Typical end-to-end latency is ~0.5 seconds under good network conditions, delivering a natural, near-real-time experience for meetings and events."
},
{
  question: "How do you protect privacy and consent?",
  answer: "Audio processing is encrypted in transit; voice cloning and storage require explicit participant consent. By default, audio is transient and not stored. Enterprises can enable encrypted retention with role-based access and DPA support."
},
{
  question: "Does VertoX work with my conferencing tools?",
  answer: "Yes — VertoX supports web meetings and desktop integration for Zoom, Microsoft Teams, SIP systems and WebRTC. We also offer APIs/SDKs for custom integrations and platform partners."
}];


export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden relative">
      <LovableBackground />
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
              <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-purple-500/20 rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />
            </div>
          </div>

          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              style={{ opacity, scale }}
              className="flex flex-col items-center text-center max-w-4xl mx-auto">

                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black tracking-tight mb-8 leading-[0.9]">
                    <span className="text-white italic">Be yourself in any language</span>
                  </h1>
                <p className="text-xl md:text-2xl text-zinc-300 mb-10 max-w-2xl leading-relaxed">
                  Translate live conversations, calls and events instantly — preserving speaker identity, tone and intent. Available on web and desktop with ultra-low latency and enterprise security.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <Link href="/signup">
                    <motion.div whileTap={{ scale: 0.95 }}>
                      <Button size="lg" className="rounded-full h-14 px-8 text-lg font-bold w-full sm:w-auto glow-primary">Get Started
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </motion.div>
                  </Link>
                <Link href="/contact">
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg font-bold w-full sm:w-auto">
                      Request a Demo
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Demo Video Section */}
        <section id="demo" className="py-24 relative overflow-hidden scroll-mt-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 text-primary border-primary/30">Experience VertoX</Badge>
                <h2 className="text-4xl md:text-6xl font-heading font-black mb-6 text-white">See it in Action</h2>
                <p className="text-xl text-zinc-300 max-w-2xl mx-auto">VertoX is a real-time voice translation platform for meetings, events and support. It translates spoken language while preserving the original speaker's voice, tone and emotional cues.</p>
              </div>

              <VideoDialog
                trigger={
                <div className="relative aspect-video rounded-[48px] overflow-hidden border border-white/10 bg-black shadow-2xl group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-[0_0_50px_rgba(var(--primary),0.5)] group-hover:scale-110 transition-transform">
                        <Play className="w-10 h-10 text-primary-foreground fill-current" />
                      </div>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8 z-20 flex justify-between items-end">
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Badge className="bg-primary/20 text-primary border-primary/30">Live Demo</Badge>
                          <Badge variant="outline" className="text-white border-white/20">4:20</Badge>
                        </div>
                        <h3 className="text-2xl font-bold text-white">Global Event: English to Multilingual</h3>
                      </div>
                      <div className="hidden md:flex gap-4">
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Typical Accuracy</span>
                          <span className="text-xl font-black text-primary">Human-Level</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Latency</span>
                          <span className="text-xl font-black text-primary">~0.5s</span>
                        </div>
                      </div>
                    </div>
                    {/* Mock Video UI */}
                    <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-30">
                      <div className="max-w-md w-full p-8 glass rounded-3xl border-primary/20 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                          <Sparkles className="w-5 h-5 text-primary" />
                          <span className="font-bold uppercase tracking-widest text-xs">Core Capabilities</span>
                        </div>
                        <div className="space-y-4">
                          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-primary/10 hover:border-primary/30 transition-all">
                            <p className="font-bold text-sm">"True Voice Preservation"</p>
                            <p className="text-xs text-muted-foreground mt-1">Translate words while keeping the original speaker’s timbre and emotion.</p>
                          </div>
                          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-primary/10 hover:border-primary/30 transition-all">
                            <p className="font-bold text-sm">"Real-Time, Low Latency"</p>
                            <p className="text-xs text-muted-foreground mt-1">End-to-end latency ~0.5s for live calls and events.</p>
                          </div>
                        </div>
                        <div className="w-full">
                          <motion.div whileTap={{ scale: 0.98 }}>
                            <Button className="w-full rounded-2xl font-bold">Watch Full Presentation</Button>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                } />

            </div>
          </div>
        </section>

        {/* How VertoX Works - Visual Pipeline */}
        <section id="features" className="py-24 relative overflow-hidden bg-black/60 backdrop-blur-3xl border-y border-white/10 scroll-mt-20">
          <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
            <div className="mb-16">
              <Badge variant="outline" className="mb-4 text-primary border-primary/30">Process Flow</Badge>
              <h2 className="text-4xl md:text-6xl font-heading font-black mb-6 text-white">How the Web App Works</h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">Speak in your language. Sound like yourself. Instant voice translation — same voice, same feeling.</p>
            </div>

            <div className="relative max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                {/* Connecting lines for desktop */}
                <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-primary/30 -translate-y-1/2 -z-10" />
                
                {[
                {
                  icon: Globe,
                  title: "Join Room",
                  desc: "Join a room from your browser (no install required).",
                  step: 1
                },
                {
                  icon: Mic2,
                  title: "Grant Access",
                  desc: "Grant mic access and optionally select a voice-preservation profile.",
                  step: 2
                },
                {
                  icon: Cpu,
                  title: "Capture & Translate",
                  desc: "VertoX captures audio, translates on the fly, and streams to listeners.",
                  step: 3
                },
                {
                  icon: Volume2,
                  title: "Preserved Output",
                  desc: "Listeners hear translation in their language with your voice identity.",
                  step: 4
                }].
                map((item, idx) =>
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  className="flex flex-col items-center group">

                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="w-20 h-20 rounded-full bg-zinc-900 border border-primary/30 flex items-center justify-center relative z-10 shadow-2xl">
                        <item.icon className="w-8 h-8 text-primary" />
                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                          {item.step}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                )}
              </div>

              {/* Visual Demo Pipeline */}
              <div className="mt-20 p-8 md:p-12 rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden relative shadow-2xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 relative z-10">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center">
                      <Mic2 className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">Original Voice</span>
                  </div>

                  <div className="flex-grow flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3], x: [0, 20, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="hidden md:flex gap-1">

                      {[1, 2, 3].map((i) => <div key={i} className="w-2 h-0.5 bg-primary/40 rounded-full" />)}
                    </motion.div>
                    <div className="px-6 py-3 rounded-2xl bg-primary/20 border border-primary/30 flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <span className="text-xs font-black uppercase tracking-widest text-white">Voice Preservation</span>
                    </div>
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3], x: [0, 20, 0] }}
                      transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                      className="hidden md:flex gap-1">

                      {[1, 2, 3].map((i) => <div key={i} className="w-2 h-0.5 bg-primary/40 rounded-full" />)}
                    </motion.div>
                  </div>

                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary">
                      <Volume2 className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest text-primary">Translated Identity</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-shimmer" />
              </div>
            </div>
          </div>
        </section>

        {/* Voice Cloning Detailed Section */}
        <section className="py-24 bg-transparent relative overflow-hidden border-y border-white/5">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-16 items-center">
                <div className="flex-1 space-y-8">
                  <div className="space-y-4">
                    <Badge variant="outline" className="text-primary border-primary/30">Preserve Identity</Badge>
                    <h2 className="text-5xl md:text-7xl font-heading font-black leading-tight tracking-tighter text-white">Global Conversation, <br />Local Voice.</h2>
                  </div>
                  <p className="text-xl text-zinc-300 leading-relaxed max-w-xl">
                    VertoX translates spoken language into audience audio while preserving the original speaker's timbre, tone and emotional cues.
                  </p>
                  
                  <div className="grid grid-cols-1 gap-8 mt-12">
                    {[
                    { step: 1, title: "Instant Join", desc: "Join via browser link with no installation required for participants." },
                    { step: 2, title: "Language Control", desc: "On-page controls for selecting target language, volume and tone." },
                    { step: 3, title: "Low Latency Output", desc: "Listeners hear translation in under ~0.5 seconds with voice identity." }].
                    map((item, idx) =>
                    <div key={idx} className="flex gap-6 items-start group">
                        <div className="w-12 h-12 rounded-full bg-card border border-border group-hover:border-primary group-hover:bg-primary/10 transition-all flex-shrink-0 flex items-center justify-center font-black text-xl">
                          {item.step}
                        </div>
                        <div>
                          <h4 className="font-bold text-xl mb-1 text-white group-hover:text-primary transition-colors">{item.title}</h4>
                          <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex-1 w-full max-w-xl relative">
                  <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full animate-pulse" />
                  <div className="relative glass p-8 md:p-12 rounded-[48px] border-white/10 shadow-2xl">
                    <div className="flex flex-col gap-8">
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Status</span>
                          <span className="text-sm font-bold uppercase tracking-widest">Voice Synthesis</span>
                        </div>
                        <Badge className="bg-green-500/10 text-green-400 hover:bg-green-500/20 border-green-500/20 px-3 py-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-2 animate-pulse" />
                          Preserving Tone
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                          <span>Processing Speed</span>
                          <span>~0.5s Latency</span>
                        </div>
                        <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
                          <motion.div
                            initial={{ width: "0%" }}
                            whileInView={{ width: "98%" }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-primary rounded-full" />

                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 text-center group hover:bg-white/10 transition-colors">
                          <div className="text-xs text-muted-foreground mb-2 font-bold uppercase tracking-widest">Identity Match</div>
                          <div className="text-3xl font-black text-primary">High Fidelity</div>
                        </div>
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 text-center group hover:bg-white/10 transition-colors">
                          <div className="text-xs text-muted-foreground mb-2 font-bold uppercase tracking-widest">Emotion</div>
                          <div className="text-3xl font-black italic">Preserved</div>
                        </div>
                      </div>

                      <Link href="/signup" className="w-full">
                        <motion.div whileTap={{ scale: 0.98 }}>
                          <Button className="w-full rounded-3xl py-8 text-lg font-bold flex gap-3 glow-primary">
                            <Sparkles className="ml-2 w-5 h-5" />
                            Get Started
                          </Button>
                        </motion.div>
                      </Link>
                      
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground font-medium italic">"Speak in your language. Sound like yourself."</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Snapshot Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="glass rounded-[48px] p-8 md:p-16 border-white/5 bg-white/5 backdrop-blur-md flex flex-col lg:flex-row gap-16 items-center">
              <div className="flex-1 space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
                  <Cpu className="w-4 h-4" />
                  Technical Snapshot
                </div>
                <h2 className="text-4xl md:text-6xl font-heading font-black leading-tight text-white">Built for <br /><span className="text-primary">Global Scale</span></h2>
                <p className="text-xl text-zinc-300 leading-relaxed">
                  Wideband audio, voice-preserving synthesis with configurable emotion and tone. SLA options available for Enterprise.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                  "Typical latency ~0.5s",
                  "25+ languages native",
                  "Wideband audio quality",
                  "Auto-scaling for events"].
                  map((item, i) =>
                  <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span className="font-bold text-sm uppercase tracking-wide text-white">{item}</span>
                    </div>
                  )}
                </div>
                <Link href="/signup">
                  <motion.div whileTap={{ scale: 0.98 }}>
                    <Button size="lg" variant="outline" className="rounded-full h-14 px-8 font-bold border-white/10 hover:bg-white/5">
                      Get Started <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </motion.div>
                </Link>
              </div>

              <div className="flex-1 w-full max-w-xl">
                <div className="rounded-3xl border border-white/10 bg-black/40 overflow-hidden shadow-2xl">
                  <div className="bg-white/5 px-6 py-3 border-b border-white/10 flex items-center justify-between">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">vertox-specs.json</div>
                    <div className="w-4" />
                  </div>
                  <div className="p-6 md:p-8 font-mono text-sm leading-relaxed overflow-x-auto text-zinc-300">
                    <pre>
                      {`{
  "latency": "~0.5 seconds",
  "audio_quality": "Wideband",
  "languages": "25+ supported",
  "synthesis": "Voice-preserving",
  "integrations": [
    "Zoom", "Teams", "SIP", 
    "WebRTC", "API/SDK"
  ],
  "security": "End-to-end TLS"
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 border-y border-white/5 bg-transparent">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center gap-12">
              <div className="text-center space-y-4">
                <Badge variant="outline" className="text-primary border-primary/30">Core Capabilities</Badge>
                <h2 className="text-3xl md:text-5xl font-heading font-black text-center text-white">Engineered for Human Connection</h2>
                <p className="text-zinc-400 max-w-xl mx-auto">VertoX provides the tools for teams and audiences to speak and understand each other instantly.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {features.map((feature, i) =>
                <div key={i} className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm group hover:border-primary/30 transition-all">
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-white/5 border border-white/10 group-hover:border-primary/20", feature.color)}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Showcase */}
        <div id="solutions" className="scroll-mt-20">
          <SolutionsShowcase />
        </div>

        {/* Security & Privacy */}
        <section className="py-24 relative overflow-hidden bg-transparent">
          <div className="container mx-auto px-4 md:px-6">
            <div className="relative glass rounded-[64px] p-12 md:p-24 overflow-hidden border-primary/10">
              <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12">
                <Shield className="w-96 h-96 text-primary" />
              </div>
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest">
                    <Lock className="w-4 h-4" />
                    Privacy & Security
                  </div>
                  <h2 className="text-5xl md:text-7xl font-heading font-black leading-tight tracking-tighter text-white">Enterprise-grade <span className="text-primary">data protection.</span></h2>
                  <p className="text-xl text-zinc-300 leading-relaxed">
                    Default flows use transient audio processing without persistent storage. Participants are prompted for consent before any voice cloning.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                    {[
                    { icon: Shield, title: "End-to-End Encryption" },
                    { icon: CheckCircle2, title: "GDPR & CCPA Friendly" },
                    { icon: Lock, title: "Consent-First Workflow" },
                    { icon: CheckCircle2, title: "Private Cloud Options" }].
                    map((item, i) =>
                    <div key={i} className="flex gap-3 items-center">
                        <item.icon className="text-primary w-5 h-5" />
                        <span className="font-bold text-sm uppercase tracking-widest text-white">{item.title}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="hidden lg:flex items-center justify-center">
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                      className="w-80 h-80 rounded-full border border-dashed border-primary/20 flex items-center justify-center">

                      <div className="w-64 h-64 rounded-full border border-dashed border-primary/30 flex items-center justify-center" />
                    </motion.div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-[32px] bg-primary flex items-center justify-center shadow-[0_0_50px_rgba(var(--primary),0.5)]">
                        <Shield className="w-16 h-16 text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 scroll-mt-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <Badge variant="outline" className="mb-4 text-primary border-primary/30">Support</Badge>
                <h2 className="text-4xl md:text-6xl font-heading font-black mb-6 text-white">Common Questions</h2>
              </div>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, i) =>
                <AccordionItem key={i} value={`item-${i}`} className="border rounded-[32px] px-8 py-2 bg-card/50 backdrop-blur-xl border-white/5 hover:border-primary/30 transition-all">
                    <AccordionTrigger className="text-xl font-bold hover:no-underline text-white">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-zinc-400 text-lg leading-relaxed pt-2 pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-[150%] bg-primary/20 rounded-full blur-[180px]" />
          </div>
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto glass p-12 md:p-24 rounded-[80px] border-primary/20 shadow-2xl bg-black/40">
              <h2 className="text-5xl md:text-8xl font-heading font-black mb-10 leading-[0.9] tracking-tighter text-white">Ready to break the <br />language barrier?</h2>
              <p className="text-2xl text-zinc-300 mb-12 max-w-2xl leading-relaxed">
                Speak in your language. Sound like yourself. VertoX preserves human identity in translation for meetings and events.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                <Link href="/signup">
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="rounded-full h-20 px-12 text-2xl font-black w-full sm:w-auto glow-primary">
                      Get Started
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/contact">
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Button size="lg" variant="outline" className="rounded-full h-20 px-12 text-2xl font-black w-full sm:w-auto border-white/10">
                      Request Enterprise Demo
                    </Button>
                  </motion.div>
                </Link>
              </div>
              <div className="mt-16 flex flex-wrap justify-center items-center gap-10">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  <span className="text-sm font-bold uppercase tracking-widest text-white">Speak in your language</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  <span className="text-sm font-bold uppercase tracking-widest text-white">Sound like yourself</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  <span className="text-sm font-bold uppercase tracking-widest text-white">Global conversation</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>);
}
