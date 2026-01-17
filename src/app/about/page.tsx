"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LovableBackground } from "@/components/LovableBackground"
import { motion } from "framer-motion"
import { Globe, Users, Target, Rocket } from "lucide-react"

export default function AboutPage() {
  const stats = [
    { label: "Founded", value: "2023" },
    { label: "Team Size", value: "40+" },
    { label: "Languages", value: "100+" },
    { label: "Users", value: "500k+" },
  ]

  return (
    <div className="min-h-screen flex flex-col relative">
      <LovableBackground />
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-heading font-black mb-6">Our <span className="text-primary">Mission.</span></h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're building a world where language is no longer a barrier to human connection, collaboration, and understanding.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass p-8 rounded-[40px] border-border/50"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
              <p className="text-muted-foreground leading-relaxed">
                VertoX is a team of AI researchers, engineers, and linguists dedicated to pushing the boundaries of real-time communication. Based in San Francisco, we serve global enterprises and individuals who dream of a borderless world.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass p-8 rounded-[40px] border-border/50"
            >
              <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Rocket className="w-6 h-6 text-purple-500" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                We envision a future where every conversation can be held in your native tongue, while still preserving the unique characteristics of your voice, emotion, and identity across any language.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-6 rounded-3xl border-border/50 text-center"
              >
                <div className="text-3xl font-black text-primary mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass p-8 md:p-12 rounded-[40px] border-border/50 text-center"
          >
            <h2 className="text-3xl font-bold mb-6 italic">"Language is the road map of a culture. It tells you where its people come from and where they are going."</h2>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-muted border border-border" />
              <div className="text-left">
                <div className="font-bold">Alex Rivera</div>
                <div className="text-sm text-muted-foreground">CEO & Founder, VertoX</div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
