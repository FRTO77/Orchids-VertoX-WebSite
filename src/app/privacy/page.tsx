"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LovableBackground } from "@/components/LovableBackground"
import { motion } from "framer-motion"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <LovableBackground />
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-8 md:p-12 rounded-[40px] border-border/50"
          >
            <h1 className="text-4xl md:text-6xl font-heading font-black mb-8">Privacy <span className="text-primary">Policy.</span></h1>
            
            <div className="prose prose-invert prose-blue max-w-none space-y-8 text-muted-foreground">
              <section>
                <h2 className="text-2xl font-bold text-foreground">1. Data We Collect</h2>
                <p>
                  We collect audio data for real-time translation and voice cloning. This data is encrypted and processed in secure environments. We also collect basic account information like your name and email.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground">2. How We Use Data</h2>
                <p>
                  Your data is used exclusively to provide and improve the translation and voice cloning services you request. We have a strict "No-Training" policy for enterprise customers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground">3. Biometric Information</h2>
                <p>
                  Voice prints are considered biometric data. These are stored using advanced encryption and are never shared with third parties. You can delete your voice profile at any time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground">4. Data Security</h2>
                <p>
                  We implement industry-standard security measures, including end-to-end encryption and regular security audits, to protect your personal and communication data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground">5. Your Rights</h2>
                <p>
                  You have the right to access, correct, or delete your personal data. You can exercise these rights through your account settings or by contacting our support team.
                </p>
              </section>
            </div>
            
            <div className="mt-12 pt-8 border-t border-border/50 text-sm text-muted-foreground">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
