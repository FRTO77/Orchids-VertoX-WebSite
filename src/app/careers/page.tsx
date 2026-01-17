"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LovableBackground } from "@/components/LovableBackground"
import { motion } from "framer-motion"
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function CareersPage() {
  const jobs = [
    { title: "Senior AI Research Engineer", dept: "Engineering", location: "Remote / SF", type: "Full-time" },
    { title: "Lead Product Designer", dept: "Design", location: "San Francisco", type: "Full-time" },
    { title: "Linguistic Data Scientist", dept: "Data", location: "Remote", type: "Full-time" },
    { title: "Enterprise Account Executive", dept: "Sales", location: "New York", type: "Full-time" },
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
            <h1 className="text-5xl md:text-7xl font-heading font-black mb-6">Join the <span className="text-primary">Revolution.</span></h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Help us build the neural tissue of global communication. We're looking for passionate individuals to join our mission.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              { title: "Work from Anywhere", desc: "We are a remote-first company with hubs in SF, NY, and London." },
              { title: "Unlimited Growth", desc: "Generous learning stipend and mentorship from industry leaders." },
              { title: "Health & Wellness", desc: "Comprehensive health coverage and mental health support." },
            ].map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-[40px] border-border/50"
              >
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-black mb-8">Open Positions</h2>
            {jobs.map((job, i) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-6 md:p-8 rounded-[32px] border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary/50 transition-all group"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">{job.dept}</Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {job.location}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{job.title}</h3>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {job.type}
                  </span>
                  <Button className="rounded-xl px-6 group-hover:glow-primary transition-all">
                    Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
