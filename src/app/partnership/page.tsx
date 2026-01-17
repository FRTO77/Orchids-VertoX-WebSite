"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LovableBackground } from "@/components/LovableBackground"
import { motion } from "framer-motion"
import { Handshake, Building2, Globe2, Briefcase, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PartnershipPage() {
  const types = [
    { title: "Technology Partners", desc: "Integrate VertoX translation into your communication platform or hardware.", icon: Building2 },
    { title: "Channel Partners", desc: "Resell VertoX to your clients and earn industry-leading commissions.", icon: Globe2 },
    { title: "Service Partners", desc: "Provide implementation and consulting services for VertoX enterprise customers.", icon: Briefcase },
  ]

  return (
    <div className="min-h-screen flex flex-col relative">
      <LovableBackground />
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-heading font-black mb-6">Build the Future <span className="text-primary">Together.</span></h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join our global ecosystem of partners and help businesses communicate across borders with ease.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {types.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-10 rounded-[40px] border-border/50 text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <t.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t.title}</h3>
                <p className="text-muted-foreground mb-8">{t.desc}</p>
                <Button variant="ghost" className="text-primary font-bold hover:bg-primary/10 rounded-xl">
                  Learn More <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-12 md:p-20 rounded-[60px] border-primary/20 bg-primary/5 text-center"
          >
            <Handshake className="w-20 h-20 text-primary mx-auto mb-8" />
            <h2 className="text-4xl font-black mb-6">Become a VertoX Partner</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Ready to scale your business with the world's most advanced AI translation technology? Let's talk about how we can work together.
            </p>
            <Button size="lg" className="rounded-2xl px-12 h-16 text-xl font-bold glow-primary">Apply Now</Button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
