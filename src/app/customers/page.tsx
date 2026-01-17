"use client"

import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

const editorialEase = [0.22, 1, 0.36, 1]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Global Ops at TechFlow",
    text: "VertoX changed how our distributed team communicates. The voice cloning is eerily good—it actually sounds like me in Mandarin.",
    avatar: "SC"
  },
  {
    name: "Marcus Rodriguez",
    role: "CEO of GlobalBridge",
    text: "We've tried every translation tool out there. VertoX is the only one that handles technical nuances correctly while keeping the emotional tone.",
    avatar: "MR"
  },
  {
    name: "Elena Petrov",
    role: "Project Manager",
    text: "The real-time aspect is a lifesaver for our client meetings. No more waiting for interpreters. It's seamless.",
    avatar: "EP"
  }
]

const logos = ["TECHFLOW", "GLOBALBRIDGE", "VOXAI", "NEXUS"]

export default function CustomersPage() {
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
            <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-6">Customers</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-[0.85] mb-8">
              Trusted by the <em className="italic">ambitious</em>
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 dark:bg-white/10 mb-24">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: editorialEase, delay: i * 0.1 }}
                className="bg-white dark:bg-black p-10 md:p-12 group hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-700 flex flex-col"
              >
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-current text-black/20 dark:text-white/20 group-hover:text-white/20 dark:group-hover:text-black/20 transition-colors duration-700" />
                  ))}
                </div>
                
                <p className="text-lg font-serif font-light italic leading-relaxed mb-8 flex-grow">
                  "{t.text}"
                </p>
                
                <div className="pt-8 border-t border-black/10 dark:border-white/10 group-hover:border-white/10 dark:group-hover:border-black/10 transition-colors duration-700">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 group-hover:bg-white/5 dark:group-hover:bg-black/5 flex items-center justify-center text-sm font-medium transition-colors duration-700">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-black/40 dark:text-white/40 group-hover:text-white/40 dark:group-hover:text-black/40 transition-colors duration-700">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: editorialEase }}
            className="text-center py-20 border-t border-b border-black/10 dark:border-white/10"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-12">
              Powering teams at
            </p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-24">
              {logos.map((logo, i) => (
                <motion.span
                  key={logo}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: editorialEase, delay: i * 0.1 }}
                  className="text-2xl md:text-3xl font-serif font-light italic text-black/20 dark:text-white/20"
                >
                  {logo}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
