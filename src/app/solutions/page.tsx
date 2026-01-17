"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LovableBackground } from "@/components/LovableBackground"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Video, Users, Code } from "lucide-react"

export default function SolutionsPage() {
  const solutions = [
    {
      title: "Online Meetings",
      href: "/solutions/online-meetings",
      icon: Video,
      desc: "Integrate VertoX directly into Zoom, Google Meet, and Microsoft Teams for seamless real-time translation.",
      color: "bg-blue-500/10 text-blue-500"
    },
    {
      title: "Physical Meetings",
      href: "/solutions/physical-meetings",
      icon: Users,
      desc: "Transform in-person collaboration with our mobile app and specialized hardware for conference rooms.",
      color: "bg-purple-500/10 text-purple-500"
    },
    {
      title: "Developer API",
      href: "/solutions/api",
      icon: Code,
      desc: "Build your own multilingual experiences using our robust API for speech-to-speech translation.",
      color: "bg-green-500/10 text-green-500"
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
              Our Solutions
            </Badge>
            <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tight mb-8">
              Tailored for every <span className="text-primary italic">conversation.</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {solutions.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={s.href}>
                  <div className="glass h-full p-10 rounded-[40px] border-border/50 hover:border-primary/50 transition-all flex flex-col items-center text-center group">
                    <div className={`w-16 h-16 ${s.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <s.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                    <p className="text-muted-foreground mb-8">{s.desc}</p>
                    <Button variant="ghost" className="font-bold mt-auto">
                      View Details <ArrowRight className="ml-2 w-4 h-4" />
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
