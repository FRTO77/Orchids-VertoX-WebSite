"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

const editorialEase = [0.22, 1, 0.36, 1]

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      content: "We collect information you provide directly to us, including account information, audio data for translation, and usage data. We may also collect information about your device and how you interact with our services."
    },
    {
      title: "2. How We Use Information",
      content: "We use the information we collect to provide, maintain, and improve our services, process translations, communicate with you, and ensure security and prevent fraud."
    },
    {
      title: "3. Audio Data Processing",
      content: "Audio data is processed in real-time for translation purposes. By default, audio is transient and not stored permanently. Enterprise customers may opt into encrypted retention with role-based access controls."
    },
    {
      title: "4. Voice Cloning Consent",
      content: "Voice cloning features require explicit consent from the voice owner. We maintain consent records and provide mechanisms for consent withdrawal at any time."
    },
    {
      title: "5. Data Security",
      content: "We implement industry-standard security measures including end-to-end encryption for audio transmission, secure data storage, and regular security audits."
    },
    {
      title: "6. Your Rights",
      content: "You have the right to access, correct, or delete your personal data. You may also request data portability or object to certain processing activities. Contact us at privacy@vertox.ai for any requests."
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
              Privacy <em className="italic">Policy</em>
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
