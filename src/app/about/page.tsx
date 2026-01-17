"use client"

import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Target, Rocket } from "lucide-react"

const editorialEase = [0.22, 1, 0.36, 1]

const stats = [
  { label: "Founded", value: "2023" },
  { label: "Team", value: "40+" },
  { label: "Languages", value: "100+" },
  { label: "Users", value: "500k+" },
]

export default function AboutPage() {
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
            <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-6">About</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-[0.85] mb-8">
              Our <em className="italic">mission</em>
            </h1>
            <p className="text-lg text-black/60 dark:text-white/60 font-light max-w-2xl mx-auto">
              We're building a world where language is no longer a barrier to human connection, collaboration, and understanding.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/10 dark:bg-white/10 mb-24">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: editorialEase, delay: i * 0.1 }}
                className="bg-white dark:bg-black p-8 md:p-10 text-center group hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-700"
              >
                <p className="text-4xl md:text-5xl font-serif font-light mb-2">{stat.value}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 group-hover:text-white/40 dark:group-hover:text-black/40 transition-colors duration-700">
                  {stat.label}
                </p>
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
              <Target className="w-8 h-8 mb-8 text-black/40 dark:text-white/40" />
              <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-4">Who We Are</p>
              <h2 className="text-4xl md:text-5xl font-serif font-light leading-[0.9] mb-6">
                A team of <em className="italic">believers</em>
              </h2>
              <p className="text-black/60 dark:text-white/60 font-light leading-relaxed">
                VertoX is a team of AI researchers, engineers, and linguists dedicated to pushing the boundaries of real-time communication. Based in San Francisco, we serve global enterprises and individuals who dream of a borderless world.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: editorialEase, delay: 0.2 }}
              className="bg-black dark:bg-white text-white dark:text-black p-12 md:p-16"
            >
              <Rocket className="w-8 h-8 mb-8 text-white/40 dark:text-black/40" />
              <p className="text-xs uppercase tracking-[0.3em] text-white/40 dark:text-black/40 mb-4">Our Vision</p>
              <h2 className="text-4xl md:text-5xl font-serif font-light leading-[0.9] mb-6">
                A future without <em className="italic">barriers</em>
              </h2>
              <p className="text-white/60 dark:text-black/60 font-light leading-relaxed">
                We envision a future where every conversation can be held in your native tongue, while still preserving the unique characteristics of your voice, emotion, and identity across any language.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: editorialEase }}
            className="border border-black/10 dark:border-white/10 p-12 md:p-20 text-center"
          >
            <p className="text-2xl md:text-3xl lg:text-4xl font-serif font-light italic leading-relaxed mb-8 max-w-4xl mx-auto">
              "Language is the road map of a culture. It tells you where its people come from and where they are going."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5" />
              <div className="text-left">
                <p className="text-sm font-medium">Alex Rivera</p>
                <p className="text-xs text-black/40 dark:text-white/40">CEO & Founder, VertoX</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
