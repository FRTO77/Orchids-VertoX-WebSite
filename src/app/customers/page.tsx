"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LovableBackground } from "@/components/LovableBackground"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export default function CustomersPage() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Global Ops at TechFlow",
      text: "VertoX changed how our distributed team communicates. The voice cloning is eerily good—it actually sounds like me in Mandarin!",
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez",
      role: "CEO of GlobalBridge",
      text: "We've tried every translation tool out there. VertoX is the only one that handles technical nuances correctly while keeping the emotional tone.",
      avatar: "MR"
    },
    {
      name: "Elena Petrov",
      role: "Project Manager",
      text: "The real-time aspect is a lifesaver for our client meetings. No more waiting for interpreters. It's seamless.",
      avatar: "EP"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col relative">
      <LovableBackground />
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="outline" className="mb-6 py-1.5 px-4 bg-background/50 backdrop-blur-sm border-primary/20 text-primary">
              Our Customers
            </Badge>
            <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tight mb-8">
              Trusted by the world's most <span className="text-primary italic">ambitious</span> teams.
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="glass h-full border-border/50 p-8 flex flex-col gap-6">
                  <div className="flex gap-1 text-primary">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-lg italic text-muted-foreground flex-grow">"{t.text}"</p>
                  <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                    <Avatar>
                      <AvatarFallback className="bg-primary/20 text-primary font-bold">{t.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold">{t.name}</div>
                      <div className="text-sm text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

            <div className="mt-32 text-center">
              <h2 className="text-2xl font-bold mb-12 text-zinc-500 uppercase tracking-widest">Powering teams at</h2>
              <div className="flex flex-wrap justify-center gap-12 md:gap-24 text-zinc-600">
                <div className="text-3xl font-black italic">TECHFLOW</div>
                <div className="text-3xl font-black italic">GLOBALBRIDGE</div>
                <div className="text-3xl font-black italic">VOXAI</div>
                <div className="text-3xl font-black italic">NEXUS</div>
              </div>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LovableBackground } from "@/components/LovableBackground"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export default function CustomersPage() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Global Ops at TechFlow",
      text: "VertoX changed how our distributed team communicates. The voice cloning is eerily good—it actually sounds like me in Mandarin!",
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez",
      role: "CEO of GlobalBridge",
      text: "We've tried every translation tool out there. VertoX is the only one that handles technical nuances correctly while keeping the emotional tone.",
      avatar: "MR"
    },
    {
      name: "Elena Petrov",
      role: "Project Manager",
      text: "The real-time aspect is a lifesaver for our client meetings. No more waiting for interpreters. It's seamless.",
      avatar: "EP"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col relative">
      <LovableBackground />
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="outline" className="mb-6 py-1.5 px-4 bg-background/50 backdrop-blur-sm border-primary/20 text-primary">
              Our Customers
            </Badge>
              <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tight mb-8 text-white">
                Trusted by the world's most <span className="text-primary italic">ambitious</span> teams.
              </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="glass h-full border-border/50 p-8 flex flex-col gap-6">
                  <div className="flex gap-1 text-primary">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-lg italic text-muted-foreground flex-grow">"{t.text}"</p>
                  <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                    <Avatar>
                      <AvatarFallback className="bg-primary/20 text-primary font-bold">{t.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold">{t.name}</div>
                      <div className="text-sm text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

            <div className="mt-32 text-center">
              <h2 className="text-2xl font-bold mb-12 text-zinc-500 uppercase tracking-widest">Powering teams at</h2>
              <div className="flex flex-wrap justify-center gap-12 md:gap-24 text-zinc-600">
                <div className="text-3xl font-black italic">TECHFLOW</div>
                <div className="text-3xl font-black italic">GLOBALBRIDGE</div>
                <div className="text-3xl font-black italic">VOXAI</div>
                <div className="text-3xl font-black italic">NEXUS</div>
              </div>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LovableBackground } from "@/components/LovableBackground"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export default function CustomersPage() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Global Ops at TechFlow",
      text: "VertoX changed how our distributed team communicates. The voice cloning is eerily good—it actually sounds like me in Mandarin!",
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez",
      role: "CEO of GlobalBridge",
      text: "We've tried every translation tool out there. VertoX is the only one that handles technical nuances correctly while keeping the emotional tone.",
      avatar: "MR"
    },
    {
      name: "Elena Petrov",
      role: "Project Manager",
      text: "The real-time aspect is a lifesaver for our client meetings. No more waiting for interpreters. It's seamless.",
      avatar: "EP"
    }
  ]

  return (
    <div className="min-h-screen flex flex-col relative">
      <LovableBackground />
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="outline" className="mb-6 py-1.5 px-4 bg-background/50 backdrop-blur-sm border-primary/20 text-primary">
              Our Customers
            </Badge>
              <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tight mb-8 text-white">
                Trusted by the world's most <span className="text-primary italic">ambitious</span> teams.
              </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                  <Card className="glass h-full border-border/50 p-8 flex flex-col gap-6 hover:border-primary/30 transition-all duration-300">
                    <div className="flex gap-1 text-primary">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className="text-lg italic text-zinc-300 flex-grow">"{t.text}"</p>
                    <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                      <Avatar>
                        <AvatarFallback className="bg-primary/20 text-primary font-bold">{t.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-bold text-white">{t.name}</div>
                        <div className="text-sm text-zinc-400">{t.role}</div>
                      </div>
                    </div>
                  </Card>
              </motion.div>
            ))}
          </div>

            <div className="mt-32 text-center">
              <h2 className="text-2xl font-bold mb-12 text-zinc-500 uppercase tracking-widest">Powering teams at</h2>
              <div className="flex flex-wrap justify-center gap-12 md:gap-24 text-zinc-600">
                <div className="text-3xl font-black italic">TECHFLOW</div>
                <div className="text-3xl font-black italic">GLOBALBRIDGE</div>
                <div className="text-3xl font-black italic">VOXAI</div>
                <div className="text-3xl font-black italic">NEXUS</div>
              </div>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
