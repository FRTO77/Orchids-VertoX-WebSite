"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Github, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const editorialEase = [0.22, 1, 0.36, 1]

const social = [
  { name: "Discord", members: "12k+", desc: "Join conversations with developers and users" },
  { name: "Twitter", members: "45k+", desc: "Follow for updates and announcements" },
  { name: "GitHub", members: "2.5k stars", desc: "Contribute to open-source projects" },
]

export default function CommunityPage() {
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
            <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-6">Community</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-[0.85] mb-8">
              Join the <em className="italic">conversation</em>
            </h1>
            <p className="text-lg text-black/60 dark:text-white/60 font-light max-w-2xl mx-auto">
              Connect with thousands of developers, linguists, and AI enthusiasts building the future of global communication.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 dark:bg-white/10 mb-24">
            {social.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: editorialEase, delay: i * 0.1 }}
                className="bg-white dark:bg-black p-10 md:p-12 group hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-700"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 group-hover:text-white/40 dark:group-hover:text-black/40 mb-6 transition-colors duration-700">
                  {s.members}
                </p>
                <h3 className="text-3xl md:text-4xl font-serif font-light mb-4">{s.name}</h3>
                <p className="text-sm text-black/60 dark:text-white/60 group-hover:text-white/60 dark:group-hover:text-black/60 font-light leading-relaxed mb-8 transition-colors duration-700">
                  {s.desc}
                </p>
                <Button className="rounded-full h-12 px-8 text-sm uppercase tracking-[0.2em] font-medium bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80 group-hover:bg-white group-hover:text-black dark:group-hover:bg-black dark:group-hover:text-white transition-all duration-500">
                  Join Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-black/10 dark:bg-white/10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: editorialEase }}
              className="bg-black dark:bg-white text-white dark:text-black p-12 md:p-16"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-white/40 dark:text-black/40 mb-4">Ambassador Program</p>
              <h2 className="text-4xl md:text-5xl font-serif font-light leading-[0.9] mb-6">
                VertoX <em className="italic">Champions</em>
              </h2>
              <p className="text-white/60 dark:text-black/60 font-light leading-relaxed mb-8">
                Get early access to new features, exclusive swag, and opportunities to represent VertoX at global conferences.
              </p>
              <Button variant="outline" className="rounded-full h-12 px-8 text-sm uppercase tracking-[0.2em] font-medium border-white/20 dark:border-black/20 hover:bg-white/10 dark:hover:bg-black/10 transition-all duration-500">
                Learn More
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: editorialEase, delay: 0.2 }}
              className="bg-white dark:bg-black p-12 md:p-16"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-4">Open Source</p>
              <h2 className="text-4xl md:text-5xl font-serif font-light leading-[0.9] mb-6">
                Community <em className="italic">Projects</em>
              </h2>
              <p className="text-black/60 dark:text-white/60 font-light leading-relaxed mb-8">
                Explore translations, custom voice models, and integrations built by our community using the VertoX API.
              </p>
              <Button variant="outline" className="rounded-full h-12 px-8 text-sm uppercase tracking-[0.2em] font-medium border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-500">
                Explore Gallery
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
