"use client"

import { useState, useRef, useEffect } from "react"
import { User, Mail, Shield, Bell, CreditCard, ChevronRight, Upload, Lock, Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export default function AccountPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeSection, setActiveSection] = useState("personal")
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleImageUpload(file)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items
      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            const blob = items[i].getAsFile()
            if (blob) handleImageUpload(blob)
          }
        }
      }
    }

    window.addEventListener("paste", handlePaste)
    return () => window.removeEventListener("paste", handlePaste)
  }, [])

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80 // Account for fixed header if any
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-heading font-black">Account Settings</h1>
        <p className="text-muted-foreground">Manage your profile, security, and subscription preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-4">
          <Card className="rounded-[32px] border-border/50 bg-card/50 overflow-hidden">
            <CardContent className="p-8 text-center flex flex-col items-center">
              <div className="relative group cursor-pointer mb-6" onClick={triggerFileInput}>
                <div className="w-24 h-24 rounded-3xl bg-primary/20 flex items-center justify-center text-primary text-3xl font-black border-2 border-primary/20 group-hover:border-primary transition-all overflow-hidden">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    "JD"
                  )}
                </div>
                <div className="absolute inset-0 bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Upload className="text-white w-6 h-6" />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={onFileChange}
                />
              </div>
              <h3 className="text-xl font-bold">John Doe</h3>
              <p className="text-sm text-muted-foreground mb-4">Pro Member since Jan 2024</p>
              <Badge className="bg-primary/10 text-primary hover:bg-primary/10 border-none px-4 py-1">PRO PLAN</Badge>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2 sticky top-24">
            <Button 
              variant="ghost" 
              className={`justify-start gap-3 rounded-xl h-12 transition-all ${activeSection === 'personal' ? 'bg-primary/10 text-primary' : 'hover:bg-muted/50'}`}
              onClick={() => scrollToSection('personal')}
            >
              <User className="w-4 h-4" />
              <span>Personal Info</span>
            </Button>
            <Button 
              variant="ghost" 
              className={`justify-start gap-3 rounded-xl h-12 transition-all ${activeSection === 'security' ? 'bg-primary/10 text-primary' : 'hover:bg-muted/50'}`}
              onClick={() => scrollToSection('security')}
            >
              <Shield className="w-4 h-4" />
              <span>Security</span>
            </Button>
            <Button 
              variant="ghost" 
              className={`justify-start gap-3 rounded-xl h-12 transition-all ${activeSection === 'billing' ? 'bg-primary/10 text-primary' : 'hover:bg-muted/50'}`}
              onClick={() => scrollToSection('billing')}
            >
              <CreditCard className="w-4 h-4" />
              <span>Billing & Plan</span>
            </Button>
            <Button 
              variant="ghost" 
              className={`justify-start gap-3 rounded-xl h-12 transition-all ${activeSection === 'notifications' ? 'bg-primary/10 text-primary' : 'hover:bg-muted/50'}`}
              onClick={() => scrollToSection('notifications')}
            >
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </Button>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
          <Card id="personal" className="rounded-[32px] border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-heading font-bold">Personal Information</CardTitle>
                <CardDescription>Update your name and contact details.</CardDescription>
              </div>
              <Button 
                variant={isEditing ? "default" : "outline"} 
                className="rounded-xl"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="John" disabled={!isEditing} className="rounded-xl h-12 bg-muted/30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" defaultValue="Doe" disabled={!isEditing} className="rounded-xl h-12 bg-muted/30" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" defaultValue="john.doe@example.com" disabled={!isEditing} className="rounded-xl h-12 bg-muted/30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organization">Organization</Label>
                <Input id="organization" defaultValue="VertoX AI" disabled={!isEditing} className="rounded-xl h-12 bg-muted/30" />
              </div>
            </CardContent>
          </Card>

          <Card id="security" className="rounded-[32px] border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="text-xl font-heading font-bold">Security Settings</CardTitle>
              <CardDescription>Manage your password and account security.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold">Password</p>
                    <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                  </div>
                </div>
                <Button variant="outline" className="rounded-xl">Update</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card id="billing" className="rounded-[32px] border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="text-xl font-heading font-bold">Subscription Status</CardTitle>
              <CardDescription>You are currently on the Pro Monthly plan.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold">Pro Monthly</p>
                    <p className="text-sm text-muted-foreground">$20/month • Next bill: Feb 28, 2024</p>
                  </div>
                </div>
                <Button className="rounded-xl font-bold">Upgrade</Button>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 py-4 px-8 flex justify-between items-center rounded-b-[32px]">
              <span className="text-sm text-muted-foreground italic">Want to cancel your subscription?</span>
              <Button variant="ghost" size="sm" className="text-destructive font-bold">Manage Billing</Button>
            </CardFooter>
          </Card>

          <Card id="notifications" className="rounded-[32px] border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="text-xl font-heading font-bold">Email Notifications</CardTitle>
              <CardDescription>Manage how you receive updates and alerts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Meeting Transcripts</Label>
                  <p className="text-sm text-muted-foreground">Receive a summary after every meeting.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Product Updates</Label>
                  <p className="text-sm text-muted-foreground">Get notified about new features and improvements.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Security Alerts</Label>
                  <p className="text-sm text-muted-foreground">Important notifications about your account security.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function Zap(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}
