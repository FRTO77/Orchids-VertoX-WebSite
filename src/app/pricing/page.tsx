"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check, Shield, Globe, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

const editorialEase = [0.22, 1, 0.36, 1]

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
    <div className="min-h-screen flex flex-col bg-white dark:bg-black">
      <div className="grain" />
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: editorialEase }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-6">Pricing</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-[0.85] mb-8">
              Simple, <em className="italic">transparent</em> pricing
            </h1>
            <p className="text-lg text-black/60 dark:text-white/60 font-light mb-12">
              Choose the plan that's right for your global communication needs. No hidden fees.
            </p>
          
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: editorialEase, delay: 0.2 }}
              className="flex items-center justify-center gap-6"
            >
              <span className={cn("text-sm font-light tracking-wide", !isYearly ? "text-black dark:text-white" : "text-black/40 dark:text-white/40")}>Monthly</span>
              <Switch 
                checked={isYearly}
                onCheckedChange={setIsYearly}
              />
              <span className={cn("text-sm font-light tracking-wide", isYearly ? "text-black dark:text-white" : "text-black/40 dark:text-white/40")}>Yearly</span>
              <span className="text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/40 border border-black/10 dark:border-white/10 px-3 py-1">
                Save 20%
              </span>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 dark:bg-white/10 max-w-6xl mx-auto mb-32">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: editorialEase, delay: i * 0.1 }}
                className={cn(
                  "relative p-10 md:p-12 flex flex-col h-full transition-all duration-700 group",
                  tier.highlight 
                    ? "bg-black text-white dark:bg-white dark:text-black" 
                    : "bg-white dark:bg-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                )}
              >
                {tier.highlight && (
                  <div className="absolute top-0 left-0 right-0">
                    <p className="text-xs uppercase tracking-[0.3em] text-center py-3 bg-white/10 dark:bg-black/10">
                      Most Popular
                    </p>
                  </div>
                )}
                
                <div className={cn("mb-10", tier.highlight && "mt-8")}>
                  <p className={cn(
                    "text-xs uppercase tracking-[0.3em] mb-4 transition-colors duration-700",
                    tier.highlight ? "text-white/40 dark:text-black/40" : "text-black/40 dark:text-white/40 group-hover:text-white/40 dark:group-hover:text-black/40"
                  )}>
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-serif font-light mb-3">{tier.name}</h3>
                  <p className={cn(
                    "text-sm font-light leading-relaxed transition-colors duration-700",
                    tier.highlight ? "text-white/60 dark:text-black/60" : "text-black/60 dark:text-white/60 group-hover:text-white/60 dark:group-hover:text-black/60"
                  )}>
                    {tier.description}
                  </p>
                </div>
                
                <div className="mb-10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl md:text-6xl font-serif font-light">
                      ${isYearly ? tier.price.yearly : tier.price.monthly}
                    </span>
                    <span className={cn(
                      "text-sm font-light transition-colors duration-700",
                      tier.highlight ? "text-white/40 dark:text-black/40" : "text-black/40 dark:text-white/40 group-hover:text-white/40 dark:group-hover:text-black/40"
                    )}>
                      /mo
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4 mb-12 flex-grow">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className={cn(
                        "w-4 h-4 mt-0.5 transition-colors duration-700",
                        tier.highlight ? "text-white/60 dark:text-black/60" : "text-black/40 dark:text-white/40 group-hover:text-white/60 dark:group-hover:text-black/60"
                      )} />
                      <span className="text-sm font-light">{feature}</span>
                    </div>
                  ))}
                </div>
              
                <Link href={tier.href}>
                  <Button 
                    className={cn(
                      "w-full rounded-full h-14 text-sm uppercase tracking-[0.2em] font-medium transition-all duration-500",
                      tier.highlight 
                        ? "bg-white text-black hover:bg-white/90 dark:bg-black dark:text-white dark:hover:bg-black/90" 
                        : "bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80 group-hover:bg-white group-hover:text-black dark:group-hover:bg-black dark:group-hover:text-white"
                    )}
                  >
                    {tier.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: editorialEase }}
            className="max-w-5xl mx-auto"
          >
            <div className="border border-black/10 dark:border-white/10 p-12 md:p-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-4">Enterprise</p>
                  <h2 className="text-4xl md:text-5xl font-serif font-light leading-[0.9] mb-6">
                    Custom <em className="italic">solutions</em>
                  </h2>
                  <p className="text-black/60 dark:text-white/60 font-light leading-relaxed mb-8">
                    Need custom deployment, advanced security, or dedicated support? Our enterprise plan is tailored for large-scale operations.
                  </p>
                  <div className="flex flex-wrap gap-8">
                    {[
                      { icon: Shield, label: "Custom Security" },
                      { icon: Globe, label: "Global CDN" },
                      { icon: Users, label: "Dedicated Manager" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-2">
                        <item.icon className="w-4 h-4 text-black/40 dark:text-white/40" />
                        <span className="text-sm font-light">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center lg:justify-end">
                  <Link href="/contact">
                    <Button 
                      size="lg" 
                      className="rounded-full h-16 px-12 text-sm uppercase tracking-[0.2em] font-medium bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80 transition-all duration-500"
                    >
                      Contact Sales
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
