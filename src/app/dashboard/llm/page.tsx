"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Send, 
  Mic, 
  Globe, 
  Brain, 
  Plus, 
  MessageSquare, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  FileText,
  Sparkles,
  Upload,
  Cloud,
  MoreVertical,
  Pencil,
  Trash2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const INITIAL_MESSAGES = [
  { role: "assistant", content: "Hello John! I'm your VertoX AI assistant. I can help you with translations, meeting summaries, or any questions about the platform. How can I assist you today?" }
]

export default function LLMChatPage() {
  const [sessions, setSessions] = useState<{id: number, title: string, date: string, messages: typeof INITIAL_MESSAGES}[]>([])
  const [activeSessionId, setActiveSessionId] = useState<number | null>(null)
  const [messages, setMessages] = useState<{role: string, content: string}[]>([])
  const [inputValue, setInputValue] = useState("")
  const [attachedFiles, setAttachedFiles] = useState<{name: string, type: string}[]>([])
  const [webSearch, setWebSearch] = useState(false)
  const [deepThink, setDeepThink] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isThinking, setIsThinking] = useState(false)
  const [editingSessionId, setEditingSessionId] = useState<number | null>(null)
  const [editingTitle, setEditingTitle] = useState("")
  const [selectedModel, setSelectedModel] = useState("Auto")
  
  const models = [
    { id: "auto", name: "Auto", description: "Best for most tasks" },
    { id: "claude-4.5", name: "Claude Sonnet 4.5", description: "Advanced reasoning & coding" },
    { id: "grok-4.1", name: "Grok 4.1", description: "Real-time info & analysis" },
    { id: "gpt-4o", name: "GPT-4o", description: "Fast & versatile" },
    { id: "llama-3", name: "Llama 3", description: "Open source powerhouse" }
  ]
  
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isThinking])

  const handleSend = (textOverride?: string) => {
    if (!activeSessionId) {
      toast.error("Please start a new chat first")
      return
    }
    const text = textOverride || inputValue
    if (!text.trim() && attachedFiles.length === 0) return
    
    const content = text + (attachedFiles.length > 0 ? `\n\n[Attached Files: ${attachedFiles.map(f => f.name).join(", ")}]` : "")
    const newMessages = [...messages, { role: "user", content }]
    setMessages(newMessages)
    setInputValue("")
    setAttachedFiles([])
    setIsThinking(true)
    
    // Sync with sessions
    setSessions(prev => prev.map(s => 
      s.id === activeSessionId ? { ...s, messages: newMessages } : s
    ))
    
    // Simulate assistant response
    setTimeout(() => {
      const response = { role: "assistant", content: "I've analyzed the files and your request. Based on the VertoX Deep Think engine, I've extracted the key medical terminology and prepared a translation draft for your review." }
      const finalMessages = [...newMessages, response]
      setMessages(finalMessages)
      setIsThinking(false)
      setSessions(prev => prev.map(s => 
        s.id === activeSessionId ? { ...s, messages: finalMessages } : s
      ))
    }, 2000)
  }

  const handleFileUpload = () => {
    const mockFiles = [
      { name: "meeting_notes.pdf", type: "pdf" },
      { name: "quarterly_results.xlsx", type: "xlsx" },
      { name: "system_architecture.png", type: "png" }
    ]
    const randomFile = mockFiles[Math.floor(Math.random() * mockFiles.length)]
    setAttachedFiles(prev => [...prev, randomFile])
    toast.success(`Attached ${randomFile.name}`)
  }

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleNewChat = () => {
    const newId = Date.now()
    const newSession = {
      id: newId,
      title: "New Chat",
      date: "Just now",
      messages: INITIAL_MESSAGES
    }
    setSessions([newSession, ...sessions])
    setActiveSessionId(newId)
    setMessages(INITIAL_MESSAGES)
    toast.success("New chat session started")
  }

  const handleSelectSession = (id: number) => {
    const session = sessions.find(s => s.id === id)
    if (session) {
      setActiveSessionId(id)
      setMessages(session.messages)
    }
  }

  const handleDeleteSession = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    const newSessions = sessions.filter(s => s.id !== id)
    setSessions(newSessions)
    if (activeSessionId === id && newSessions.length > 0) {
      setActiveSessionId(newSessions[0].id)
      setMessages(newSessions[0].messages)
    } else if (newSessions.length === 0) {
      setActiveSessionId(null)
      setMessages([])
    }
    toast.success("Session deleted")
  }

  const handleStartRename = (session: {id: number, title: string}, e: React.MouseEvent) => {
    e.stopPropagation()
    setEditingSessionId(session.id)
    setEditingTitle(session.title)
  }

  const handleSaveRename = (id: number) => {
    if (!editingTitle.trim()) {
      setEditingSessionId(null)
      return
    }
    setSessions(prev => prev.map(s => 
      s.id === id ? { ...s, title: editingTitle } : s
    ))
    setEditingSessionId(null)
    toast.success("Session renamed")
  }

  const handleFeatureNotImplemented = (feature: string) => {
    toast.info(`${feature} feature coming soon!`)
  }

  return (
    <div className="flex h-[calc(100vh-10rem)] bg-card/30 rounded-[32px] border border-border/50 overflow-hidden">
      {/* Chat Sidebar */}
      <motion.div 
        initial={false}
        animate={{ width: isSidebarOpen ? 288 : 0, opacity: isSidebarOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "bg-muted/30 border-r border-border/50 flex flex-col relative overflow-hidden",
          !isSidebarOpen && "pointer-events-none"
        )}
      >
        <div className="p-4 border-b border-border/50 relative z-10">
          <div className="flex gap-2 mb-4">
            <Button 
              className="flex-1 justify-start gap-2 rounded-xl h-11 px-4 group relative overflow-hidden" 
              onClick={handleNewChat}
            >
              <div className="absolute inset-0 bg-primary group-hover:opacity-90 transition-opacity" />
              <div className="relative flex items-center gap-2">
                <Plus className="w-4 h-4" />
                <span className="font-bold">New Chat</span>
              </div>
            </Button>
          </div>
        </div>
        <ScrollArea className="flex-1 relative z-10">
          <div className="p-4 space-y-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4 px-2">Recent Sessions</p>
              <div className="space-y-1">
                <AnimatePresence mode="popLayout">
                  {sessions.map((session) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={session.id} 
                      onClick={() => handleSelectSession(session.id)}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-xl text-left hover:bg-muted/80 transition-all group cursor-pointer relative border border-transparent",
                        session.id === activeSessionId && "bg-muted/80 border-border/50 shadow-sm"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                        session.id === activeSessionId ? "bg-primary/10 text-primary" : "bg-muted/50 text-muted-foreground"
                      )}>
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div className="flex-1 truncate">
                        {editingSessionId === session.id ? (
                          <Input
                            value={editingTitle}
                            onChange={(e) => setEditingTitle(e.target.value)}
                            onBlur={() => handleSaveRename(session.id)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSaveRename(session.id)
                              if (e.key === 'Escape') setEditingSessionId(null)
                            }}
                            className="h-6 text-sm py-0 px-1 bg-transparent border-primary/50 focus-visible:ring-1"
                            autoFocus
                            onClick={(e) => e.stopPropagation()}
                          />
                        ) : (
                          <>
                            <p className="text-sm font-bold truncate leading-tight">{session.title}</p>
                            <p className="text-[10px] text-muted-foreground/60">{session.date}</p>
                          </>
                        )}
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className={cn(
                              "w-8 h-8 rounded-lg transition-opacity",
                              session.id === activeSessionId ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            )}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 p-1.5 rounded-xl bg-card/95 backdrop-blur-xl border-border/50 shadow-2xl">
                          <div className="px-2 py-1.5 text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.15em]">Manage Session</div>
                          <DropdownMenuItem 
                            className="gap-2 rounded-lg cursor-pointer transition-colors py-2"
                            onClick={(e) => handleStartRename(session, e as any)}
                          >
                            <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center">
                              <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                            </div>
                            <span className="font-bold text-xs">Rename Chat</span>
                          </DropdownMenuItem>
                          
                          <DropdownMenuSeparator className="my-1.5 bg-border/50" />
                          
                          <div className="px-2 py-1.5 text-[10px] font-black text-destructive/60 uppercase tracking-[0.15em]">Danger Zone</div>
                          <DropdownMenuItem 
                            className="gap-2 rounded-lg cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 transition-colors py-2"
                            onClick={(e) => handleDeleteSession(session.id, e as any)}
                          >
                            <div className="w-7 h-7 rounded-md bg-destructive/10 flex items-center justify-center">
                              <Trash2 className="w-3.5 h-3.5" />
                            </div>
                            <span className="font-bold text-xs">Delete Session</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {sessions.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-10 px-4 text-center space-y-3 opacity-60"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-muted-foreground/50" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">No recent sessions</p>
                      <p className="text-[10px] text-muted-foreground mt-1">Start a new conversation to see it here</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-background/50 relative">
        <header className="h-16 border-b border-border/50 px-6 flex items-center justify-between backdrop-blur-md bg-background/30 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:bg-muted/80"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
            </Button>
            <div>
              <h2 className="text-sm font-black tracking-tight uppercase tracking-widest">VertoX AI</h2>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                <span className="text-[9px] text-muted-foreground/80 font-bold uppercase tracking-[0.2em]">Deep Think V4 • Active</span>
              </div>
            </div>
          </div>
        </header>

        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 scroll-smooth"
        >
          <AnimatePresence initial={false} mode="popLayout">
            {!activeSessionId ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-8"
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full" />
                  <div className="relative w-24 h-24 rounded-[32px] bg-primary flex items-center justify-center shadow-xl border border-white/10">
                    <Brain className="w-12 h-12 text-primary-foreground" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h1 className="text-4xl font-black tracking-tight text-foreground">
                    Welcome to VertoX AI
                  </h1>
                  <p className="text-muted-foreground font-medium leading-relaxed">
                    Your intelligent companion for translations, meeting summaries, and deep data analysis. Start a new chat to begin your journey.
                  </p>
                </div>
                <Button 
                  size="lg" 
                  className="rounded-2xl px-8 h-14 font-bold text-lg group relative overflow-hidden transition-all hover:scale-105"
                  onClick={handleNewChat}
                >
                  <div className="absolute inset-0 bg-primary group-hover:opacity-90 transition-opacity" />
                  <span className="relative flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Start New Chat
                  </span>
                </Button>
              </motion.div>
            ) : (
              messages.map((message, i) => (
                <motion.div 
                  key={`${activeSessionId}-${i}`} 
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.4, 
                    ease: [0.23, 1, 0.32, 1],
                    delay: i === messages.length - 1 ? 0 : 0.05 
                  }}
                  className={cn(
                    "flex gap-4 max-w-4xl",
                    message.role === "user" ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center font-bold text-sm shadow-lg border border-white/5",
                    message.role === "assistant" ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
                  )}>
                    {message.role === "assistant" ? <Brain className="w-5 h-5" /> : "JD"}
                  </div>
                  <div className={cn(
                    "p-5 rounded-[24px] text-sm leading-relaxed relative overflow-hidden",
                    message.role === "assistant" 
                      ? "bg-card border border-border/50 rounded-tl-none shadow-xl backdrop-blur-sm" 
                      : "bg-muted text-foreground rounded-tr-none font-medium shadow-xl border border-border/50"
                  )}>
                    {message.content}
                  </div>
                </motion.div>
              ))
            )}
            {isThinking && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 max-w-4xl"
              >
                <div className="w-10 h-10 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg border border-white/5 animate-pulse">
                  <Brain className="w-5 h-5" />
                </div>
                <div className="bg-card border border-border/50 p-5 rounded-[24px] rounded-tl-none shadow-xl backdrop-blur-sm flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-6 md:p-10 pt-0 bg-gradient-to-t from-background via-background to-transparent pb-8">
            <div className="max-w-4xl mx-auto relative group">
                <div className="relative bg-card/80 border border-border/50 rounded-[28px] p-2 shadow-2xl backdrop-blur-xl flex flex-col">
                <AnimatePresence>
                {attachedFiles.length > 0 && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="flex flex-wrap gap-2 p-2 border-b border-border/50 overflow-hidden"
                  >
                    {attachedFiles.map((file, i) => (
                      <motion.div 
                        key={`${file.name}-${i}`}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center gap-2 bg-muted/50 border border-border/50 rounded-xl px-3 py-1.5 text-[11px] font-bold group"
                      >
                        <FileText className="w-3.5 h-3.5 text-primary" />
                        <span className="truncate max-w-[120px]">{file.name}</span>
                        <button 
                          onClick={() => removeFile(i)}
                          className="hover:text-destructive transition-colors ml-1"
                        >
                          <Plus className="w-3.5 h-3.5 rotate-45" />
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="flex items-end gap-2">
                <div className="flex gap-1 pb-1 px-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-xl text-muted-foreground hover:bg-muted/80 hover:text-primary transition-colors"
                      >
                        <Plus className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-64 p-2 rounded-2xl bg-card/95 backdrop-blur-xl border-border/50 shadow-2xl">
                      <DropdownMenuItem 
                        className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-muted/80 focus:bg-muted/80 group transition-all"
                        onClick={handleFileUpload}
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Upload className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-sm">Upload files</p>
                          <p className="text-[10px] text-muted-foreground">PDF, Excel, Images</p>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-muted/80 focus:bg-muted/80 group transition-all"
                        onClick={() => handleFeatureNotImplemented("Add from Drive")}
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Cloud className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-sm">Add from Drive</p>
                          <p className="text-[10px] text-muted-foreground">Sync documents</p>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-muted/80 focus:bg-muted/80 group transition-all"
                        onClick={() => setWebSearch(!webSearch)}
                      >
                        <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Globe className="w-4 h-4" />
                        </div>
                        <div className="flex-1 flex items-center justify-between">
                          <div>
                            <p className="font-bold text-sm">Web Search</p>
                            <p className="text-[10px] text-muted-foreground">Live information</p>
                          </div>
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            webSearch ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-muted-foreground/30"
                          )} />
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-xl text-muted-foreground hover:bg-muted/80 hover:text-primary transition-colors"
                    onClick={() => handleFeatureNotImplemented("Voice Input")}
                  >
                    <Mic className="w-5 h-5" />
                  </Button>
                </div>
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  disabled={!activeSessionId}
                  placeholder={activeSessionId ? "Ask VertoX anything..." : "Start a new chat to begin..."}
                  className="flex-1 bg-transparent border-none focus:ring-0 resize-none min-h-[52px] max-h-[200px] py-4 text-sm font-medium placeholder:text-muted-foreground/50 disabled:opacity-50"
                  rows={1}
                />
                <div className="flex gap-2 pb-1 px-1 items-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-9 px-3 gap-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-muted transition-all border border-border/50"
                      >
                        {selectedModel}
                        <ChevronDown className="w-3 h-3 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl bg-card/95 backdrop-blur-xl border-border/50 shadow-2xl">
                      <div className="px-3 py-2 text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.2em] border-b border-border/50 mb-1">Select AI Model</div>
                      {models.map((model) => (
                        <DropdownMenuItem 
                          key={model.id}
                          className={cn(
                            "flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all group",
                            selectedModel === model.name ? "bg-muted text-foreground" : "hover:bg-muted/80"
                          )}
                          onClick={() => {
                            setSelectedModel(model.name)
                            toast.success(`Switched to ${model.name}`)
                          }}
                        >
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110",
                            selectedModel === model.name ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
                          )}>
                            <Brain className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-xs">{model.name}</p>
                            <p className="text-[9px] text-muted-foreground leading-tight">{model.description}</p>
                          </div>
                          {selectedModel === model.name && (
                            <div className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
                          )}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button 
                    onClick={() => handleSend()}
                    disabled={(!inputValue.trim() && attachedFiles.length === 0) || !activeSessionId}
                    className="rounded-2xl h-12 w-12 p-0 bg-white text-black hover:bg-zinc-100 border border-zinc-200 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 group relative"
                  >
                    <Send className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {[
                { text: "Summarize meeting #482", icon: Clock },
                { text: "Analyze medical terms in Spanish", icon: Globe },
                { text: "Check transcription accuracy", icon: FileText }
              ].map((prompt) => (
                <Badge 
                  key={prompt.text}
                  variant="outline" 
                  className="bg-muted/30 border-border/50 text-[10px] font-bold py-1.5 px-4 cursor-pointer hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all rounded-full flex items-center gap-1.5"
                  onClick={() => handleSend(prompt.text)}
                >
                  <prompt.icon className="w-3 h-3 opacity-60" />
                  {prompt.text}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
