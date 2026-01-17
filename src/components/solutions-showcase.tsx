"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, CheckCircle2, Globe, Building2, Stethoscope, Mic2 } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const solutions = [
  {
    id: "enterprises",
    num: "01",
    title: "Global Enterprises",
    icon: Building2,
    description: "Distributed teams benefit from faster global collaboration and consistent brand voice.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070",
  },
  {
    id: "events",
    num: "02",
    title: "Events & Conferences",
    icon: Globe,
    description: "Real-time human-level experience delivered to global audiences at scale.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=2070",
  },
  {
    id: "support",
    num: "03",
    title: "Contact Centers",
    icon: Mic2,
    description: "Real-time multilingual support with reduced translation overhead.",
    image: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&q=80&w=2070",
  },
  {
    id: "healthcare",
    num: "04",
    title: "Healthcare",
    icon: Stethoscope,
    description: "Telemedicine with explicit consent and compliance controls.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2070",
  },
]

const editorialEase = [0.22, 1, 0.36, 1]

export function SolutionsShowcase() {
  const [activeTab, setActiveTab] = useState(solutions[0].id)
  const activeSolution = solutions.find((s) => s.id === activeTab) || solutions[0]

  return (
    <section className="py-32 bg-black text-white relative overflow-hidden">
      <div className="bg-grid-white absolute inset-0" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: editorialEase }}
            className="mb-20"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">
              Target Customers
            </p>
            <h2 className="text-5xl md:text-7xl font-serif font-light leading-[0.9]">
              Who benefits <em className="italic">most</em>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-4 space-y-0">
              {solutions.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: editorialEase, delay: i * 0.1 }}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full text-left py-6 border-b border-white/10 transition-all duration-500 group",
                    activeTab === item.id ? "text-white" : "text-white/40 hover:text-white/70"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <span className="text-xs uppercase tracking-[0.3em]">{item.num}</span>
                      <span className="text-2xl md:text-3xl font-serif font-light group-hover:translate-x-2 transition-transform duration-500">
                        {item.title}
                      </span>
                    </div>
                    {activeTab === item.id && (
                      <motion.div layoutId="arrow-indicator">
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Content Area */}
            <div className="lg:col-span-8">
              <div className="relative aspect-[4/3] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.7, ease: editorialEase }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeSolution.image}
                      alt={activeSolution.title}
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: editorialEase }}
                    >
                      <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">
                        {activeSolution.num} / {activeSolution.title}
                      </p>
                      <h3 className="text-2xl md:text-4xl font-serif font-light leading-tight mb-6">
                        {activeSolution.description}
                      </h3>
                      <div className="flex flex-wrap gap-6">
                        {["Voice Preservation", "Real-Time", "Secure"].map((tag) => (
                          <div key={tag} className="flex items-center gap-2 text-white/60">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="text-sm font-light">{tag}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
