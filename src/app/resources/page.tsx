"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LovableBackground } from "@/components/LovableBackground"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Newspaper, Users2, PlayCircle } from "lucide-react"

export default function ResourcesPage() {
  const resources = [
    { title: "Documentation", desc: "Technical guides and API references for developers.", icon: BookOpen, category: "Guides" },
    { title: "Case Studies", desc: "How global companies use VertoX to scale.", icon: Newspaper, category: "Stories" },
    { title: "Community", desc: "Join our global community of translators and AI enthusiasts.", icon: Users2, category: "Social" },
    { title: "Video Tutorials", desc: "Quick start videos to get you up and running.", icon: PlayCircle, category: "Training" }
  ]

  return (
    <div className="min-h-screen flex flex-col relative">
      <LovableBackground />
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge variant="outline" className="mb-6 py-1.5 px-4 bg-background/50 backdrop-blur-sm border-primary/20 text-primary">
              Resources
            </Badge>
            <h1 className="text-5xl md:text-7xl font-heading font-black tracking-tight mb-8">
              Everything you need to <span className="text-primary italic">succeed.</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {resources.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="glass h-full border-border/50 hover:border-primary/50 transition-colors cursor-pointer group">
                  <CardHeader>
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <Badge variant="secondary" className="w-fit mb-2">{item.category}</Badge>
                    <CardTitle className="text-xl font-bold">{item.title}</CardTitle>
                    <CardDescription>{item.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
