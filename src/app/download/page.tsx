"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Apple, Monitor, Terminal, Globe, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const editorialEase = [0.22, 1, 0.36, 1]

const platforms = [
  { 
    name: "macOS", 
    icon: Apple, 
    version: "v2.5.2", 
    size: "88MB", 
    type: "Universal (M1/M2/Intel)",
    desc: "Optimized for Apple Silicon with native neural engine support."
  },
  { 
    name: "Windows", 
    icon: Monitor, 
    version: "v2.5.2", 
    size: "96MB", 
    type: "Windows 10/11 (64-bit)",
    desc: "High-performance client with ASIO audio driver support."
  },
  { 
    name: "Linux", 
    icon: Terminal, 
    version: "v2.5.2", 
    size: "72MB", 
    type: "AppImage / Deb / RPM",
    desc: "Native Linux client with full support for Wayland and X11."
  },
]

export default function DownloadPage() {
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
            <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-6">Download</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-[0.85] mb-8">
              Access <em className="italic">anywhere</em>
            </h1>
            <p className="text-lg text-black/60 dark:text-white/60 font-light max-w-2xl mx-auto">
              Native high-performance clients optimized for minimal latency and maximum privacy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 dark:bg-white/10 mb-24">
            {platforms.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: editorialEase, delay: i * 0.1 }}
                className="bg-white dark:bg-black p-10 md:p-12 group hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-700 flex flex-col h-full"
              >
                <div className="flex items-center justify-between mb-8">
                  <p.icon className="w-8 h-8" />
                  <span className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 group-hover:text-white/40 dark:group-hover:text-black/40 transition-colors duration-700">
                    {p.version}
                  </span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-serif font-light mb-4">{p.name}</h3>
                <p className="text-sm text-black/60 dark:text-white/60 group-hover:text-white/60 dark:group-hover:text-black/60 font-light leading-relaxed mb-6 transition-colors duration-700 flex-grow">
                  {p.desc}
                </p>

                <div className="space-y-3 mb-8 py-6 border-t border-b border-black/10 dark:border-white/10 group-hover:border-white/10 dark:group-hover:border-black/10 transition-colors duration-700">
                  <div className="flex justify-between text-xs">
                    <span className="uppercase tracking-[0.2em] text-black/40 dark:text-white/40 group-hover:text-white/40 dark:group-hover:text-black/40 transition-colors duration-700">Size</span>
                    <span>{p.size}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="uppercase tracking-[0.2em] text-black/40 dark:text-white/40 group-hover:text-white/40 dark:group-hover:text-black/40 transition-colors duration-700">Target</span>
                    <span>{p.type}</span>
                  </div>
                </div>

                <Button className="w-full rounded-full h-14 text-sm uppercase tracking-[0.2em] font-medium bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80 group-hover:bg-white group-hover:text-black dark:group-hover:bg-black dark:group-hover:text-white transition-all duration-500">
                  Download
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-black/10 dark:bg-white/10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: editorialEase }}
              className="bg-black dark:bg-white text-white dark:text-black p-12 md:p-16"
            >
              <Globe className="w-8 h-8 mb-8" />
              <p className="text-xs uppercase tracking-[0.3em] text-white/40 dark:text-black/40 mb-4">Browser Extension</p>
              <h2 className="text-4xl md:text-5xl font-serif font-light leading-[0.9] mb-6">
                VertoX for <em className="italic">Browser</em>
              </h2>
              <p className="text-white/60 dark:text-black/60 font-light leading-relaxed mb-8">
                Real-time captions and neural translation directly in any web-based meeting platform.
              </p>
              <Button className="rounded-full h-14 px-10 text-sm uppercase tracking-[0.2em] font-medium bg-white text-black hover:bg-white/90 dark:bg-black dark:text-white dark:hover:bg-black/90 transition-all duration-500">
                Add to Chrome
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: editorialEase, delay: 0.2 }}
              className="bg-white dark:bg-black p-12 md:p-16"
            >
              <Terminal className="w-8 h-8 mb-8" />
              <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-4">CLI Engine</p>
              <h2 className="text-4xl md:text-5xl font-serif font-light leading-[0.9] mb-6">
                VertoX <em className="italic">Core</em>
              </h2>
              <p className="text-black/60 dark:text-white/60 font-light leading-relaxed mb-8">
                High-performance command line interface for headless translation and batch processing.
              </p>
              <Button variant="outline" className="rounded-full h-14 px-10 text-sm uppercase tracking-[0.2em] font-medium border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-500 font-mono">
                npm install vertox
              </Button>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
