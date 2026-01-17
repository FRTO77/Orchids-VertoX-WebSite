"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

const editorialEase = [0.22, 1, 0.36, 1]

export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using VertoX, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services."
    },
    {
      title: "2. Description of Service",
      content: "VertoX provides AI-powered real-time translation and voice cloning services for meetings and communication. We reserve the right to modify or discontinue the service at any time."
    },
    {
      title: "3. User Responsibilities",
      content: "You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account. You agree to use the service only for lawful purposes."
    },
    {
      title: "4. Voice Cloning & Ethics",
      content: "You may only clone voices for which you have explicit legal consent. Unauthorized cloning of third-party voices is strictly prohibited and may lead to immediate account termination."
    },
    {
      title: "5. Intellectual Property",
      content: "The service and its original content, features, and functionality are and will remain the exclusive property of VertoX AI Inc."
    },
    {
      title: "6. Limitation of Liability",
      content: "VertoX shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service."
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black">
      <div className="grain" />
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: editorialEase }}
            className="mb-16"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-6">Legal</p>
            <h1 className="text-5xl md:text-7xl font-serif font-light leading-[0.85] mb-8">
              Terms of <em className="italic">Service</em>
            </h1>
            <p className="text-sm text-black/40 dark:text-white/40">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </motion.div>

          <div className="space-y-12">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: editorialEase, delay: i * 0.05 }}
                className="border-b border-black/10 dark:border-white/10 pb-12"
              >
                <h2 className="text-2xl font-serif font-light mb-4">{section.title}</h2>
                <p className="text-black/60 dark:text-white/60 font-light leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
