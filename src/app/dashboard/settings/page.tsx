"use client"

import { useState, useEffect } from "react"
import { 
  Globe, 
  Moon, 
  Sun, 
  Shield, 
  Bell, 
  CreditCard, 
  Zap, 
  Languages, 
  Clock, 
  Lock, 
  Fingerprint,
  Smartphone,
  Monitor,
  Check
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

const themeOptions = [
  { value: "light", label: "Light", icon: Sun, description: "Clean, bright interface" },
  { value: "dark", label: "Dark", icon: Moon, description: "Easy on the eyes" },
  { value: "system", label: "System", icon: Monitor, description: "Match device settings" },
]

export default function SettingsPage() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-heading font-black">Settings</h1>
        <p className="text-muted-foreground">Configure your platform preferences and security defaults.</p>
      </div>

      <div className="space-y-8">
        <Card className="rounded-[32px] border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="text-xl font-heading font-bold flex items-center gap-3">
              <Languages className="w-5 h-5 text-primary" />
              Language & Translation
            </CardTitle>
            <CardDescription>Default settings for your meetings and chats.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label>Primary Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger className="h-12 rounded-xl bg-muted/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English (US)</SelectItem>
                    <SelectItem value="uk">English (UK)</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-[10px] text-muted-foreground">This is the language you'll mostly speak in.</p>
              </div>
              <div className="space-y-3">
                <Label>Default Target Language</Label>
                <Select defaultValue="auto">
                  <SelectTrigger className="h-12 rounded-xl bg-muted/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto-detect</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-[10px] text-muted-foreground">Language VertoX will translate into by default.</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-bold">Auto-Transcription</p>
                <p className="text-xs text-muted-foreground">Automatically save text transcripts for all sessions.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-bold">Voice Clone Priority</p>
                <p className="text-xs text-muted-foreground">Always use your cloned voice for translations when available.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[32px] border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="text-xl font-heading font-bold flex items-center gap-3">
              {mounted && resolvedTheme === "dark" ? (
                <Moon className="w-5 h-5 text-primary" />
              ) : (
                <Sun className="w-5 h-5 text-primary" />
              )}
              Appearance
            </CardTitle>
            <CardDescription>Customize how VertoX looks on your screen.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Theme</Label>
                <p className="text-xs text-muted-foreground">Select your preferred color scheme for the interface.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {themeOptions.map((option) => {
                  const Icon = option.icon
                  const isSelected = mounted && theme === option.value
                  
                  return (
                    <button
                      key={option.value}
                      onClick={() => setTheme(option.value)}
                      className={cn(
                        "relative flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-300",
                        "hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                        isSelected 
                          ? "border-primary bg-primary/5" 
                          : "border-border/50 bg-muted/20"
                      )}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2">
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-3 h-3 text-primary-foreground" />
                          </div>
                        </div>
                      )}
                      
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300",
                        isSelected 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted text-muted-foreground"
                      )}>
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      <div className="text-center">
                        <p className={cn(
                          "font-semibold text-sm",
                          isSelected ? "text-primary" : "text-foreground"
                        )}>
                          {option.label}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {option.description}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>

              {mounted && theme === "system" && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/30 border border-border/50">
                  <Monitor className="w-4 h-4 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">
                    Currently using <span className="font-medium text-foreground">{resolvedTheme}</span> mode based on your system preferences
                  </p>
                </div>
              )}
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-bold">Reduce Motion</p>
                <p className="text-xs text-muted-foreground">Minimize animations throughout the interface.</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-bold">High Contrast</p>
                <p className="text-xs text-muted-foreground">Increase contrast for better visibility.</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[32px] border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="text-xl font-heading font-bold flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary" />
              Security
            </CardTitle>
            <CardDescription>Protect your account and sensitive data.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center border border-border/50">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm">Two-Factor Authentication</p>
                  <p className="text-xs text-muted-foreground">Add an extra layer of security to your login.</p>
                </div>
              </div>
              <Button variant="outline" className="rounded-xl h-10 font-bold border-primary/20 text-primary">Enable</Button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center border border-border/50">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm">Session Vault</p>
                  <p className="text-xs text-muted-foreground">Password-protect your translation history.</p>
                </div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[32px] border-border/50 bg-destructive/5 border-destructive/20">
          <CardHeader>
            <CardTitle className="text-xl font-heading font-bold text-destructive">Danger Zone</CardTitle>
            <CardDescription>Irreversible actions for your account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-bold">Delete Cloned Voice</p>
                <p className="text-xs text-muted-foreground">This will remove all your biometric voice data from our servers.</p>
              </div>
              <Button variant="outline" className="rounded-xl border-destructive/20 text-destructive hover:bg-destructive hover:text-white">Delete Data</Button>
            </div>
            <Separator className="bg-destructive/10" />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-bold">Close Account</p>
                <p className="text-xs text-muted-foreground">Permanently delete your VertoX account and all associated data.</p>
              </div>
              <Button variant="destructive" className="rounded-xl">Close Account</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
