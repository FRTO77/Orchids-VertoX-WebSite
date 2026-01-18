"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { MapPin, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const editorialEase = [0.22, 1, 0.36, 1]

const benefits = [
  { title: "Remote First", desc: "Work from anywhere with hubs in SF, NY, and London." },
  { title: "Unlimited Growth", desc: "Generous learning stipend and mentorship from industry leaders." },
  { title: "Health & Wellness", desc: "Comprehensive health coverage and mental health support." },
]

const jobs = [
  { title: "Senior AI Research Engineer", dept: "Engineering", location: "Remote / SF", type: "Full-time", slug: "senior-ai-research-engineer" },
  { title: "Lead Product Designer", dept: "Design", location: "San Francisco", type: "Full-time", slug: "lead-product-designer" },
  { title: "Linguistic Data Scientist", dept: "Data", location: "Remote", type: "Full-time", slug: "linguistic-data-scientist" },
  { title: "Enterprise Account Executive", dept: "Sales", location: "New York", type: "Full-time", slug: "enterprise-account-executive" },
]

export default function CareersPage() {
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
            <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-6">Careers</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-[0.85] mb-8">
              Join the <em className="italic">revolution</em>
            </h1>
            <p className="text-lg text-black/60 dark:text-white/60 font-light max-w-2xl mx-auto">
              Help us build the neural tissue of global communication. We're looking for passionate individuals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 dark:bg-white/10 mb-24">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: editorialEase, delay: i * 0.1 }}
                className="bg-white dark:bg-black p-10 group hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-700"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 group-hover:text-white/40 dark:group-hover:text-black/40 mb-6 transition-colors duration-700">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="text-2xl md:text-3xl font-serif font-light mb-4">{benefit.title}</h3>
                <p className="text-sm text-black/60 dark:text-white/60 group-hover:text-white/60 dark:group-hover:text-black/60 font-light leading-relaxed transition-colors duration-700">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-4">Open Positions</p>
            <h2 className="text-4xl md:text-5xl font-serif font-light">
              Current <em className="italic">openings</em>
            </h2>
          </div>

          <div className="space-y-0 border-t border-black/10 dark:border-white/10">
            {jobs.map((job, i) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: editorialEase, delay: i * 0.1 }}
              >
                <Link 
                  href={`/careers/${job.slug}`}
                  className="flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-black/10 dark:border-white/10 group hover:pl-4 transition-all duration-500"
                >
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40">
                        {job.dept}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif font-light group-hover:translate-x-2 transition-transform duration-500">
                      {job.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-6 text-sm text-black/40 dark:text-white/40">
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> {job.location}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4" /> {job.type}
                      </span>
                    </div>
                    <Button className="rounded-full h-12 px-8 text-sm uppercase tracking-[0.2em] font-medium bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80 transition-all duration-500 group-hover:translate-x-1">
                      Apply
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
