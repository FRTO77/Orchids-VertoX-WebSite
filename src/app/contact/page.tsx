"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LovableBackground } from "@/components/LovableBackground"
import { motion } from "framer-motion"
import { Mail, MessageSquare, Phone, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <LovableBackground />
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-heading font-black mb-6">Get in <span className="text-primary">Touch.</span></h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions about VertoX? Our team is here to help you break language barriers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              {[
                { icon: Mail, label: "Email Us", value: "hello@vertox.ai", sub: "Response within 24 hours" },
                { icon: Phone, label: "Call Us", value: "+1 (555) 000-0000", sub: "Mon-Fri, 9am-6pm PST" },
                { icon: MapPin, label: "Office", value: "San Francisco, CA", sub: "Silicon Valley Headquarters" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-6 rounded-3xl border-border/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{item.label}</div>
                      <div className="text-lg font-bold">{item.value}</div>
                      <div className="text-xs text-muted-foreground">{item.sub}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 glass p-8 md:p-12 rounded-[40px] border-border/50"
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="John" className="h-12 rounded-xl bg-muted/30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" className="h-12 rounded-xl bg-muted/30" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" className="h-12 rounded-xl bg-muted/30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" className="h-12 rounded-xl bg-muted/30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Tell us more about your needs..." className="min-h-[150px] rounded-xl bg-muted/30" />
                </div>
                <Button className="w-full h-14 rounded-xl font-bold text-lg glow-primary flex gap-2">
                  <Send className="w-5 h-5" />
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
