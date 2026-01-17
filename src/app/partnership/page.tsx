"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Building2, Globe2, Briefcase, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const editorialEase = [0.22, 1, 0.36, 1]

const types = [
  { title: "Technology Partners", desc: "Integrate VertoX translation into your communication platform or hardware.", icon: Building2 },
  { title: "Channel Partners", desc: "Resell VertoX to your clients and earn industry-leading commissions.", icon: Globe2 },
  { title: "Service Partners", desc: "Provide implementation and consulting services for VertoX enterprise customers.", icon: Briefcase },
]

export default function PartnershipPage() {
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
            <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-6">Partnership</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-[0.85] mb-8">
              Build the future <em className="italic">together</em>
            </h1>
            <p className="text-lg text-black/60 dark:text-white/60 font-light max-w-2xl mx-auto">
              Join our global ecosystem of partners and help businesses communicate across borders with ease.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 dark:bg-white/10 mb-24">
            {types.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: editorialEase, delay: i * 0.1 }}
                className="bg-white dark:bg-black p-10 md:p-12 group hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-700"
              >
                <t.icon className="w-8 h-8 mb-6 text-black/40 dark:text-white/40 group-hover:text-white/40 dark:group-hover:text-black/40 transition-colors duration-700" />
                <h3 className="text-2xl md:text-3xl font-serif font-light mb-4">{t.title}</h3>
                <p className="text-sm text-black/60 dark:text-white/60 group-hover:text-white/60 dark:group-hover:text-black/60 font-light leading-relaxed transition-colors duration-700">
                  {t.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: editorialEase }}
            className="bg-black dark:bg-white text-white dark:text-black p-12 md:p-20 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-light leading-[0.9] mb-6">
              Become a <em className="italic">partner</em>
            </h2>
            <p className="text-white/60 dark:text-black/60 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
              Ready to scale your business with the world's most advanced AI translation technology? Let's talk about how we can work together.
            </p>
            <Link href="/contact">
              <Button className="rounded-full h-16 px-12 text-sm uppercase tracking-[0.2em] font-medium bg-white text-black hover:bg-white/90 dark:bg-black dark:text-white dark:hover:bg-black/90 transition-all duration-500">
                Apply Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
