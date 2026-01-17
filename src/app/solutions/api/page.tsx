"use client"

import { useState } from "react"
import Link from "next/link"
import { Code2, Terminal, Check, Copy, ArrowRight, Zap, Sparkles, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

const editorialEase = [0.22, 1, 0.36, 1]

const codeSnippets = {
  curl: `curl -X POST https://api.vertox.ai/v1/translate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "audio_url": "https://example.com/meeting.wav",
    "source_lang": "en",
    "target_lang": "es",
    "voice_clone": true
  }'`,
  javascript: `const response = await fetch('https://api.vertox.ai/v1/translate', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    audio_url: 'https://example.com/meeting.wav',
    source_lang: 'en',
    target_lang: 'es',
    voice_clone: true
  })
});

const data = await response.json();`,
  python: `import requests

url = "https://api.vertox.ai/v1/translate"
payload = {
    "audio_url": "https://example.com/meeting.wav",
    "source_lang": "en",
    "target_lang": "es",
    "voice_clone": True
}
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)`
}

const features = [
  { icon: Zap, title: "Ultra Low Latency", desc: "Sub-500ms latency for live streaming audio translation." },
  { icon: Sparkles, title: "Neural Voice Sync", desc: "Maintain emotional context across every language." },
  { icon: Database, title: "Scalable Infrastructure", desc: "Global GPU clusters ready for millions of requests." }
]

export default function APIPage() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
            <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-6">Developer API</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-[0.85] mb-8">
              Build the future of <em className="italic">global</em> voice
            </h1>
            <p className="text-lg text-black/60 dark:text-white/60 font-light max-w-2xl mx-auto mb-12">
              Integrate real-time translation and voice cloning into your applications with our robust, low-latency API.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button className="rounded-full h-14 px-10 text-sm uppercase tracking-[0.2em] font-medium bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80 transition-all duration-500">
                  Get API Key
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="outline" className="rounded-full h-14 px-10 text-sm uppercase tracking-[0.2em] font-medium border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-500">
                  Documentation
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: editorialEase, delay: 0.2 }}
            className="bg-black dark:bg-white text-white dark:text-black mb-24"
          >
            <div className="p-6 border-b border-white/10 dark:border-black/10 flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-white/20 dark:bg-black/20" />
                <div className="w-3 h-3 rounded-full bg-white/20 dark:bg-black/20" />
                <div className="w-3 h-3 rounded-full bg-white/20 dark:bg-black/20" />
              </div>
              <span className="text-xs uppercase tracking-[0.3em] text-white/40 dark:text-black/40">v1.0 / translate</span>
            </div>
            
            <Tabs defaultValue="curl" className="w-full">
              <div className="px-6 pt-6">
                <TabsList className="bg-white/5 dark:bg-black/5 border border-white/10 dark:border-black/10 p-1 rounded-full">
                  <TabsTrigger value="curl" className="rounded-full px-6 text-sm data-[state=active]:bg-white data-[state=active]:text-black dark:data-[state=active]:bg-black dark:data-[state=active]:text-white">cURL</TabsTrigger>
                  <TabsTrigger value="javascript" className="rounded-full px-6 text-sm data-[state=active]:bg-white data-[state=active]:text-black dark:data-[state=active]:bg-black dark:data-[state=active]:text-white">JavaScript</TabsTrigger>
                  <TabsTrigger value="python" className="rounded-full px-6 text-sm data-[state=active]:bg-white data-[state=active]:text-black dark:data-[state=active]:bg-black dark:data-[state=active]:text-white">Python</TabsTrigger>
                </TabsList>
              </div>
              {Object.entries(codeSnippets).map(([key, code]) => (
                <TabsContent key={key} value={key} className="m-0 p-6 relative">
                  <div className="border border-white/10 dark:border-black/10 p-6 font-mono text-sm leading-relaxed overflow-x-auto">
                    <pre className="text-white/80 dark:text-black/80">
                      <code>{code}</code>
                    </pre>
                  </div>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="absolute top-10 right-10 text-white/40 dark:text-black/40 hover:text-white dark:hover:text-black hover:bg-white/5 dark:hover:bg-black/5"
                    onClick={() => copyToClipboard(code)}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 dark:bg-white/10 mb-24">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: editorialEase, delay: i * 0.1 }}
                className="bg-white dark:bg-black p-10 md:p-12 group hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-700"
              >
                <f.icon className="w-8 h-8 mb-6 text-black/40 dark:text-white/40 group-hover:text-white/40 dark:group-hover:text-black/40 transition-colors duration-700" />
                <h3 className="text-2xl font-serif font-light mb-4">{f.title}</h3>
                <p className="text-sm text-black/60 dark:text-white/60 group-hover:text-white/60 dark:group-hover:text-black/60 font-light leading-relaxed transition-colors duration-700">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: editorialEase }}
            className="border border-black/10 dark:border-white/10 p-12 md:p-20 text-center"
          >
            <Code2 className="w-12 h-12 mx-auto mb-8 text-black/20 dark:text-white/20" />
            <h2 className="text-4xl md:text-5xl font-serif font-light leading-[0.9] mb-6">
              Ready to <em className="italic">integrate</em>?
            </h2>
            <p className="text-black/60 dark:text-white/60 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
              Join 500+ companies building on VertoX. Get started with 1000 free API credits today.
            </p>
            <Link href="/signup">
              <Button className="rounded-full h-16 px-12 text-sm uppercase tracking-[0.2em] font-medium bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80 transition-all duration-500">
                Create Developer Account
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
