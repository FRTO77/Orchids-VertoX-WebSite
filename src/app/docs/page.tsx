"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Search, ChevronRight, Book, Code, Rocket, Shield, Terminal, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const editorialEase = [0.22, 1, 0.36, 1]

const categories = [
  { 
    title: "Getting Started", 
    icon: Rocket, 
    items: ["Quick Start Guide", "System Requirements", "Installation", "Core Concepts"], 
    desc: "Begin your journey into the VertoX ecosystem",
    num: "01"
  },
  { 
    title: "Voice Cloning", 
    icon: Book, 
    items: ["Recording Samples", "Optimization", "Vocal Identity", "Ethical Usage"], 
    desc: "Master neural voice synthesis",
    num: "02"
  },
  { 
    title: "API Reference", 
    icon: Code, 
    items: ["Authentication", "Endpoints", "Webhooks", "SDKs & Libraries"], 
    desc: "Deep technical documentation",
    num: "03"
  },
  { 
    title: "Security", 
    icon: Shield, 
    items: ["Data Privacy", "Encryption", "Compliance", "Access Control"], 
    desc: "Zero-trust architecture explained",
    num: "04"
  },
]

export default function DocsPage() {
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
            className="max-w-4xl mx-auto text-center mb-20"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-6">Documentation</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-[0.85] mb-8">
              Learn <em className="italic">everything</em>
            </h1>
            <p className="text-lg text-black/60 dark:text-white/60 font-light mb-12 max-w-2xl mx-auto">
              Comprehensive guides, API references, and resources to help you integrate VertoX.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: editorialEase, delay: 0.2 }}
              className="relative max-w-xl mx-auto"
            >
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40 dark:text-white/40" />
              <Input 
                className="pl-14 h-16 rounded-full bg-transparent border-black/10 dark:border-white/10 text-lg font-light focus:border-black/30 dark:focus:border-white/30 transition-colors" 
                placeholder="Search documentation..." 
              />
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10 dark:bg-white/10 mb-24">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: editorialEase, delay: i * 0.1 }}
                className="bg-white dark:bg-black p-10 md:p-12 group hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-700"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 group-hover:text-white/40 dark:group-hover:text-black/40 mb-6 transition-colors duration-700">
                  {cat.num} / {cat.desc}
                </p>
                <h3 className="text-3xl md:text-4xl font-serif font-light mb-8">{cat.title}</h3>
                <ul className="space-y-4">
                  {cat.items.map((item) => (
                    <li key={item}>
                      <Link 
                        href="#" 
                        className="flex items-center justify-between py-3 border-b border-black/10 dark:border-white/10 group-hover:border-white/10 dark:group-hover:border-black/10 transition-colors duration-700 hover:pl-2"
                      >
                        <span className="text-sm font-light">{item}</span>
                        <ChevronRight className="w-4 h-4 text-black/40 dark:text-white/40 group-hover:text-white/40 dark:group-hover:text-black/40 transition-colors duration-700" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: editorialEase }}
            className="bg-black dark:bg-white text-white dark:text-black p-12 md:p-20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/40 dark:text-black/40 mb-4">Developer Tools</p>
                <h2 className="text-4xl md:text-5xl font-serif font-light leading-[0.9] mb-6">
                  API <em className="italic">Playground</em>
                </h2>
                <p className="text-white/60 dark:text-black/60 font-light leading-relaxed mb-8">
                  Test translation streams and voice cloning in real-time with our interactive developer console.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="rounded-full h-14 px-10 text-sm uppercase tracking-[0.2em] font-medium bg-white text-black hover:bg-white/90 dark:bg-black dark:text-white dark:hover:bg-black/90 transition-all duration-500">
                    Launch Studio
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="border border-white/10 dark:border-black/10 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Terminal className="w-5 h-5 text-white/40 dark:text-black/40" />
                  <span className="text-xs uppercase tracking-[0.3em] text-white/40 dark:text-black/40">Terminal</span>
                </div>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex gap-3"><span className="text-white/40 dark:text-black/40">$</span> <span>vertox login</span></div>
                  <div className="flex gap-3 text-white/60 dark:text-black/60"><span className="text-white/40 dark:text-black/40">$</span> <span>Success! Connected</span></div>
                  <div className="flex gap-3"><span className="text-white/40 dark:text-black/40">$</span> <span>vertox stream --lang kazakh</span></div>
                  <div className="flex gap-3 text-white/40 dark:text-black/40"><span>$</span> <span>Listening for audio...</span></div>
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
