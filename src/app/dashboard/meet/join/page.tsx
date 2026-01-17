"use client"

import { useState, useRef, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { 
  Camera, 
  Mic, 
  Settings, 
  Globe, 
  Monitor, 
  ShieldCheck, 
  VideoOff, 
  MicOff,
  ChevronDown
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function JoinPage() {
  const searchParams = useSearchParams()
  const meetingId = searchParams.get("id") || ""
  const [isCameraOn, setIsCameraOn] = useState(true)
  const [isMicOn, setIsMicOn] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    async function setupMedia() {
      if (isCameraOn) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: true, 
            audio: isMicOn 
          })
          streamRef.current = stream
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
        } catch (err) {
          console.error("Error accessing media devices:", err)
          setIsCameraOn(false)
        }
      } else {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop())
          streamRef.current = null
        }
      }
    }

    setupMedia()

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [isCameraOn])

  // Update audio track specifically when isMicOn changes without restarting video
  useEffect(() => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach(track => {
        track.enabled = isMicOn
      })
    }
  }, [isMicOn])

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-heading font-black mb-2">Ready to join?</h1>
        <p className="text-muted-foreground">Check your audio and video before entering the room.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <div className="relative aspect-video bg-black rounded-[32px] overflow-hidden border border-border/50 flex items-center justify-center">
            {isCameraOn ? (
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="absolute inset-0 w-full h-full object-cover mirror"
              />
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                  <VideoOff className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Camera is off</p>
              </div>
            )}
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
              <Button 
                variant={isMicOn ? "secondary" : "destructive"} 
                size="icon" 
                className="rounded-full w-12 h-12 glass"
                onClick={() => setIsMicOn(!isMicOn)}
              >
                {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </Button>
              <Button 
                variant={isCameraOn ? "secondary" : "destructive"} 
                size="icon" 
                className="rounded-full w-12 h-12 glass"
                onClick={() => setIsCameraOn(!isCameraOn)}
              >
                {isCameraOn ? <Camera className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          <div className="flex justify-center gap-8">
            <div className="flex items-center gap-2">
              <div className={cn("w-2 h-2 rounded-full", isMicOn ? "bg-green-500" : "bg-red-500")} />
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Microphone</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={cn("w-2 h-2 rounded-full", isCameraOn ? "bg-green-500" : "bg-red-500")} />
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Camera</span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <Card className="rounded-[32px] border-border/50 bg-card/50">
            <CardContent className="p-8 space-y-8">
              <div className="space-y-4">
                <label className="text-sm font-black uppercase tracking-widest text-muted-foreground">Your Input Language</label>
                <Select defaultValue="en">
                  <SelectTrigger className="h-14 rounded-2xl bg-muted/30">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English (US)</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-black uppercase tracking-widest text-muted-foreground">Preferred Translation</label>
                <Select defaultValue="es">
                  <SelectTrigger className="h-14 rounded-2xl bg-muted/30">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="es">Spanish (Latin America)</SelectItem>
                    <SelectItem value="ja">Japanese</SelectItem>
                    <SelectItem value="zh">Mandarin</SelectItem>
                    <SelectItem value="pt">Portuguese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/20">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <p className="text-xs font-medium">VertoX encryption is active. Your biometric data is secured.</p>
              </div>

                <Link href={`/dashboard/meet/room?id=${meetingId}`} className="block">
                  <Button disabled={!meetingId} className="w-full h-16 rounded-2xl text-xl font-black glow-primary">
                    {meetingId ? "Join Meeting Now" : "Invalid Link"}
                  </Button>
                </Link>
            </CardContent>
          </Card>
          
          <div className="flex items-center justify-between px-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <p className="text-xs font-bold text-muted-foreground">4 people are already in this room</p>
          </div>
        </div>
      </div>
    </div>
  )
}
