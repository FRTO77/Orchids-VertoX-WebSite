"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { 
  Check, 
  ChevronRight, 
  CreditCard, 
  Globe, 
  ShieldCheck, 
  Zap,
  ArrowLeft
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

function CheckoutContent() {
  const searchParams = useSearchParams()
  const initialPlan = searchParams.get("plan") || "pro"
  const initialInterval = searchParams.get("interval") || "monthly"
  const [selectedPlan, setSelectedPlan] = useState(initialPlan)
  const [selectedInterval, setSelectedInterval] = useState(initialInterval)
  const [paymentMethod, setPaymentMethod] = useState("stripe")

  const plans = [
    { id: "weekly", name: "Weekly", monthlyPrice: 6, yearlyPrice: 6, interval: "week" },
    { id: "pro", name: "Pro Plan", monthlyPrice: 20, yearlyPrice: 16, interval: "month" },
    { id: "business", name: "Business Plan", monthlyPrice: 50, yearlyPrice: 40, interval: "month" },
  ]

  const currentPlan = plans.find(p => p.id === selectedPlan) || plans[1]
  const isYearly = selectedInterval === "yearly" && currentPlan.id !== "weekly"
  const displayPrice = isYearly ? currentPlan.yearlyPrice : currentPlan.monthlyPrice
  const totalAmount = isYearly ? displayPrice * 12 : displayPrice

  return (
    <div className="min-h-screen bg-background pt-20 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/pricing" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Pricing</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <section>
                <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">1</span>
                  Select your plan
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {plans.map((plan) => (
                    <div 
                      key={plan.id}
                      onClick={() => {
                        setSelectedPlan(plan.id)
                        if (plan.id === "weekly") setSelectedInterval("weekly")
                      }}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                        selectedPlan === plan.id 
                          ? "border-primary bg-primary/5 shadow-md" 
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="font-bold">{plan.name}</span>
                        {selectedPlan === plan.id && <Check className="w-5 h-5 text-primary" />}
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black">${plan.monthlyPrice}</span>
                        <span className="text-muted-foreground text-sm">/{plan.interval}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm">2</span>
                  Payment Method
                </h2>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                  <Label
                    htmlFor="stripe"
                    className={`flex items-center justify-between p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === "stripe" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <RadioGroupItem value="stripe" id="stripe" />
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-6 h-6" />
                        <span className="font-bold">Stripe (Card, Apple & Google Pay)</span>
                      </div>
                    </div>
                    <div className="flex gap-2 opacity-60">
                      <div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold">VISA</div>
                      <div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold">MC</div>
                      <div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold">AMEX</div>
                    </div>
                  </Label>

                  <Label
                    htmlFor="paypal"
                    className={`flex items-center justify-between p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === "paypal" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <span className="font-bold">PayPal</span>
                    </div>
                    <span className="text-blue-500 font-black italic text-xl">PayPal</span>
                  </Label>

                  <Label
                    htmlFor="bank"
                    className={`flex items-center justify-between p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                      paymentMethod === "bank" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <RadioGroupItem value="bank" id="bank" />
                      <span className="font-bold">Bank Transfer (SEPA/SWIFT)</span>
                    </div>
                    <Globe className="w-6 h-6 opacity-40" />
                  </Label>
                </RadioGroup>
              </section>

              <section className="p-8 rounded-[32px] border border-border bg-card">
                {paymentMethod === "stripe" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="space-y-4">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" placeholder="0000 0000 0000 0000" className="h-12 rounded-xl" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" className="h-12 rounded-xl" />
                      </div>
                      <div className="space-y-4">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" className="h-12 rounded-xl" />
                      </div>
                    </div>
                    <div className="md:col-span-2 space-y-4">
                      <Label htmlFor="name">Name on Card</Label>
                      <Input id="name" placeholder="John Doe" className="h-12 rounded-xl" />
                    </div>
                  </div>
                )}

                {paymentMethod === "paypal" && (
                  <div className="space-y-6 text-center py-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-blue-500 font-black text-3xl italic">P</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Checkout with PayPal</h3>
                      <p className="text-muted-foreground">You will be redirected to PayPal's secure site to complete your payment.</p>
                    </div>
                    <Button className="bg-[#0070ba] hover:bg-[#003087] text-white w-full md:w-auto px-12 h-14 rounded-xl font-bold">
                      Launch PayPal Express
                    </Button>
                  </div>
                )}

                {paymentMethod === "bank" && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-muted-foreground text-xs uppercase font-bold">Account Holder</Label>
                        <p className="font-bold text-lg">VertoX AI Solutions Ltd.</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground text-xs uppercase font-bold">Bank Name</Label>
                        <p className="font-bold text-lg">Global Tech Bank N.A.</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground text-xs uppercase font-bold">IBAN / Account Number</Label>
                        <p className="font-mono font-bold text-lg">GB29 GTBK 6016 1331 9268 19</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-muted-foreground text-xs uppercase font-bold">SWIFT / BIC</Label>
                        <p className="font-mono font-bold text-lg">GTBKGB2LXXX</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm">
                      Please include your Order ID <strong>#VTX-{Math.floor(Math.random() * 90000) + 10000}</strong> as the payment reference.
                    </div>
                  </div>
                )}
              </section>
            </div>

            <div className="lg:col-span-1">
              <Card className="rounded-[32px] border-border shadow-xl sticky top-24">
                <CardHeader>
                  <CardTitle className="font-heading">Order Summary</CardTitle>
                  <CardDescription>Review your subscription details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <p className="font-bold">{currentPlan.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {isYearly ? "Billed annually" : `Billed ${currentPlan.interval}ly`}
                      </p>
                    </div>
                    <span className="font-black">${displayPrice}{isYearly ? "/mo" : ""}</span>
                  </div>
                  <Separator />
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between font-bold">
                      <span className="text-muted-foreground">Amount Due Today</span>
                      <span className="text-lg">${totalAmount}.00</span>
                    </div>
                    <div className="flex justify-between text-green-500 font-bold">
                      <span>Annual Discount (20%)</span>
                      <span>{isYearly ? `-$${Math.round(totalAmount * 0.25)}.00` : "-$0.00"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>$0.00</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center text-2xl font-black">
                    <span>Total</span>
                    <span className="text-primary">${totalAmount}.00</span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button className="w-full h-14 rounded-2xl text-lg font-bold glow-primary">
                    {paymentMethod === "bank" ? "Confirm Bank Transfer" : "Subscribe Now"}
                  </Button>
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="w-4 h-4" />
                    Secure SSL Encrypted Payment
                  </div>
                </CardFooter>
              </Card>

              <div className="mt-8 space-y-4 px-4">
                <p className="text-sm font-bold flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Instant platform access
                </p>
                <p className="text-sm font-bold flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  14-day money back guarantee
                </p>
                <p className="text-sm font-bold flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  Cancel or switch plans anytime
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}
