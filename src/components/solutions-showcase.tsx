"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, CheckCircle2, Globe, Building2, Stethoscope, GraduationCap, Mic2 } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

function ShowcaseBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border", className)}>
      {children}
    </span>
  )
}

const solutions = [
    {
      id: "enterprises",
      title: "Global Enterprises",
      icon: Building2,
      description: "Distributed teams (sales, support, R&D) benefit from faster global collaboration and consistent brand voice.",
      variants: [
        { id: "sales", title: "Sales & Support", description: "Empower distributed teams to close deals and support customers globally.", image: "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=2070" },
        { id: "collaboration", title: "Global Collaboration", description: "Faster collaboration across R&D and international offices.", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=2070" }
      ],
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070"
    },
    {
      id: "events",
      title: "Events & Conferences",
      icon: Globe,
      description: "Conference organizers and event producers delivering real-time human-level experience to global audiences.",
      variants: [
        { id: "broadcast", title: "Live Broadcasts", description: "Stream translated audio to listeners' devices with low latency.", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=2070" },
        { id: "multilingual", title: "Multilingual Meetings", description: "Host meetings where everyone feels like themselves in any language.", image: "https://images.unsplash.com/photo-1540575861501-7c90b707a27b?auto=format&fit=crop&q=80&w=2070" }
      ],
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2070"
    },
    {
      id: "support",
      title: "Contact Centers",
      icon: Mic2,
      description: "Contact centers and support desks providing real-time multilingual support with reduced translation overhead.",
      variants: [
        { id: "real-time", title: "Real-time Support", description: "Instant voice translation for customer service across 25+ languages.", image: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&q=80&w=2070" },
        { id: "integration", title: "CRM Integration", description: "Integrates with existing UCaaS and CRM tools for seamless workflows.", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=2070" }
      ],
      image: "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=2070"
    },
    {
      id: "healthcare",
      title: "Healthcare",
      icon: Stethoscope,
      description: "Healthcare and telemedicine with explicit consent and compliance controls for regulated industries.",
      variants: [
        { id: "compliance", title: "Compliance Controls", description: "Designed for GDPR & CCPA workflows with enterprise security.", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2070" },
        { id: "telemedicine", title: "Telemedicine", description: "Privacy-focused communication for doctors and patients globally.", image: "https://images.unsplash.com/photo-1584432830661-3c586e4a652f?auto=format&fit=crop&q=80&w=2070" }
      ],
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=2070"
    }
]

export function SolutionsShowcase() {
  const [activeTab, setActiveTab] = useState(solutions[0].id)
  const [activeVariant, setActiveVariant] = useState(solutions[0].variants[0].id)

  const activeSolution = solutions.find(s => s.id === activeTab) || solutions[0]
  const variantData = activeSolution.variants.find(v => v.id === activeVariant) || activeSolution.variants[0]

  return (
    <section className="py-24 bg-black overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-12">
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-primary font-bold tracking-widest uppercase text-sm"
            >
              Target Customers
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-heading font-black text-white leading-tight"
            >
              Who Benefits <br />
              <span className="text-primary italic">Most</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-4 space-y-2">
              {solutions.map((item) => (
                <div key={item.id} className="space-y-2">
                  <button
                    onClick={() => {
                      setActiveTab(item.id)
                      setActiveVariant(item.variants[0].id)
                    }}
                    className={cn(
                      "w-full text-left p-6 rounded-3xl transition-all duration-500 group relative overflow-hidden",
                      activeTab === item.id 
                        ? "bg-white/10 text-white" 
                        : "text-white/40 hover:text-white/70"
                    )}
                  >
                    <div className="flex items-center gap-4 relative z-10">
                      <item.icon className={cn(
                        "w-6 h-6 transition-colors duration-500",
                        activeTab === item.id ? "text-primary" : "text-white/20"
                      )} />
                      <span className="text-2xl font-bold tracking-tight">{item.title}</span>
                      {activeTab === item.id && (
                        <motion.div 
                          layoutId="arrow"
                          className="ml-auto"
                        >
                          <ArrowRight className="w-6 h-6 text-primary" />
                        </motion.div>
                      )}
                    </div>
                    {activeTab === item.id && (
                      <motion.div 
                        layoutId="active-bg"
                        className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"
                      />
                    )}
                  </button>

                  {/* Nested Variants */}
                  <AnimatePresence mode="wait">
                    {activeTab === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pl-12 space-y-1 overflow-hidden"
                      >
                        {item.variants.map((variant) => (
                          <button
                            key={variant.id}
                            onClick={() => setActiveVariant(variant.id)}
                            className={cn(
                              "w-full text-left py-2 px-4 rounded-xl text-sm font-medium transition-all",
                              activeVariant === variant.id 
                                ? "text-primary bg-primary/5" 
                                : "text-white/30 hover:text-white/50"
                            )}
                          >
                            <div className="flex items-center gap-2">
                              {activeVariant === variant.id && (
                                <motion.div layoutId="dot" className="w-1.5 h-1.5 rounded-full bg-primary" />
                              )}
                              {variant.title}
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Content Area */}
            <div className="lg:col-span-8">
              <div className="relative group aspect-[16/10] md:aspect-auto md:h-[600px] w-full rounded-[48px] overflow-hidden bg-white/5 border border-white/10">
                <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab + activeVariant}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                          <Image
                            src={variantData.image || activeSolution.image}
                            alt={activeSolution.title}
                            fill
                            className="object-cover opacity-100"
                            priority
                          />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 space-y-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeVariant}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="max-w-2xl"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <ShowcaseBadge className="bg-primary/20 text-primary border-primary/20 backdrop-blur-md">
                            {activeSolution.title}
                          </ShowcaseBadge>
                          <ArrowRight className="w-4 h-4 text-white/40" />
                          <span className="text-white font-bold">{variantData.title}</span>
                        </div>
                      <h3 className="text-3xl md:text-5xl font-heading font-black text-white mb-6">
                        {variantData.description}
                      </h3>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-white/70">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                          <span>Brand Voice</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                          <span>Human-Level</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                          <span>Privacy First</span>
                        </div>
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
