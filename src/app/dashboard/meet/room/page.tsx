"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  PhoneOff, 
  ScreenShare, 
  MessageSquare, 
  Users, 
  Settings, 
  Globe, 
  MoreVertical,
  Maximize,
  LayoutGrid,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  Circle as RecordIcon,
  Volume2,
  Headphones,
  Shield,
  Zap,
  Languages
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "sonner"

const transcripts = [
  { user: "Sarah Miller", text: "Hello everyone, thanks for joining today's session.", time: "10:01 AM", lang: "en" },
  { user: "Sarah Miller", text: "(Translated) Hola a todos, gracias por unirse a la sesión de hoy.", time: "10:01 AM", lang: "es", isTranslation: true },
  { user: "Marco Rossi", text: "Grazie per l'invito. Sono entusiasta di discutere del progetto.", time: "10:02 AM", lang: "it" },
  { user: "Marco Rossi", text: "(Translated) Thanks for the invitation. I'm excited to discuss the project.", time: "10:02 AM", lang: "en", isTranslation: true },
  { user: "Yuki Tanaka", text: "はじめまして、田中です。よろしくお願いします。", time: "10:03 AM", lang: "ja" },
  { user: "Yuki Tanaka", text: "(Translated) Nice to meet you, I'm Tanaka. Looking forward to working with you.", time: "10:03 AM", lang: "en", isTranslation: true },
]

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Mandarin" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
]

export default function RoomPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("transcript")
  const [isMuted, setIsMuted] = useState(false)
  const [isCameraOff, setIsCameraOff] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isTranslating, setIsTranslating] = useState(true)
  const [localLanguage, setLocalLanguage] = useState("en")
  const [targetLanguage, setTargetLanguage] = useState("es")
  const [isRecording, setIsRecording] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const screenRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const screenStreamRef = useRef<MediaStream | null>(null)
  const router = useRouter()

  const handleDownloadTranscript = () => {
    try {
      const content = transcripts
        .map(t => `[${t.time}] ${t.user}${t.isTranslation ? ' (AI Translation)' : ''}: ${t.text}`)
        .join('\n')
      
      const blob = new Blob([content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `transcript-${new Date().toISOString().split('T')[0]}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast.success("Transcript downloaded successfully")
    } catch (err) {
      toast.error("Failed to download transcript")
    }
  }

  useEffect(() => {
    async function setupMedia() {
      try {
        if (!isCameraOff) {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: true, 
            audio: true 
          })
          streamRef.current = stream
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
          // Initial mute state
          stream.getAudioTracks().forEach(track => track.enabled = !isMuted)
        } else {
          if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop())
            streamRef.current = null
          }
        }
      } catch (err) {
        console.error("Error accessing media devices:", err)
        setIsCameraOff(true)
      }
    }

    setupMedia()

    return () => {
      streamRef.current?.getTracks().forEach(track => track.stop())
    }
  }, [isCameraOff])

  useEffect(() => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach(track => {
        track.enabled = !isMuted
      })
    }
  }, [isMuted])

  useEffect(() => {
    async function handleScreenShare() {
      if (isScreenSharing) {
        try {
          const stream = await navigator.mediaDevices.getDisplayMedia({ video: true })
          screenStreamRef.current = stream
          stream.getTracks()[0].onended = () => setIsScreenSharing(false)
        } catch (err) {
          console.error("Screen share error:", err)
          setIsScreenSharing(false)
        }
      } else {
        screenStreamRef.current?.getTracks().forEach(track => track.stop())
        screenStreamRef.current = null
      }
    }
    handleScreenShare()
  }, [isScreenSharing])

  return (
    <div className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col font-sans">
      {/* Top Bar */}
      <header className="h-16 border-b border-white/5 px-6 flex items-center justify-between bg-zinc-950/50 backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">Global Strategy Sync</h2>
            <Badge variant="outline" className="border-white/10 text-white/60 bg-white/5 font-mono text-[10px]">00:42:15</Badge>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge className="bg-green-500/20 text-green-500 border-none px-3 py-1 flex gap-2 items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.1em] uppercase">AI Engine: Stable</span>
          </Badge>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white/60 hover:text-white rounded-full"
            onClick={() => setIsSettingsOpen(true)}
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Video Area */}
        <div className="flex-1 p-6 flex flex-col gap-6 relative overflow-hidden">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Local Video */}
            <div className="lg:col-span-2 lg:row-span-2 relative rounded-[32px] overflow-hidden border border-white/5 bg-zinc-900 group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 flex items-center justify-center">
                {!isCameraOff ? (
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className="absolute inset-0 w-full h-full object-cover mirror"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-white/5 animate-pulse flex items-center justify-center">
                    <VideoOff className="w-12 h-12 text-white/10" />
                  </div>
                )}
              </div>
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-lg">YOU</div>
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-white">You (Host)</p>
                  <p className="text-[10px] text-white/60 uppercase tracking-widest font-black">
                    {isMuted ? "Muted" : "Speaking: English"}
                  </p>
                </div>
              </div>
              <div className="absolute top-6 right-6 flex gap-2">
                <Badge className="bg-black/40 backdrop-blur-md border-white/10 text-white flex gap-2 items-center px-3 py-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] font-black uppercase">VOICE CLONE ACTIVE</span>
                </Badge>
              </div>
            </div>

            {/* Other Participants */}
            {[
              { name: "Marco Rossi", initials: "MR", lang: "Italian" },
              { name: "Yuki Tanaka", initials: "YT", lang: "Japanese" },
              { name: "David Chen", initials: "DC", lang: "Mandarin" },
              { name: "Elena Gomez", initials: "EG", lang: "Spanish" },
            ].map((p, i) => (
              <div key={i} className="relative rounded-3xl overflow-hidden border border-white/5 bg-zinc-900 shadow-xl aspect-video">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <span className="text-white/20 font-black">{p.initials}</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-zinc-800 flex items-center justify-center text-[10px] text-white font-bold">{p.initials}</div>
                  <p className="text-[10px] font-bold text-white">{p.name}</p>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="p-1 rounded-full bg-black/40 border border-white/10">
                    <MicOff className="w-3 h-3 text-red-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls Bar */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 px-8 py-4 rounded-full bg-zinc-900/80 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] z-20">
            <Button 
              variant={isMuted ? "destructive" : "secondary"} 
              size="icon" 
              className="rounded-full w-12 h-12 transition-all hover:scale-110 active:scale-95"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </Button>
            <Button 
              variant={isCameraOff ? "destructive" : "secondary"} 
              size="icon" 
              className="rounded-full w-12 h-12 transition-all hover:scale-110 active:scale-95"
              onClick={() => setIsCameraOff(!isCameraOff)}
            >
              {isCameraOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            </Button>
            <Button 
              variant={isScreenSharing ? "default" : "secondary"} 
              size="icon" 
              className={cn("rounded-full w-12 h-12 transition-all hover:scale-110", isScreenSharing && "glow-primary")}
              onClick={() => setIsScreenSharing(!isScreenSharing)}
            >
              <ScreenShare className="w-5 h-5" />
            </Button>
            <div className="h-8 w-[1px] bg-white/10 mx-2" />
            <Popover>
              <PopoverTrigger asChild>
                  <Button 
                    variant={isTranslating ? "default" : "secondary"} 
                    className={cn("rounded-full h-12 px-6 gap-2 font-bold transition-all hover:scale-105", isTranslating && "glow-primary")}
                  >
                    <Globe className="w-5 h-5" />
                    {isTranslating ? "Translate: On" : "Translate: Off"}
                  </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-zinc-900 border-white/10 p-6 rounded-[32px] shadow-2xl mb-4" align="center" side="top">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-primary/10">
                        <Languages className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">Live Translation</p>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest font-black">AI Voice Engine</p>
                      </div>
                    </div>
                    <Switch checked={isTranslating} onCheckedChange={setIsTranslating} />
                  </div>
                  
                  {isTranslating && (
                    <div className="space-y-5 pt-4 border-t border-white/5 animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="space-y-2.5">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Language</Label>
                        <Select value={localLanguage} onValueChange={setLocalLanguage}>
                          <SelectTrigger className="bg-white/5 border-white/10 h-12 rounded-2xl focus:ring-primary/20 transition-all">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 border-white/10 text-white rounded-2xl">
                            {languages.map(lang => (
                              <SelectItem key={lang.code} value={lang.code} className="rounded-xl focus:bg-primary/10 focus:text-primary">
                                {lang.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2.5">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Language</Label>
                        <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                          <SelectTrigger className="bg-white/5 border-white/10 h-12 rounded-2xl focus:ring-primary/20 transition-all">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 border-white/10 text-white rounded-2xl">
                            {languages.map(lang => (
                              <SelectItem key={lang.code} value={lang.code} className="rounded-xl focus:bg-primary/10 focus:text-primary">
                                {lang.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                        <div className="space-y-2.5">
                          <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Tone / Emotion</Label>
                          <Select defaultValue="natural">
                            <SelectTrigger className="bg-white/5 border-white/10 h-12 rounded-2xl focus:ring-primary/20 transition-all">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-white/10 text-white rounded-2xl">
                              <SelectItem value="natural" className="rounded-xl">Natural / Preserved</SelectItem>
                              <SelectItem value="formal" className="rounded-xl">Professional / Formal</SelectItem>
                              <SelectItem value="emotive" className="rounded-xl">Expressive / Emotive</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex gap-3 items-start">
                        <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <p className="text-[10px] text-primary/80 leading-relaxed font-medium">
                          AI will now translate all incoming audio to {languages.find(l => l.code === localLanguage)?.name} and your voice to {languages.find(l => l.code === targetLanguage)?.name}.
                        </p>
                      </div>
                    </div>
                  )}

                  {!isTranslating && (
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex gap-3 items-start">
                      <Volume2 className="w-4 h-4 text-white/40 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-white/40 leading-relaxed font-medium">
                        Translation is disabled. You will hear everyone in their original language.
                      </p>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
            <div className="h-8 w-[1px] bg-white/10 mx-2" />
            <Button 
              variant={isRecording ? "destructive" : "secondary"} 
              size="icon" 
              className="rounded-full w-12 h-12 transition-all hover:scale-110"
              onClick={() => setIsRecording(!isRecording)}
            >
              <RecordIcon className={cn("w-5 h-5", isRecording ? "text-white" : "text-red-500", isRecording && "animate-pulse")} />
            </Button>
            <Button 
              variant="secondary" 
              size="icon" 
              className="rounded-full w-12 h-12 transition-all hover:scale-110"
              onClick={() => {
                if (isSidebarOpen && activeTab === "participants") {
                  setIsSidebarOpen(false)
                } else {
                  setIsSidebarOpen(true)
                  setActiveTab("participants")
                }
              }}
            >
              <LayoutGrid className="w-5 h-5" />
            </Button>
            <Button 
              variant="destructive" 
              size="icon" 
              className="rounded-full w-14 h-14 transition-all hover:scale-110 active:scale-90 ml-2"
              onClick={() => router.push("/dashboard/meet")}
            >
              <PhoneOff className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className={cn(
          "bg-zinc-950 border-l border-white/5 transition-all duration-300 flex flex-col relative",
          isSidebarOpen ? "w-96" : "w-0 opacity-0 pointer-events-none"
        )}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <TabsList className="bg-white/5 border border-white/10 rounded-xl p-1 h-10">
                <TabsTrigger value="transcript" className="rounded-lg px-4 text-xs font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Transcript
                </TabsTrigger>
                <TabsTrigger value="chat" className="rounded-lg px-4 text-xs font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Chat
                </TabsTrigger>
                <TabsTrigger value="participants" className="rounded-lg px-4 text-xs font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  People
                </TabsTrigger>
              </TabsList>
              <Button variant="ghost" size="icon" className="text-white/40" onClick={() => setIsSidebarOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <TabsContent value="transcript" className="flex-1 overflow-hidden flex flex-col m-0">
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-6">
                  {transcripts.filter(t => isTranslating || !t.isTranslation).map((t, i) => (
                    <div key={i} className={cn(
                      "space-y-1 group",
                      t.isTranslation ? "pl-4 border-l border-primary/30" : ""
                    )}>
                      <div className="flex items-center justify-between">
                        <span className={cn(
                          "text-[10px] font-black uppercase tracking-widest",
                          t.isTranslation ? "text-primary" : "text-white/60"
                        )}>
                          {t.isTranslation ? `AI TRANSLATION (${localLanguage.toUpperCase()})` : t.user}
                        </span>
                        <span className="text-[9px] text-white/20 opacity-0 group-hover:opacity-100 transition-opacity">{t.time}</span>
                      </div>
                      <p className={cn(
                        "text-sm leading-relaxed font-medium",
                        t.isTranslation ? "text-white/80 italic" : "text-white"
                      )}>
                        {t.text}
                      </p>
                    </div>
                  ))}
                  <div className="flex gap-2 items-center pt-4">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                    <span className="text-[10px] font-bold text-primary italic">Sarah is speaking...</span>
                  </div>
                </div>
              </ScrollArea>
              <div className="p-4 bg-zinc-900/50 border-t border-white/5">
                <Button 
                  className="w-full rounded-xl gap-2 h-11 text-xs font-bold bg-white/5 border border-white/10 hover:bg-white/10 text-white"
                  onClick={handleDownloadTranscript}
                >
                  <RecordIcon className="w-4 h-4" />
                  Download Full Transcript
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="chat" className="flex-1 flex flex-col m-0 p-6">
              <div className="flex-1 flex items-center justify-center text-center">
                <div className="space-y-4 max-w-[200px]">
                  <MessageSquare className="w-12 h-12 text-white/10 mx-auto" />
                  <p className="text-xs text-white/40 font-bold leading-relaxed uppercase tracking-widest">No messages yet. Send a note to the group.</p>
                </div>
              </div>
              <div className="mt-auto relative">
                <Input placeholder="Message everyone..." className="h-12 rounded-xl bg-white/5 border-white/10 text-white pl-4 pr-12 text-xs" />
                <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 text-primary hover:text-primary">
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="participants" className="flex-1 overflow-hidden m-0 p-6">
              <div className="space-y-4">
                {[
                  { name: "Sarah Miller", role: "Host", status: "Active" },
                  { name: "Marco Rossi", role: "Participant", status: "Muted" },
                  { name: "Yuki Tanaka", role: "Participant", status: "Muted" },
                  { name: "David Chen", role: "Participant", status: "Muted" },
                  { name: "Elena Gomez", role: "Participant", status: "Muted" },
                ].map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                        {p.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{p.name}</p>
                        <p className="text-[9px] text-white/40 font-black uppercase tracking-widest">{p.role}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={cn(
                      "text-[9px] border-none font-black uppercase tracking-widest",
                      p.status === "Active" ? "bg-green-500/10 text-green-500" : "bg-white/5 text-white/40"
                    )}>
                      {p.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar Trigger (When closed) */}
        {!isSidebarOpen && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-0 top-1/2 -translate-y-1/2 h-20 w-8 bg-zinc-900 border-l border-y border-white/10 rounded-l-2xl text-white/40 hover:text-white"
            onClick={() => setIsSidebarOpen(true)}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        )}
      </div>

      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-[500px] bg-zinc-900 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Settings</DialogTitle>
            <DialogDescription className="text-white/40">
              Configure your media and AI preferences.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="audio" className="w-full">
            <TabsList className="bg-white/5 border border-white/10 w-full justify-start p-1 h-12 mb-6">
              <TabsTrigger value="audio" className="flex-1 gap-2 text-xs font-bold data-[state=active]:bg-primary">
                <Mic className="w-3.5 h-3.5" /> Audio
              </TabsTrigger>
              <TabsTrigger value="video" className="flex-1 gap-2 text-xs font-bold data-[state=active]:bg-primary">
                <Video className="w-3.5 h-3.5" /> Video
              </TabsTrigger>
              <TabsTrigger value="ai" className="flex-1 gap-2 text-xs font-bold data-[state=active]:bg-primary">
                <Sparkles className="w-3.5 h-3.5" /> AI Features
              </TabsTrigger>
            </TabsList>

            <TabsContent value="audio" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Microphone</Label>
                  <Select defaultValue="default">
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue placeholder="Select Microphone" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-white/10 text-white">
                      <SelectItem value="default">Default - Internal Microphone</SelectItem>
                      <SelectItem value="external">External USB Audio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Speakers</Label>
                  <Select defaultValue="default">
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue placeholder="Select Speaker" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-white/10 text-white">
                      <SelectItem value="default">Default - System Output</SelectItem>
                      <SelectItem value="headphones">Bluetooth Headphones</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Volume2 className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Noise Cancellation</p>
                      <p className="text-[10px] text-white/40">Suppress background sounds</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="video" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Camera</Label>
                  <Select defaultValue="default">
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue placeholder="Select Camera" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-white/10 text-white">
                      <SelectItem value="default">FaceTime HD Camera</SelectItem>
                      <SelectItem value="virtual">OBS Virtual Camera</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Zap className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">HD Video</p>
                      <p className="text-[10px] text-white/40">Stream in 1080p quality</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Shield className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Mirror Video</p>
                      <p className="text-[10px] text-white/40">Flip your camera view</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ai" className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/20">
                        <Globe className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">Live Translation</p>
                        <p className="text-[10px] text-primary/60">Real-time speech to text</p>
                      </div>
                    </div>
                    <Switch checked={isTranslating} onCheckedChange={setIsTranslating} />
                  </div>
                  
                  {isTranslating && (
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary/10 animate-in fade-in slide-in-from-top-2">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">My Language</Label>
                        <Select value={localLanguage} onValueChange={setLocalLanguage}>
                          <SelectTrigger className="bg-white/5 border-white/10 h-10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 border-white/10 text-white">
                            {languages.map(lang => (
                              <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-white/40">Target Language</Label>
                        <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                          <SelectTrigger className="bg-white/5 border-white/10 h-10">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-zinc-900 border-white/10 text-white">
                            {languages.map(lang => (
                              <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Headphones className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Voice Cloning</p>
                      <p className="text-[10px] text-white/40">Match your natural voice tone</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <MessageSquare className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">AI Meeting Summary</p>
                      <p className="text-[10px] text-white/40">Auto-generate notes after call</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </TabsContent>
          </Tabs>

            <div className="flex justify-end pt-4">
              <Button onClick={() => setIsSettingsOpen(false)} className="bg-primary hover:bg-primary/90">
                Save
              </Button>
            </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
