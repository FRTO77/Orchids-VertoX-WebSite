"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Building2, MapPin, Tablet, Mic2, Speaker, Radio, Bluetooth, ArrowRight } from "lucide-react"

const editorialEase = [0.22, 1, 0.36, 1]

const useCases = [
  { icon: Building2, title: "Hotel Front Desks", desc: "Seamless check-ins for international guests in any language." },
  { icon: MapPin, title: "Travel & Tourism", desc: "Guided tours with real-time audio translation for groups." },
  { icon: Tablet, title: "Conference Centers", desc: "Dedicated translation tablets for multi-lingual sessions." },
  { icon: Mic2, title: "Medical Clinics", desc: "Accurate translation for critical patient-doctor communication." },
]

const hardware = [
  { icon: Speaker, title: "Beamforming Mics", desc: "Isolate voices from background noise with advanced spatial filtering." },
  { icon: Radio, title: "Long-Range Hub", desc: "Connect up to 50 simultaneous devices in a single conference room." },
  { icon: Bluetooth, title: "VertoX Connect", desc: "Instant pairing with mobile devices for seamless translation." }
]

export default function PhysicalMeetingsPage() {
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
            <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-6">Physical Meetings</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-[0.85] mb-8">
              Bring VertoX to <em className="italic">reality</em>
            </h1>
            <p className="text-lg text-black/60 dark:text-white/60 font-light max-w-2xl mx-auto mb-12">
              Crystal-clear translation in conference rooms, hotels, and hospitals with our specialized hardware and mobile app solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="rounded-full h-14 px-10 text-sm uppercase tracking-[0.2em] font-medium bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80 transition-all duration-500">
                  Talk to Sales
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10 dark:bg-white/10 mb-24">
            {useCases.map((uc, i) => (
              <motion.div 
                key={uc.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: editorialEase, delay: i * 0.1 }}
                className="bg-white dark:bg-black p-10 md:p-12 group hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-700"
              >
                <uc.icon className="w-8 h-8 mb-6 text-black/40 dark:text-white/40 group-hover:text-white/40 dark:group-hover:text-black/40 transition-colors duration-700" />
                <h3 className="text-2xl md:text-3xl font-serif font-light mb-4">{uc.title}</h3>
                <p className="text-sm text-black/60 dark:text-white/60 group-hover:text-white/60 dark:group-hover:text-black/60 font-light leading-relaxed transition-colors duration-700">
                  {uc.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: editorialEase }}
              className="text-center mb-16"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-4">Hardware</p>
              <h2 className="text-4xl md:text-5xl font-serif font-light">
                Optimized for <em className="italic">voice</em>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 dark:bg-white/10">
              {hardware.map((h, i) => (
                <motion.div
                  key={h.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: editorialEase, delay: i * 0.1 }}
                  className="bg-white dark:bg-black p-10 md:p-12 text-center group hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-700"
                >
                  <h.icon className="w-8 h-8 mx-auto mb-6 text-black/40 dark:text-white/40 group-hover:text-white/40 dark:group-hover:text-black/40 transition-colors duration-700" />
                  <h3 className="text-2xl font-serif font-light mb-4">{h.title}</h3>
                  <p className="text-sm text-black/60 dark:text-white/60 group-hover:text-white/60 dark:group-hover:text-black/60 font-light leading-relaxed transition-colors duration-700">
                    {h.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: editorialEase }}
            className="bg-black dark:bg-white text-white dark:text-black p-12 md:p-20 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-light leading-[0.9] mb-6">
              Ready to upgrade your <em className="italic">space</em>?
            </h2>
            <p className="text-white/60 dark:text-black/60 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
              Schedule a site visit or request a demo unit for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="rounded-full h-16 px-12 text-sm uppercase tracking-[0.2em] font-medium bg-white text-black hover:bg-white/90 dark:bg-black dark:text-white dark:hover:bg-black/90 transition-all duration-500">
                  Request Demo Unit
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
