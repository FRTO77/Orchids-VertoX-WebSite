"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LovableBackground } from "@/components/LovableBackground"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Mic2, Globe, Sparkles, Building2, MapPin, Tablet, Speaker, Radio, Bluetooth } from "lucide-react"

export default function PhysicalMeetingsPage() {
  const useCases = [
    { icon: Building2, title: "Hotel Front Desks", color: "text-primary", desc: "Seamless check-ins for international guests in any language." },
    { icon: MapPin, title: "Travel & Tourism", color: "text-purple-500", desc: "Guided tours with real-time audio translation for groups." },
    { icon: Tablet, title: "Conference Centers", color: "text-orange-500", desc: "Dedicated translation tablets for multi-lingual sessions." },
    { icon: Mic2, title: "Medical Clinics", color: "text-green-500", desc: "Accurate translation for critical patient-doctor communication." },
  ]

  return (
    <div className="min-h-screen flex flex-col relative">
      <LovableBackground />
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-20 items-center mb-32">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 space-y-8"
            >
              <Badge variant="outline" className="py-1.5 px-4 bg-primary/10 border-primary/20 text-primary uppercase tracking-widest font-bold">
                In-Person Solutions
              </Badge>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black leading-[0.9]">
                Bring VertoX to <br /><span className="text-primary italic">Reality.</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Experience crystal-clear translation in conference rooms, hotels, and hospitals with our specialized hardware and mobile app solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-2xl h-16 px-12 text-xl font-bold glow-primary">Talk to Sales</Button>
                <Button size="lg" variant="outline" className="rounded-2xl h-16 px-12 text-xl font-bold border-white/20">View Hardware</Button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full"
            >
              {useCases.map((uc, i) => (
                <div key={uc.title} className="glass p-8 rounded-[40px] border-border/50 hover:border-primary/30 transition-all group">
                  <div className={`w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-6 ${uc.color} group-hover:scale-110 transition-transform`}>
                    <uc.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{uc.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{uc.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="mb-32">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-6">Hardware Optimized for Voice.</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">VertoX Hubs and specialized microphones ensure the highest possible accuracy in noisy environments.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Speaker, title: "Beamforming Mics", desc: "Isolate voices from background noise with advanced spatial filtering." },
                { icon: Radio, title: "Long-Range Hub", desc: "Connect up to 50 simultaneous devices in a single conference room." },
                { icon: Bluetooth, title: "VertoX Connect", desc: "Instant pairing with mobile devices for seamless on-the-go translation." }
              ].map((h, i) => (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-10 rounded-[40px] border-border/50 text-center"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <h.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{h.title}</h3>
                  <p className="text-muted-foreground">{h.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass p-12 md:p-20 rounded-[60px] border-primary/20 bg-primary/5 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50" />
            <div className="relative">
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Ready to upgrade your space?</h2>
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                Schedule a site visit or request a demo unit for your organization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="rounded-2xl px-12 h-16 text-xl font-bold glow-primary">Request Demo Unit</Button>
                <Button size="lg" variant="outline" className="rounded-2xl px-12 h-16 text-xl font-bold border-white/20">Download Spec Sheet</Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
