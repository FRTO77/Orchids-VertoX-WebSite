"use client"

import { Video, Globe, Zap, Users, Shield, MessageSquare, ArrowRight, CheckCircle2, Sparkles, Mic2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LovableBackground } from "@/components/LovableBackground"
import { motion } from "framer-motion"
import Link from "next/link"

const platforms = [
  { name: "Zoom", logo: "ZM", color: "bg-blue-600" },
  { name: "Google Meet", logo: "GM", color: "bg-green-600" },
  { name: "Teams", logo: "MS", color: "bg-indigo-600" },
  { name: "Webex", logo: "WX", color: "bg-cyan-600" },
  { name: "Slack", logo: "SL", color: "bg-purple-600" },
  { name: "Discord", logo: "DS", color: "bg-slate-700" },
]

export default function OnlineMeetingsPage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <LovableBackground />
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center mb-24"
          >
            <Badge variant="outline" className="mb-6 py-1.5 px-4 bg-primary/10 border-primary/20 text-primary uppercase tracking-widest font-bold">
              Online Solutions
            </Badge>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black mb-8 leading-[0.9]">
              Virtual Meetings, <br />Universal <span className="text-primary italic">Voices.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12 max-w-3xl mx-auto">
              VertoX integrates directly with your favorite video conferencing tools, providing real-time voice translation that sounds exactly like you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-2xl h-16 px-10 text-xl font-bold glow-primary">
                Try for Free
              </Button>
              <Button size="lg" variant="outline" className="rounded-2xl h-16 px-10 text-xl font-bold border-white/20">
                How it Works
              </Button>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-32">
            {platforms.map((p, i) => (
              <motion.div 
                key={p.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="glass p-8 rounded-[32px] border-border/50 flex flex-col items-center justify-center gap-4 group hover:border-primary/50 transition-all"
              >
                <div className={`w-14 h-14 rounded-2xl ${p.color} flex items-center justify-center font-black text-xl shadow-lg transition-transform group-hover:scale-110`}>
                  {p.logo}
                </div>
                <span className="text-sm font-bold tracking-widest uppercase opacity-60">{p.name}</span>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-heading font-black leading-tight">Native-feel <br />integrations.</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                No more clunky browser extensions. VertoX acts as a virtual audio driver, meaning it works natively with any software that uses a microphone.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "Sub-500ms latency",
                  "Vocal fingerprinting",
                  "E2E Encryption",
                  "Speaker diarization",
                  "Auto-captioning",
                  "Multi-lang support"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-bold">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
              <div className="relative glass aspect-[4/3] rounded-[48px] border-primary/20 flex flex-col overflow-hidden">
                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-black tracking-widest uppercase">Live Session</span>
                  </div>
                  <Badge className="bg-primary text-primary-foreground font-bold">English → Mandarin</Badge>
                </div>
                <div className="flex-grow p-8 flex flex-col justify-center gap-8">
                  <div className="space-y-2">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Incoming Audio</div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-sm italic">
                      "We need to finalize the quarterly budget by Friday morning."
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-2 text-right">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Translated Output</div>
                    <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-sm italic text-primary">
                      "我们需要在周五早上之前最终确定季度预算。"
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass p-12 md:p-20 rounded-[60px] border-primary/20 bg-primary/5 text-center"
          >
            <Mic2 className="w-16 h-16 text-primary mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Host your first global meeting.</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Ready to see the difference VertoX can make? Start your 14-day free trial and connect with your global team today.
            </p>
            <Button size="lg" className="rounded-2xl px-12 h-16 text-xl font-bold glow-primary">Download for Desktop</Button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
