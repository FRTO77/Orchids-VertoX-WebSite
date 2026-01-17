"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LovableBackground } from "@/components/LovableBackground"
import { motion } from "framer-motion"
import { Calendar, Clock, ChevronRight, ArrowRight, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const posts = [
  {
    title: "The Future of Neural Voice Cloning",
    excerpt: "How VertoX is achieving 99% vocal similarity while reducing processing latency to sub-second levels.",
    date: "May 24, 2024",
    readTime: "8 min read",
    category: "AI Research",
    image: "bg-blue-600/20"
  },
  {
    title: "Breaking Language Barriers in Global Teams",
    excerpt: "A case study on how multi-national corporations are using VertoX to streamline cross-border communication.",
    date: "May 18, 2024",
    readTime: "6 min read",
    category: "Enterprise",
    image: "bg-purple-600/20"
  },
  {
    title: "Announcing VertoX API v2.0",
    excerpt: "New endpoints for real-time streaming, emotional preservation, and support for 50 additional languages.",
    date: "May 12, 2024",
    readTime: "12 min read",
    category: "Product",
    image: "bg-orange-600/20"
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <LovableBackground />
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-heading font-black mb-6">Inside <span className="text-primary">VertoX.</span></h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Insights, updates, and research from the frontier of AI communication.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-8 md:p-12 rounded-[60px] border-primary/20 bg-primary/5 flex flex-col lg:flex-row gap-12 items-center group cursor-pointer hover:border-primary/50 transition-all"
            >
              <div className={`w-full lg:w-[45%] aspect-video rounded-[40px] bg-primary/10 flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                <Tag className="w-20 h-20 text-primary opacity-20" />
              </div>
              <div className="flex-grow space-y-6">
                <div className="flex items-center gap-4">
                  <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" /> June 1, 2024
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black group-hover:text-primary transition-colors leading-tight">Beyond Translation: Preserving Human Emotion in Every Language.</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">Our latest breakthrough in neural synthesis allows VertoX to capture and translate micro-expressions in voice tone, ensuring your message is felt, not just heard.</p>
                <Button size="lg" className="rounded-2xl px-10 h-14 text-lg font-bold glow-primary">Read Article <ArrowRight className="ml-2 w-5 h-5" /></Button>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-6 rounded-[40px] border-border/50 hover:border-primary/30 transition-all group flex flex-col h-full cursor-pointer"
              >
                <div className={`aspect-[16/10] rounded-[32px] ${post.image} mb-6 flex items-center justify-center`}>
                  <Tag className="w-12 h-12 opacity-10" />
                </div>
                <div className="flex-grow space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-muted text-foreground">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors leading-snug">{post.title}</h3>
                  <p className="text-muted-foreground line-clamp-3 leading-relaxed">{post.excerpt}</p>
                </div>
                <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">{post.date}</span>
                  <div className="text-primary font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
