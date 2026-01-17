"use client"

import { useState } from "react"
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
  Smartphone
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

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()

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
              <Sun className="w-5 h-5 text-primary" />
              Appearance
            </CardTitle>
            <CardDescription>Customize how VertoX looks on your screen.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-bold">Theme Mode</p>
                <p className="text-xs text-muted-foreground">Switch between light, dark, or system themes.</p>
              </div>
              <div className="flex p-1 bg-muted/50 rounded-xl border border-border/50">
                <Button 
                  variant={theme === "light" ? "secondary" : "ghost"} 
                  size="sm" 
                  className="rounded-lg h-8 px-3"
                  onClick={() => setTheme("light")}
                >
                  <Sun className="w-3.5 h-3.5 mr-2" /> Light
                </Button>
                <Button 
                  variant={theme === "dark" ? "secondary" : "ghost"} 
                  size="sm" 
                  className="rounded-lg h-8 px-3"
                  onClick={() => setTheme("dark")}
                >
                  <Moon className="w-3.5 h-3.5 mr-2" /> Dark
                </Button>
              </div>
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
