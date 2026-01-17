"use client"

import Image from "next/image"
import Link from "next/link"
import { Video, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

const editorialEase = [0.22, 1, 0.36, 1]

const platforms = [
  { name: "Zoom", abbr: "ZM" },
  { name: "Google Meet", abbr: "GM" },
  { name: "Teams", abbr: "MS" },
  { name: "Webex", abbr: "WX" },
  { name: "Slack", abbr: "SL" },
  { name: "Discord", abbr: "DS" },
]

const features = [
  "Sub-500ms latency",
  "Vocal fingerprinting",
  "E2E Encryption",
  "Speaker diarization",
  "Auto-captioning",
  "Multi-lang support"
]

export default function OnlineMeetingsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black">
      <div className="grain" />
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: editorialEase }}
            className="text-center mb-20"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-6">Online Meetings</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-[0.85] mb-8">
              Virtual meetings, <em className="italic">universal</em> voices
            </h1>
            <p className="text-lg text-black/60 dark:text-white/60 font-light max-w-2xl mx-auto mb-12">
              VertoX integrates directly with your favorite video conferencing tools, providing real-time voice translation that sounds exactly like you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button className="rounded-full h-14 px-10 text-sm uppercase tracking-[0.2em] font-medium bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80 transition-all duration-500">
                  Try for Free
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-px bg-black/10 dark:bg-white/10 mb-24">
            {platforms.map((p, i) => (
              <motion.div 
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: editorialEase, delay: i * 0.05 }}
                className="bg-white dark:bg-black p-6 md:p-8 flex flex-col items-center justify-center gap-3 group hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-700"
              >
                <span className="text-2xl font-serif font-light">{p.abbr}</span>
                <span className="text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/40 group-hover:text-white/40 dark:group-hover:text-black/40 transition-colors duration-700">{p.name}</span>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-black/10 dark:bg-white/10 mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: editorialEase }}
              className="bg-white dark:bg-black p-12 md:p-16"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-4">Integration</p>
              <h2 className="text-4xl md:text-5xl font-serif font-light leading-[0.9] mb-6">
                Native-feel <em className="italic">integrations</em>
              </h2>
              <p className="text-black/60 dark:text-white/60 font-light leading-relaxed mb-10">
                No more clunky browser extensions. VertoX acts as a virtual audio driver, meaning it works natively with any software that uses a microphone.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {features.map((item, i) => (
                  <motion.div 
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: editorialEase, delay: i * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-black/40 dark:text-white/40" />
                    <span className="text-sm font-light">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: editorialEase, delay: 0.2 }}
              className="bg-black dark:bg-white text-white dark:text-black p-12 md:p-16"
            >
              <div className="border border-white/10 dark:border-black/10 p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs uppercase tracking-[0.2em] text-white/40 dark:text-black/40">Live Session</span>
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em]">EN → ZH</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40 dark:text-black/40 mb-2">Input</p>
                    <p className="text-sm font-light italic">"We need to finalize the quarterly budget by Friday morning."</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40 dark:text-black/40 mb-2">Output</p>
                    <p className="text-sm font-light italic">"我们需要在周五早上之前最终确定季度预算。"</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-xs uppercase tracking-[0.2em] text-white/40 dark:text-black/40">
                <span>Latency: ~0.4s</span>
                <span>Confidence: 98%</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: editorialEase }}
            className="bg-black dark:bg-white text-white dark:text-black p-12 md:p-20 text-center"
          >
            <Video className="w-12 h-12 mx-auto mb-8 text-white/40 dark:text-black/40" />
            <h2 className="text-4xl md:text-5xl font-serif font-light leading-[0.9] mb-6">
              Host your first <em className="italic">global</em> meeting
            </h2>
            <p className="text-white/60 dark:text-black/60 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
              Start your 14-day free trial and connect with your global team today.
            </p>
            <Link href="/download">
              <Button className="rounded-full h-16 px-12 text-sm uppercase tracking-[0.2em] font-medium bg-white text-black hover:bg-white/90 dark:bg-black dark:text-white dark:hover:bg-black/90 transition-all duration-500">
                Download for Desktop
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
