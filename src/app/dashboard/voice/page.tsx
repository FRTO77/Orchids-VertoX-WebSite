"use client"

import { useState, useEffect } from "react"
import { 
  Mic, 
  Square, 
  Play, 
  Pause, 
  Globe, 
  Download, 
  Share2, 
  Sparkles, 
  History, 
  MoreHorizontal,
  ChevronDown
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"

const voiceHistory = [
  { 
    id: 1, 
    title: "Coffee Shop Order", 
    lang: "EN → FR", 
    date: "10 mins ago", 
    duration: "0:45",
    sourceLang: "English",
    targetLang: "French",
    sourceText: "I'd like a large latte and a croissant, please.",
    targetText: "Je voudrais un grand latte et un croissant, s'il vous plaît."
  },
  { 
    id: 2, 
    title: "Museum Tour Guide", 
    lang: "JP → EN", 
    date: "2 hours ago", 
    duration: "12:30",
    sourceLang: "Japanese",
    targetLang: "English",
    sourceText: "こちらは江戸時代に作られた非常に貴重な屏風です。",
    targetText: "This is a very valuable folding screen made during the Edo period."
  },
  { 
    id: 3, 
    title: "Technical Support Call", 
    lang: "EN → ES", 
    date: "Yesterday", 
    duration: "5:12",
    sourceLang: "English",
    targetLang: "Spanish",
    sourceText: "My internet connection has been dropping every few minutes since this morning.",
    targetText: "Mi conexión a Internet se ha estado cayendo cada pocos minutos desde esta mañana."
  },
]

const languages = [
  { value: "en", label: "English" },
  { value: "kk", label: "Kazakh" },
  { value: "fr", label: "French" },
  { value: "es", label: "Spanish" },
  { value: "ru", label: "Russian" },
  { value: "ko", label: "Korean" },
  { value: "ja", label: "Japanese" },
  { value: "de", label: "German" },
  { value: "uz", label: "Uzbek" },
]

export default function VoicePage() {
  const [isRecording, setIsRecording] = useState(false)
  const [timer, setTimer] = useState(0)
  const [selectedItem, setSelectedItem] = useState<typeof voiceHistory[0] | null>(null)
  const [sourceLang, setSourceLang] = useState("en")
  const [targetLang, setTargetLang] = useState("es")

  useEffect(() => {
    let interval: any
    if (isRecording) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1)
      }, 1000)
    } else {
      setTimer(0)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-heading font-black">Voice Translation</h1>
          <p className="text-muted-foreground">Translate live conversations instantly with your cloned voice.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-3 p-2 bg-muted/50 rounded-2xl border border-border/50">
            <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest px-2">Voice Clone: Active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-[40px] border-border/50 bg-card/50 overflow-hidden relative">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-20" />
            <CardContent className="p-10 flex flex-col items-center gap-12">
              <div className="w-full flex justify-between items-center bg-muted/30 p-4 rounded-3xl border border-border/50">
                <div className="flex-1 flex flex-col items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Source</span>
                  <Select 
                    value={selectedItem ? (selectedItem.sourceLang === "Japanese" ? "ja" : "en") : sourceLang} 
                    onValueChange={setSourceLang}
                    disabled={!!selectedItem}
                  >
                    <SelectTrigger className="border-none bg-transparent shadow-none font-bold text-lg h-auto p-0 justify-center gap-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center">
                  <Globe className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Target</span>
                  <Select 
                    value={selectedItem ? (selectedItem.targetLang === "Spanish" ? "es" : selectedItem.targetLang === "French" ? "fr" : "en") : targetLang} 
                    onValueChange={setTargetLang}
                    disabled={!!selectedItem}
                  >
                    <SelectTrigger className="border-none bg-transparent shadow-none font-bold text-lg h-auto p-0 justify-center gap-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedItem ? (
                <div className="w-full flex flex-col items-center gap-6">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="px-4 py-1 rounded-full border-primary/20 bg-primary/5 text-primary font-bold">
                      Historical Record: {selectedItem.title}
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-full text-[10px] font-bold uppercase tracking-tighter h-8"
                      onClick={() => setSelectedItem(null)}
                    >
                      New Recording
                    </Button>
                  </div>
                  <div className="text-4xl font-black font-mono tracking-tight text-muted-foreground/50">
                    {selectedItem.duration}
                  </div>
                </div>
              ) : (
                <div className="relative flex flex-col items-center gap-8">
                  <div className="flex gap-1 items-center h-24">
                    <AnimatePresence>
                      {isRecording ? (
                        [...Array(12)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 10 }}
                            animate={{ height: [10, 40 + Math.random() * 60, 10] }}
                            transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }}
                            className="w-1.5 bg-primary rounded-full"
                          />
                        ))
                      ) : (
                        <div className="h-[2px] w-64 bg-border/50 rounded-full" />
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="text-4xl font-black font-mono tracking-tight text-primary">
                    {formatTime(timer)}
                  </div>

                  <Button 
                    onClick={() => setIsRecording(!isRecording)}
                    className={cn(
                      "w-24 h-24 rounded-full transition-all duration-500 flex items-center justify-center",
                      isRecording 
                        ? "bg-destructive hover:bg-destructive/90 scale-110 shadow-[0_0_30px_rgba(239,68,68,0.3)]" 
                        : "bg-primary hover:bg-primary/90 glow-primary"
                    )}
                  >
                    {isRecording ? <Square className="w-8 h-8" /> : <Mic className="w-10 h-10" />}
                  </Button>
                </div>
              )}

              <div className="w-full space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-[1px] flex-1 bg-border/50" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    {selectedItem ? "Transcription Detail" : "Live Translation"}
                  </span>
                  <div className="h-[1px] flex-1 bg-border/50" />
                </div>
                
                <div className="space-y-4">
                  <div className="p-6 rounded-3xl bg-muted/30 border border-border/50">
                    <p className="text-sm font-medium italic opacity-60 mb-2">
                      {selectedItem ? `${selectedItem.sourceLang} (Source):` : "English (Me):"}
                    </p>
                    <p className="text-lg font-bold">
                      "{selectedItem ? selectedItem.sourceText : "Could you tell me how much this costs?"}"
                    </p>
                  </div>
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={selectedItem?.id || "live"}
                    className="p-6 rounded-3xl bg-primary/10 border border-primary/20"
                  >
                    <p className="text-sm font-bold text-primary mb-2">
                      {selectedItem ? `${selectedItem.targetLang} (Translation):` : "Spanish (VertoX):"}
                    </p>
                    <p className="text-lg font-bold italic">
                      "{selectedItem ? selectedItem.targetText : "¿Podría decirme cuánto cuesta esto?"}"
                    </p>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <Card className="rounded-[32px] border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-heading font-bold">History</CardTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full"
                onClick={() => setSelectedItem(null)}
              >
                <History className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4 pr-4">
                  {voiceHistory.map((item) => (
                    <div 
                      key={item.id} 
                      onClick={() => setSelectedItem(item)}
                      className={cn(
                        "p-4 rounded-2xl border transition-all group cursor-pointer",
                        selectedItem?.id === item.id 
                          ? "border-primary bg-primary/5 shadow-sm" 
                          : "border-transparent hover:border-border hover:bg-muted/30"
                      )}
                    >                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className="text-[9px] font-black border-primary/20 text-primary uppercase">{item.lang}</Badge>
                        <span className="text-[10px] text-muted-foreground">{item.date}</span>
                      </div>
                      <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground">{item.duration} Duration</span>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" className="w-7 h-7 rounded-lg">
                            <Download className="w-3.5 h-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="w-7 h-7 rounded-lg">
                            <Share2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="rounded-[32px] border-border/50 bg-primary overflow-hidden relative group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.2),transparent)]" />
            <CardHeader>
              <CardTitle className="text-xl font-heading font-bold text-primary-foreground">Upgrade for Offline</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-primary-foreground/80 mb-6">Download language packs for offline voice translation anywhere in the world.</p>
              <Button className="w-full bg-white text-primary hover:bg-white/90 rounded-xl font-bold">Explore Pro</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
