"use client"

import { useState } from "react"
import { Calendar as CalendarIcon, Clock, Mail, Link as LinkIcon, Type, AlignLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

interface ScheduleDialogProps {
  children: React.ReactNode
}

export function ScheduleDialog({ children }: ScheduleDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    recipient_email: "",
    sender_email: "",
    description: "",
    meeting_link: "https://vertox.ai/meet/room/" + Math.random().toString(36).substring(7),
    meeting_time: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) throw new Error(result.error || "Failed to schedule meeting")

      toast.success("Meeting scheduled and invitation sent!")
      setOpen(false)
      // Reset form
      setFormData({
        title: "",
        recipient_email: "",
        sender_email: "",
        description: "",
        meeting_link: "https://vertox.ai/meet/room/" + Math.random().toString(36).substring(7),
        meeting_time: "",
      })
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-[32px] border-border/50 bg-card/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading font-black">Schedule Meeting</DialogTitle>
          <DialogDescription>
            Fill in the details to schedule a meeting and send an invitation.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                Meeting Title
              </Label>
              <div className="relative">
                <Type className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="title"
                  placeholder="Quarterly Sync"
                  className="pl-10 rounded-xl bg-muted/50 border-border/50 h-11"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sender_email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                  Your Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="sender_email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10 rounded-xl bg-muted/50 border-border/50 h-11"
                    value={formData.sender_email}
                    onChange={(e) => setFormData({ ...formData, sender_email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipient_email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                  Recipient Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="recipient_email"
                    type="email"
                    placeholder="client@example.com"
                    className="pl-10 rounded-xl bg-muted/50 border-border/50 h-11"
                    value={formData.recipient_email}
                    onChange={(e) => setFormData({ ...formData, recipient_email: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="meeting_time" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                Meeting Time
              </Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="meeting_time"
                  type="datetime-local"
                  className="pl-10 rounded-xl bg-muted/50 border-border/50 h-11"
                  value={formData.meeting_time}
                  onChange={(e) => setFormData({ ...formData, meeting_time: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="meeting_link" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                Meeting Link
              </Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="meeting_link"
                  placeholder="https://vertox.ai/meet/room/..."
                  className="pl-10 rounded-xl bg-muted/50 border-border/50 h-11"
                  value={formData.meeting_link}
                  onChange={(e) => setFormData({ ...formData, meeting_link: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                Description
              </Label>
              <div className="relative">
                <AlignLeft className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Textarea
                  id="description"
                  placeholder="Meeting agenda and details..."
                  className="pl-10 rounded-xl bg-muted/50 border-border/50 min-h-[100px] pt-3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              className="w-full rounded-xl h-12 font-bold glow-primary"
              disabled={loading}
            >
              {loading ? "Scheduling..." : "Schedule Meeting"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
