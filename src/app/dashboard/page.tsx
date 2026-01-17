"use client"

import { motion } from "framer-motion"
import { 
  Zap, 
  Target, 
  Globe, 
  Clock, 
  ArrowUpRight, 
  MessageSquare, 
  Video, 
  Mic2, 
  Settings,
  MoreVertical,
  Play,
  ChevronRight,
  Calendar
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { ScheduleDialog } from "@/components/ScheduleDialog"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

const stats = [
  { label: "Total Translations", value: "0", icon: Zap, color: "text-blue-500", trend: "0%" },
  { label: "Avg. Accuracy", value: "0%", icon: Target, color: "text-green-500", trend: "0%" },
  { label: "Languages Used", value: "0", icon: Globe, color: "text-purple-500", trend: "0" },
  { label: "Hours Saved", value: "0h", icon: Clock, color: "text-orange-500", trend: "0h" },
]

export default function DashboardPage() {
  const [meetings, setMeetings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMeetings() {
      const { data, error } = await supabase
        .from('scheduled_meetings')
        .select('*')
        .order('meeting_time', { ascending: true })
      
      if (data) setMeetings(data)
      setLoading(false)
    }

    fetchMeetings()

    // Subscribe to changes
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'scheduled_meetings'
        },
        (payload) => {
          fetchMeetings()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-black">Welcome back, John!</h1>
          <p className="text-muted-foreground">Here's what's happening with your translations today.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ScheduleDialog>
            <Button variant="outline" className="rounded-xl gap-2 h-11 px-6 border-primary/20 hover:border-primary/50">
              <Calendar className="w-4 h-4 text-primary" />
              Schedule
            </Button>
          </ScheduleDialog>
          <Link href="/dashboard/meet">
            <Button className="rounded-xl gap-2 h-11 px-6 glow-primary">
              <Video className="w-4 h-4" />
              Start Meeting
            </Button>
          </Link>
          <Link href="/dashboard/llm">
            <Button variant="outline" className="rounded-xl gap-2 h-11 px-6">
              <MessageSquare className="w-4 h-4" />
              AI Chat
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="rounded-3xl border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden group hover:border-primary/30 transition-all">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={cn("p-2 rounded-xl bg-muted group-hover:bg-primary/10 transition-colors", stat.color)}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-500 hover:bg-green-500/10 border-none font-bold">
                    {stat.trend}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-black tracking-tight">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 rounded-[32px] border-border/50 bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-heading font-bold">Scheduled Meetings</CardTitle>
              <CardDescription>Your upcoming translation sessions and meetings.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-primary font-bold">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : meetings.length === 0 ? (
                <div className="text-center py-12 px-4 rounded-3xl border border-dashed border-border/50">
                  <Calendar className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="text-lg font-bold">No meetings scheduled</h3>
                  <p className="text-muted-foreground text-sm mb-6">Start by scheduling your first meeting with AI translation.</p>
                  <ScheduleDialog>
                    <Button variant="outline" className="rounded-xl font-bold">Schedule Now</Button>
                  </ScheduleDialog>
                </div>
              ) : (
                meetings.map((meeting, i) => (
                  <div key={meeting.id} className="flex items-center justify-between p-4 rounded-2xl border border-transparent hover:border-border hover:bg-muted/30 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Video className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold">{meeting.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(meeting.meeting_time).toLocaleString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })} • {meeting.recipient_email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="hidden sm:block text-right">
                        <Badge variant="outline" className="rounded-lg font-bold text-[10px] uppercase tracking-wider bg-primary/5 border-primary/20 text-primary">
                          Upcoming
                        </Badge>
                      </div>
                      <Link href={meeting.meeting_link || "/dashboard/meet"}>
                        <Button variant="ghost" size="icon" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground hover:bg-primary/90">
                          <Play className="w-4 h-4 fill-current" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="rounded-[32px] border-border/50 bg-primary text-primary-foreground overflow-hidden relative group">
            <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <CardHeader>
              <CardTitle className="text-xl font-heading font-bold">Voice Clone</CardTitle>
              <CardDescription className="text-primary-foreground/70">Your personalized AI voice engine status.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span>Training Progress</span>
                  <span>0%</span>
                </div>
                <Progress value={0} className="h-2 bg-white/20" />
              </div>
              <div className="p-4 rounded-2xl bg-white/10 border border-white/20">
                <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-70">Current Profile</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Mic2 className="w-4 h-4" />
                  </div>
                  <span className="font-bold">John_V3_Stable</span>
                </div>
              </div>
              <Button className="w-full bg-white text-primary hover:bg-white/90 rounded-xl font-bold">Optimize Profile</Button>
            </CardContent>
          </Card>

          <Card className="rounded-[32px] border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="text-xl font-heading font-bold">Quick Setup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer border border-transparent hover:border-border">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">Target Language</p>
                  <p className="text-xs text-muted-foreground">Spanish (Latin America)</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer border border-transparent hover:border-border">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                  <Settings className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">Transcription</p>
                  <p className="text-xs text-muted-foreground">Real-time enabled</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ")
}
