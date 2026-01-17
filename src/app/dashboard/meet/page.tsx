"use client"

import { useState, useEffect, useCallback } from "react"
import { Video, Link as LinkIcon, Calendar as CalendarIcon, Users, Clock, ChevronRight, Globe, Copy, Check, Sparkles, Share2, Mail, Text, Trash2, Fingerprint, User as UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function MeetPage() {
  const [meetingCode, setMeetingCode] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false)
  const [generatedId, setGeneratedId] = useState("")
  const [copied, setCopied] = useState(false)
  const [baseUrl, setBaseUrl] = useState("")
  
  const [meetings, setMeetings] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [personalId, setPersonalId] = useState<string>("")
  const [isProfileLoading, setIsProfileLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  const generateId = (format: "room" | "simple" = "room") => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
    const gen = (len: number) => Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
    
    if (format === "room") {
      return `${gen(3)}-${gen(4)}-${gen(3)}`
    }
    return gen(10)
  }

  const fetchProfile = useCallback(async (currentUser: any) => {
    if (!currentUser) return
    setIsProfileLoading(true)
    try {
      let { data, error } = await supabase
        .from("profiles")
        .select("personal_id")
        .eq("id", currentUser.id)
        .maybeSingle()
      
      if (!data && !error) {
        const newPersonalId = generateId("simple")
        const { data: newData, error: insertError } = await supabase
          .from("profiles")
          .insert([{ id: currentUser.id, personal_id: newPersonalId }])
          .select("personal_id")
          .single()
        
        if (newData) setPersonalId(newData.personal_id)
        if (insertError) throw insertError
      } else if (data) {
        setPersonalId(data.personal_id)
      } else if (error) {
        throw error
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
      toast.error("Could not load your profile")
    } finally {
      setIsProfileLoading(false)
    }
  }, [])

  const fetchMeetings = useCallback(async (currentUser: any) => {
    if (!currentUser) return
    setIsLoading(true)
    const { data, error } = await supabase
      .from("scheduled_meetings")
      .select("*")
      .eq("user_id", currentUser.id)
      .order("meeting_time", { ascending: true })
    
    if (error) {
      toast.error("Failed to fetch meetings")
    } else {
      setMeetings(data || [])
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    setBaseUrl(window.location.origin)
    const checkUser = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      if (currentUser) {
        setUser(currentUser)
        fetchMeetings(currentUser)
        fetchProfile(currentUser)
        setScheduleData(prev => ({ ...prev, senderEmail: currentUser.email || "hello@vertox.ai" }))
      }
    }
    checkUser()
  }, [fetchMeetings, fetchProfile])

  const getCleanCode = (input: string) => {
    if (!input) return ""
    if (input.includes("id=")) {
      const urlParams = new URLSearchParams(input.split('?')[1] || input)
      return urlParams.get('id') || input.trim()
    }
    return input.trim()
  }

  const isValidMeetingCode = (input: string) => {
    const code = getCleanCode(input)
    const roomRegex = /^[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{3}$/i
    const simpleRegex = /^[a-z0-9]{9,12}$/i
    return roomRegex.test(code) || simpleRegex.test(code)
  }

  const isCodeValid = isValidMeetingCode(meetingCode)

  const [scheduleData, setScheduleData] = useState({
    title: "",
    recipientEmail: "",
    senderEmail: "hello@vertox.ai",
    description: "",
    date: new Date(),
    time: "12:00",
  })

  const handleNewMeeting = () => {
    const newId = generateId("room")
    setGeneratedId(newId)
    setIsDialogOpen(true)
    
    const newLink = `${window.location.origin}/dashboard/meet/room?id=${newId}`
    navigator.clipboard.writeText(newLink).then(() => {
      setCopied(true)
      toast.success("Meeting link generated and copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const handleSchedule = async () => {
    if (!scheduleData.title || !scheduleData.recipientEmail) {
      toast.error("Please fill in all required fields")
      return
    }

    if (!user) {
      toast.error("You must be logged in to schedule meetings")
      return
    }

    const meetingId = generateId("simple")
    const meetingLink = `${baseUrl}/dashboard/meet/room?id=${meetingId}`
    const meetingTime = new Date(scheduleData.date)
    const [hours, minutes] = scheduleData.time.split(":")
    meetingTime.setHours(parseInt(hours), parseInt(minutes))

    const newMeeting = {
      title: scheduleData.title,
      recipient_email: scheduleData.recipientEmail,
      sender_email: scheduleData.senderEmail,
      description: scheduleData.description || `Meeting link: ${meetingLink}`,
      meeting_link: meetingLink,
      meeting_time: meetingTime.toISOString(),
      user_id: user.id
    }

    try {
      const response = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMeeting),
      })
      
      const result = await response.json()
      
      if (response.ok) {
        toast.success("Meeting scheduled and invitation sent!")
        setIsScheduleDialogOpen(false)
        fetchMeetings(user)
        setScheduleData({
          title: "",
          recipientEmail: "",
          senderEmail: user?.email || "hello@vertox.ai",
          description: "",
          date: new Date(),
          time: "12:00",
        })
      } else {
        toast.error(result.error || "Failed to schedule meeting")
      }
    } catch (err) {
      toast.error("Failed to connect to the server")
    }
  }

  const handleDeleteMeeting = async (id: string) => {
    const { error } = await supabase
      .from("scheduled_meetings")
      .delete()
      .eq("id", id)

    if (error) {
      toast.error("Failed to delete meeting")
    } else {
      toast.success("Meeting deleted successfully")
      if (user) fetchMeetings(user)
    }
  }

  const currentMeetingLink = `${baseUrl}/dashboard/meet/room?id=${generatedId}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentMeetingLink)
      setCopied(true)
      toast.success("Link copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error("Failed to copy link")
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-heading font-black">Meetings</h1>
          <p className="text-muted-foreground">Start a new meeting or join an existing one with real-time translation.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-md w-[95vw] max-h-[90vh] overflow-y-auto rounded-[24px] border-border/50 bg-card/95 backdrop-blur-3xl shadow-2xl p-0 scrollbar-none">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
              
              <DialogHeader className="p-6 pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <DialogTitle className="text-xl font-heading font-black">Meeting Ready</DialogTitle>
                  </div>
                </div>
                <DialogDescription className="text-muted-foreground text-sm mt-1">
                  Share this link with others to start.
                </DialogDescription>
              </DialogHeader>

              <div className="px-6 py-2 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Direct Link</label>
                    {copied && <span className="text-[10px] font-bold text-green-500 animate-in fade-in slide-in-from-right-2">COPIED!</span>}
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/30 border border-border/50 backdrop-blur-sm group hover:border-primary/30 transition-all">
                    <div className="flex-1 overflow-hidden">
                      <p className="text-xs font-mono opacity-60 truncate">
                        {baseUrl}/dashboard/meet/room?id={generatedId}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={copyToClipboard}
                      className="h-8 w-8 rounded-lg hover:bg-primary/20 hover:text-primary transition-all shrink-0 active:scale-95"
                    >
                      {copied ? <Check className="h-4 w-4 text-green-500 animate-in zoom-in" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Share Invitation</label>
                  </div>
                  <div className="flex flex-col gap-3 p-4 rounded-xl bg-muted/20 border border-border/50 backdrop-blur-sm">
                    <p className="text-xs opacity-70 leading-relaxed italic">
                      "Hey! Join my real-time translated meeting on VertoX: {baseUrl}/dashboard/meet/room?id={generatedId}"
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        const text = `Hey! Join my real-time translated meeting on VertoX: ${baseUrl}/dashboard/meet/room?id=${generatedId}`;
                        navigator.clipboard.writeText(text);
                        toast.success("Invitation message copied!");
                      }}
                      className="w-full h-9 rounded-lg gap-2 text-xs font-bold border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      Copy Invitation Text
                    </Button>
                  </div>
                </div>
              </div>

              <DialogFooter className="p-6 pt-2 bg-muted/5 border-t border-border/50 flex flex-row gap-2">
                <Button 
                  variant="ghost" 
                  className="flex-1 rounded-lg h-11 font-bold hover:bg-muted/50 text-sm"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Close
                </Button>
                <Link href={`/dashboard/meet/room?id=${generatedId}`} className="flex-[1.5]">
                  <Button className="w-full rounded-lg h-11 font-bold text-base glow-primary group">
                    Join Now
                    <ChevronRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
              </DialogFooter>

            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card 
              onClick={handleNewMeeting}
              className="rounded-[32px] border-border/50 bg-card/50 overflow-hidden group cursor-pointer hover:border-primary/30 transition-all"
            >
              <CardContent className="p-8 flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <Video className="w-8 h-8" />
                </div>
                  <div>
                    <h3 className="text-xl font-bold">Start Instant Meeting</h3>
                    <p className="text-sm text-muted-foreground">Start a session right now with a unique link.</p>
                  </div>
              </CardContent>
            </Card>
            <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
              <DialogTrigger asChild>
                <Card className="rounded-[32px] border-border/50 bg-card/50 overflow-hidden group cursor-pointer hover:border-primary/30 transition-all">
                  <CardContent className="p-8 flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                      <CalendarIcon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Schedule</h3>
                      <p className="text-sm text-muted-foreground">Plan a future meeting and invite participants.</p>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg w-[95vw] max-h-[90vh] overflow-y-auto rounded-[32px] border-border/50 bg-card/95 backdrop-blur-3xl shadow-2xl p-0">
                <DialogHeader className="p-8 pb-4">
                  <DialogTitle className="text-2xl font-heading font-black">Schedule Meeting</DialogTitle>
                  <DialogDescription>Set up a future meeting and notify participants via email.</DialogDescription>
                </DialogHeader>

                <div className="px-8 py-2 space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="meeting-title">Meeting Title</Label>
                      <Input 
                        id="meeting-title" 
                        placeholder="Product Sync" 
                        className="rounded-xl h-12 bg-muted/30"
                        value={scheduleData.title}
                        onChange={(e) => setScheduleData({...scheduleData, title: e.target.value})}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Recipient Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input 
                            placeholder="colleague@example.com" 
                            className="pl-10 h-12 rounded-xl bg-muted/30"
                            value={scheduleData.recipientEmail}
                            onChange={(e) => setScheduleData({...scheduleData, recipientEmail: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Your Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input 
                            placeholder="your@email.com" 
                            className="pl-10 h-12 rounded-xl bg-muted/30"
                            value={scheduleData.senderEmail}
                            onChange={(e) => setScheduleData({...scheduleData, senderEmail: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal h-12 rounded-xl bg-muted/30 border-border/50">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {scheduleData.date ? format(scheduleData.date, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 rounded-2xl" align="start">
                            <Calendar
                              mode="single"
                              selected={scheduleData.date}
                              onSelect={(date) => date && setScheduleData({...scheduleData, date})}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label>Time</Label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input 
                            type="time" 
                            className="pl-10 h-12 rounded-xl bg-muted/30"
                            value={scheduleData.time}
                            onChange={(e) => setScheduleData({...scheduleData, time: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description (optional)</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Add a meeting description or link..." 
                        className="min-h-[100px] rounded-xl bg-muted/30"
                        value={scheduleData.description}
                        onChange={(e) => setScheduleData({...scheduleData, description: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <DialogFooter className="p-8 pt-4 flex gap-3">
                  <Button variant="ghost" className="flex-1 rounded-xl h-12 font-bold" onClick={() => setIsScheduleDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-[2] rounded-xl h-12 font-bold glow-primary" onClick={handleSchedule}>
                    Schedule & Send
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold mb-6">Upcoming Meetings</h2>
            <div className="space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center p-12 text-muted-foreground">
                  <Clock className="w-5 h-5 mr-2 animate-spin" />
                  Loading meetings...
                </div>
              ) : meetings.length === 0 ? (
                <div className="text-center p-12 rounded-[24px] border border-dashed border-border/50 bg-card/20">
                  <p className="text-muted-foreground">No meetings scheduled yet.</p>
                </div>
              ) : (
                meetings.map((meeting) => (
                  <div key={meeting.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-[24px] border border-border/50 bg-card/50 hover:bg-muted/30 transition-all group">
                    <div className="flex items-center gap-5 mb-4 sm:mb-0">
                      <div className="w-14 h-14 rounded-2xl bg-muted flex flex-col items-center justify-center text-center">
                        <span className="text-[10px] font-black uppercase opacity-60 leading-none mb-1">{format(new Date(meeting.meeting_time), "MMM")}</span>
                        <span className="text-sm font-black">{format(new Date(meeting.meeting_time), "dd")}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{meeting.title}</h4>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {format(new Date(meeting.meeting_time), "p")}</span>
                          <span className="flex items-center gap-1.5 text-primary font-bold"><Mail className="w-3.5 h-3.5" /> {meeting.recipient_email}</span>
                        </div>
                      </div>
                    </div>
                      <div className="flex gap-3 w-full sm:w-auto">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="rounded-xl h-12 w-12 border border-border/50 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteMeeting(meeting.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="rounded-xl h-12 w-12 border border-border/50"
                          onClick={() => {
                            navigator.clipboard.writeText(meeting.meeting_link)
                            toast.success("Meeting link copied!")
                          }}
                        >
                          <LinkIcon className="w-4 h-4" />
                        </Button>
                        <Link href={`/dashboard/meet/room?id=${getCleanCode(meeting.meeting_link)}`} className="flex-1 sm:flex-none">
                          <Button className="rounded-xl h-12 px-6 font-bold w-full">Join Room</Button>
                        </Link>
                      </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        <div className="lg:col-span-1 space-y-8">
          <Card className="rounded-[32px] border-border/50 bg-card/50 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
            <CardHeader className="relative">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="rounded-full px-3 py-1 bg-primary/5 border-primary/20 text-primary font-bold text-[10px] tracking-widest uppercase">My Profile</Badge>
                <Fingerprint className="w-5 h-5 text-primary opacity-50" />
              </div>
              <CardTitle className="text-xl font-heading font-black">Your Personal ID</CardTitle>
              <CardDescription>Share your unique ID to let others join your personal room.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 relative">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30 border border-border/50 group/id hover:border-primary/30 transition-all">
                {isProfileLoading ? (
                  <div className="h-6 w-32 bg-muted animate-pulse rounded" />
                ) : personalId ? (
                  <code className="text-xl font-black tracking-widest text-primary flex-1">{personalId}</code>
                ) : (
                  <div className="flex-1 text-sm text-destructive font-bold flex items-center gap-2">
                    Failed to load ID
                    <Button variant="link" size="sm" className="h-auto p-0 text-xs" onClick={() => user && fetchProfile(user)}>Retry</Button>
                  </div>
                )}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  disabled={!personalId}
                  className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-all"
                  onClick={() => {
                    navigator.clipboard.writeText(personalId)
                    toast.success("Personal ID copied!")
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[32px] border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="text-xl font-heading font-bold">Join with Code or ID</CardTitle>
              <CardDescription>Enter a meeting code or a Personal ID to join.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <LinkIcon className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${meetingCode && !isCodeValid ? 'text-destructive' : 'text-muted-foreground'}`} />
                <Input 
                  placeholder="abc-defg-hij or user-id" 
                  className={`pl-10 h-12 rounded-xl bg-muted/30 transition-all ${meetingCode && !isCodeValid ? 'border-destructive/50 ring-destructive/20' : ''}`}
                  value={meetingCode}
                  onChange={(e) => setMeetingCode(e.target.value)}
                />
              </div>
              {meetingCode && !isCodeValid && (
                <p className="text-[10px] font-black text-destructive/80 animate-in fade-in slide-in-from-top-1 px-1 uppercase tracking-wider">Invalid code or ID</p>
              )}
                <Link href={isCodeValid ? `/dashboard/meet/room?id=${getCleanCode(meetingCode)}` : "#"}>
                  <Button disabled={!isCodeValid} className="w-full rounded-xl h-12 font-bold">Join Meeting</Button>
                </Link>
            </CardContent>
          </Card>

          <Card className="rounded-[32px] border-border/50 bg-primary/5 border-primary/20 overflow-hidden">
            <CardHeader>
              <Badge className="w-fit mb-2 bg-primary/20 text-primary border-none">NEW FEATURE</Badge>
              <CardTitle className="text-xl font-heading font-bold">Physical Room Sync</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-6">Connect VertoX to your conference room hardware for seamless in-person translation.</p>
              <Button variant="outline" className="w-full rounded-xl h-12 font-bold border-primary/20 hover:bg-primary/5">
                Setup Hardware
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
