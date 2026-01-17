"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const editorialEase = [0.22, 1, 0.36, 1]

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@vertox.ai", sub: "Response within 24 hours" },
  { icon: Phone, label: "Phone", value: "+1 (555) 000-0000", sub: "Mon-Fri, 9am-6pm PST" },
  { icon: MapPin, label: "Office", value: "San Francisco, CA", sub: "Silicon Valley HQ" },
]

export default function ContactPage() {
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
            <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-6">Contact</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-[0.85] mb-8">
              Get in <em className="italic">touch</em>
            </h1>
            <p className="text-lg text-black/60 dark:text-white/60 font-light max-w-2xl mx-auto">
              Have questions about VertoX? Our team is here to help you break language barriers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-black/10 dark:bg-white/10">
            <div className="lg:col-span-1 bg-black dark:bg-white text-white dark:text-black">
              {contactInfo.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: editorialEase, delay: i * 0.1 }}
                  className="p-8 border-b border-white/10 dark:border-black/10 last:border-b-0"
                >
                  <div className="flex items-start gap-4">
                    <item.icon className="w-5 h-5 mt-1 text-white/40 dark:text-black/40" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-white/40 dark:text-black/40 mb-2">
                        {item.label}
                      </p>
                      <p className="text-lg font-serif font-light mb-1">{item.value}</p>
                      <p className="text-xs text-white/40 dark:text-black/40">{item.sub}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: editorialEase, delay: 0.3 }}
              className="lg:col-span-2 bg-white dark:bg-black p-10 md:p-16"
            >
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label htmlFor="first-name" className="text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/40">
                      First Name
                    </Label>
                    <Input 
                      id="first-name" 
                      placeholder="John" 
                      className="h-14 rounded-none border-0 border-b border-black/10 dark:border-white/10 bg-transparent px-0 text-lg font-light focus:border-black dark:focus:border-white transition-colors focus-visible:ring-0" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name" className="text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/40">
                      Last Name
                    </Label>
                    <Input 
                      id="last-name" 
                      placeholder="Doe" 
                      className="h-14 rounded-none border-0 border-b border-black/10 dark:border-white/10 bg-transparent px-0 text-lg font-light focus:border-black dark:focus:border-white transition-colors focus-visible:ring-0" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/40">
                    Email Address
                  </Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    className="h-14 rounded-none border-0 border-b border-black/10 dark:border-white/10 bg-transparent px-0 text-lg font-light focus:border-black dark:focus:border-white transition-colors focus-visible:ring-0" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/40">
                    Subject
                  </Label>
                  <Input 
                    id="subject" 
                    placeholder="How can we help?" 
                    className="h-14 rounded-none border-0 border-b border-black/10 dark:border-white/10 bg-transparent px-0 text-lg font-light focus:border-black dark:focus:border-white transition-colors focus-visible:ring-0" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/40">
                    Message
                  </Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us more about your needs..." 
                    className="min-h-[150px] rounded-none border-0 border-b border-black/10 dark:border-white/10 bg-transparent px-0 text-lg font-light focus:border-black dark:focus:border-white transition-colors resize-none focus-visible:ring-0" 
                  />
                </div>
                <Button className="rounded-full h-16 px-12 text-sm uppercase tracking-[0.2em] font-medium bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80 transition-all duration-500">
                  Send Message
                  <ArrowRight className="ml-2 w-4 h-4" />
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
