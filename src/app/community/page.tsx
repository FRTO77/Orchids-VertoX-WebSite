"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LovableBackground } from "@/components/LovableBackground"
import { motion } from "framer-motion"
import { MessageSquare, Github, Twitter, Disc as Discord, Users, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CommunityPage() {
  const social = [
    { name: "Discord", icon: Discord, color: "bg-[#5865F2]", members: "12k+" },
    { name: "Twitter", icon: Twitter, color: "bg-[#1DA1F2]", members: "45k+" },
    { name: "GitHub", icon: Github, color: "bg-[#333]", members: "2.5k stars" },
  ]

  return (
    <div className="min-h-screen flex flex-col relative">
      <LovableBackground />
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-4 text-center">
        <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <h1 className="text-5xl md:text-7xl font-heading font-black mb-6 text-white">Join the <span className="text-primary">VertoX</span> Community.</h1>
              <p className="text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
                Connect with thousands of developers, linguists, and AI enthusiasts building the future of global communication.
              </p>
            </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {social.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                  className="glass p-8 rounded-[40px] border-border/50 hover:border-primary/50 transition-all duration-300 group"
                >
                  <div className={`w-16 h-16 ${s.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl`}>
                    <s.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white">{s.name}</h3>
                <div className="text-sm text-primary font-bold mb-6">{s.members} members</div>
                <Button className="w-full rounded-2xl py-6 font-bold group-hover:glow-primary transition-all">
                  Join Now
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass p-10 rounded-[40px] border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <Users className="w-12 h-12 text-primary mb-6" />
                <h2 className="text-3xl font-bold mb-4 text-white">VertoX Champions</h2>
                <p className="text-zinc-300 mb-6 leading-relaxed">
                  Apply to our Ambassador program. Get early access to new features, exclusive swag, and opportunities to represent VertoX at global conferences.
                </p>
                <Button variant="outline" className="rounded-xl border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300">Learn More</Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass p-10 rounded-[40px] border-border/50 hover:border-purple-500/30 transition-all duration-300"
              >
                <Sparkles className="w-12 h-12 text-purple-500 mb-6" />
                <h2 className="text-3xl font-bold mb-4 text-white">Community Projects</h2>
                <p className="text-zinc-300 mb-6 leading-relaxed">
                  Explore open-source translations, custom voice models, and creative integrations built by our community using the VertoX API.
                </p>
                <Button variant="outline" className="rounded-xl border-purple-500/30 text-purple-500 hover:bg-purple-500/10 transition-all duration-300">Explore Gallery</Button>
              </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
