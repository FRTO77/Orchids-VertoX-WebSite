"use client"

import { useState } from "react"
import { 
  Code2, 
  Terminal, 
  Cpu, 
  Layers, 
  Check, 
  Copy, 
  ArrowRight,
  Sparkles,
  Zap,
  Globe,
  Database,
  Lock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LovableBackground } from "@/components/LovableBackground"
import { motion } from "framer-motion"

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

const data = await response.json();
console.log(data.translated_audio_url);`,
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

response = requests.post(url, json=payload, headers=headers)
print(response.json())`
}

export default function APIPage() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <LovableBackground />
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center mb-32">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 space-y-8 text-center lg:text-left"
            >
              <Badge variant="outline" className="py-1.5 px-4 bg-primary/10 border-primary/20 text-primary uppercase tracking-widest font-bold">
                Developer API
              </Badge>
              <h1 className="text-5xl md:text-7xl font-heading font-black leading-tight">Build the future of <br /><span className="text-primary italic">Global Voice.</span></h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Integrate VertoX's world-class real-time translation and voice cloning into your own applications with our robust, low-latency API.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="rounded-2xl px-10 h-16 text-xl font-bold glow-primary">
                  Get API Key <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-2xl px-10 h-16 text-xl font-bold border-white/20">
                  Documentation
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex-1 w-full max-w-2xl"
            >
              <Card className="rounded-[40px] border-border/50 bg-black/40 backdrop-blur-xl overflow-hidden shadow-2xl">
                <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <Badge variant="outline" className="text-[10px] border-white/10 text-white/40 uppercase tracking-widest">v1.0 / translate</Badge>
                </div>
                <CardContent className="p-0">
                  <Tabs defaultValue="curl">
                    <div className="px-6 pt-6">
                      <TabsList className="bg-white/5 border border-white/10 rounded-2xl p-1">
                        <TabsTrigger value="curl" className="rounded-xl px-6 font-bold data-[state=active]:bg-primary">cURL</TabsTrigger>
                        <TabsTrigger value="javascript" className="rounded-xl px-6 font-bold data-[state=active]:bg-primary">JS</TabsTrigger>
                        <TabsTrigger value="python" className="rounded-xl px-6 font-bold data-[state=active]:bg-primary">Python</TabsTrigger>
                      </TabsList>
                    </div>
                    {Object.entries(codeSnippets).map(([key, code]) => (
                      <TabsContent key={key} value={key} className="m-0 p-8 relative">
                        <div className="rounded-2xl bg-black/40 border border-white/5 p-6 font-mono text-sm leading-relaxed overflow-hidden">
                          <pre className="text-zinc-300 overflow-x-auto">
                            <code>{code}</code>
                          </pre>
                        </div>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="absolute top-12 right-12 text-white/40 hover:text-white hover:bg-white/5"
                          onClick={() => copyToClipboard(code)}
                        >
                          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            {[
              { icon: Zap, color: "text-blue-500", title: "Ultra Low Latency", desc: "Our optimized WebSocket protocol ensures sub-500ms latency for live streaming audio translation." },
              { icon: Sparkles, color: "text-purple-500", title: "Neural Voice Sync", desc: "Automatically maintain emotional context and speech patterns across every translated language." },
              { icon: Database, color: "text-orange-500", title: "Scalable Infrastructure", desc: "Built on a global network of GPU clusters, ready to handle millions of requests concurrently." }
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                className="glass p-10 rounded-[40px] border-border/50 hover:border-primary/50 transition-all"
              >
                <div className={`w-14 h-14 rounded-2xl bg-muted flex items-center justify-center ${f.color} mb-6`}>
                  <f.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="glass p-12 md:p-20 rounded-[60px] border-primary/20 bg-primary/5 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <Code2 className="w-64 h-64 text-primary" />
            </div>
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Ready to integrate?</h2>
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                Join 500+ companies building on VertoX. Get started with 1000 free API credits today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="rounded-2xl px-12 h-16 text-xl font-bold glow-primary">Create Developer Account</Button>
                <Button size="lg" variant="outline" className="rounded-2xl px-12 h-16 text-xl font-bold border-white/20">Contact API Support</Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
