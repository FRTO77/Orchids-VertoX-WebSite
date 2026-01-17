"use client"

import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const editorialEase = [0.22, 1, 0.36, 1]

const featuredPost = {
  title: "Beyond Translation: Preserving Human Emotion in Every Language",
  excerpt: "Our latest breakthrough in neural synthesis allows VertoX to capture and translate micro-expressions in voice tone, ensuring your message is felt, not just heard.",
  date: "June 1, 2024",
  category: "Research",
  image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=2070"
}

const posts = [
  {
    title: "The Future of Neural Voice Cloning",
    excerpt: "How VertoX is achieving high vocal similarity while reducing latency to sub-second levels.",
    date: "May 24, 2024",
    category: "AI Research",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=2070"
  },
  {
    title: "Breaking Language Barriers in Global Teams",
    excerpt: "A case study on how multi-national corporations are using VertoX to streamline communication.",
    date: "May 18, 2024",
    category: "Enterprise",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070"
  },
  {
    title: "Announcing VertoX API v2.0",
    excerpt: "New endpoints for real-time streaming, emotional preservation, and 50 additional languages.",
    date: "May 12, 2024",
    category: "Product",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=2070"
  }
]

export default function BlogPage() {
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
            <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-6">Blog</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-[0.85]">
              Inside <em className="italic">VertoX</em>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: editorialEase, delay: 0.2 }}
            className="mb-24"
          >
            <Link href="#" className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100 transition-all duration-1000"
                  />
                </div>
                <div className="bg-black dark:bg-white text-white dark:text-black p-10 md:p-16 flex flex-col justify-center">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40 dark:text-black/40 mb-4">
                    Featured / {featuredPost.category}
                  </p>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light leading-[0.95] mb-6 group-hover:translate-x-2 transition-transform duration-500">
                    {featuredPost.title}
                  </h2>
                  <p className="text-white/60 dark:text-black/60 font-light leading-relaxed mb-8">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.3em] text-white/40 dark:text-black/40">
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-2 text-sm font-light group-hover:gap-4 transition-all duration-300">
                      Read Article <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-8">Latest Articles</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 dark:bg-white/10">
            {posts.map((post, i) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: editorialEase, delay: i * 0.1 }}
              >
                <Link href="#" className="group block bg-white dark:bg-black h-full">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100 transition-all duration-1000"
                    />
                  </div>
                  <div className="p-8">
                    <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-4">
                      {post.category}
                    </p>
                    <h3 className="text-xl md:text-2xl font-serif font-light leading-tight mb-4 group-hover:translate-x-2 transition-transform duration-500">
                      {post.title}
                    </h3>
                    <p className="text-sm text-black/60 dark:text-white/60 font-light leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t border-black/10 dark:border-white/10">
                      <span className="text-xs text-black/40 dark:text-white/40">{post.date}</span>
                      <ArrowRight className="w-4 h-4 text-black/40 dark:text-white/40 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
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
