"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LovableBackground } from "@/components/LovableBackground"
import { motion } from "framer-motion"

export default function TermsPage() {
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
            <h1 className="text-4xl md:text-6xl font-heading font-black mb-8">Terms of <span className="text-primary">Service.</span></h1>
            
            <div className="prose prose-invert prose-blue max-w-none space-y-8 text-muted-foreground">
              <section>
                <h2 className="text-2xl font-bold text-foreground">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using VertoX, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground">2. Description of Service</h2>
                <p>
                  VertoX provides AI-powered real-time translation and voice cloning services for meetings and communication. We reserve the right to modify or discontinue the service at any time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground">3. User Responsibilities</h2>
                <p>
                  You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account. You agree to use the service only for lawful purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground">4. Voice Cloning & Ethics</h2>
                <p>
                  You may only clone voices for which you have explicit legal consent. Unauthorized cloning of third-party voices is strictly prohibited and may lead to immediate account termination.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground">5. Intellectual Property</h2>
                <p>
                  The service and its original content, features, and functionality are and will remain the exclusive property of VertoX AI Inc.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground">6. Limitation of Liability</h2>
                <p>
                  VertoX shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.
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
