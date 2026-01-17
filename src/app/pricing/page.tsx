"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check, HelpCircle, Zap, Shield, Globe, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

const tiers = [
  {
    name: "Weekly",
    price: { monthly: 6, yearly: 6, isWeekly: true },
    description: "Perfect for short-term projects and testing.",
    features: [
      "7 days full access",
      "Priority AI voice engine",
      "Support for 100+ languages",
      "All Pro features included",
      "No commitment",
    ],
    cta: "Get Started",
    href: "/checkout?plan=weekly",
    highlight: false,
  },
  {
    name: "Pro",
    price: { monthly: 20, yearly: 16 },
    description: "Ideal for professionals and small global teams.",
    features: [
      "Unlimited translation minutes",
      "Priority AI voice engine",
      "Support for 100+ languages",
      "Voice cloning (1 profile)",
      "Zoom & Teams integration",
      "Advanced meeting insights",
    ],
    cta: "Start Free Trial",
    href: "/checkout?plan=pro",
    highlight: true,
  },
  {
    name: "Business",
    price: { monthly: 50, yearly: 40 },
    description: "Advanced features for growing organizations.",
    features: [
      "Everything in Pro",
      "Unlimited voice cloning",
      "Physical room hardware support",
      "Custom vocabulary & glossaries",
      "Team workspace & admin tools",
      "24/7 Priority support",
    ],
    cta: "Contact Sales",
    href: "/checkout?plan=business",
    highlight: false,
  },
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-6xl font-heading font-black mb-6">Simple, Transparent <br /><span className="text-primary">Pricing.</span></h1>
            <p className="text-xl text-muted-foreground mb-10">Choose the plan that's right for your global communication needs. No hidden fees.</p>
            
            <div className="flex items-center justify-center gap-4">
              <span className={cn("text-sm font-medium", !isYearly ? "text-foreground" : "text-muted-foreground")}>Monthly</span>
              <Switch 
                checked={isYearly}
                onCheckedChange={setIsYearly}
              />
              <span className={cn("text-sm font-medium", isYearly ? "text-foreground" : "text-muted-foreground")}>Yearly</span>
                <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/10 border-green-500/20">
                  Save 20% on Annual
                </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "relative p-8 rounded-[32px] border flex flex-col h-full bg-card transition-all duration-300",
                  tier.highlight 
                    ? "border-primary shadow-[0_0_40px_-10px_rgba(var(--primary),0.3)] scale-105 z-10" 
                    : "border-border hover:border-primary/30"
                )}
              >
                {tier.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Badge className="px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">Most Popular</Badge>
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-2xl font-heading font-bold mb-2">{tier.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{tier.description}</p>
                </div>
                
                <div className="mb-8 flex items-baseline gap-1">
                  <span className="text-5xl font-black tracking-tight">$</span>
                  <span className="text-6xl font-black tracking-tight">
                    {isYearly ? tier.price.yearly : tier.price.monthly}
                  </span>
                  <span className="text-muted-foreground font-medium">/mo</span>
                </div>
                
                <div className="space-y-4 mb-10 flex-grow">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link href={tier.href}>
                  <Button 
                    className={cn(
                      "w-full rounded-2xl py-6 text-lg font-bold",
                      tier.highlight ? "glow-primary" : "bg-muted hover:bg-muted/80 text-foreground"
                    )}
                    variant={tier.highlight ? "default" : "secondary"}
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-24 max-w-5xl mx-auto glass p-12 rounded-[40px] border-border/50">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-heading font-black mb-4">Enterprise Solutions</h2>
                <p className="text-muted-foreground text-lg mb-6">Need custom deployment, advanced security, or dedicated support? Our enterprise plan is tailored for large-scale operations.</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-2 text-sm font-bold">
                    <Shield className="w-5 h-5 text-primary" />
                    Custom Security
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold">
                    <Globe className="w-5 h-5 text-primary" />
                    Global CDN
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold">
                    <Users className="w-5 h-5 text-primary" />
                    Dedicated Account Manager
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <Link href="/contact">
                  <Button size="lg" className="rounded-2xl px-10 h-16 text-lg font-bold glow-primary">Contact Sales</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
