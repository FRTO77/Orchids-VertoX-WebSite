"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { MapPin, Clock, ArrowLeft, Briefcase, Users, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

const editorialEase = [0.22, 1, 0.36, 1]

const jobsData: Record<string, {
  title: string
  dept: string
  location: string
  type: string
  salary: string
  team: string
  description: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
}> = {
  "senior-ai-research-engineer": {
    title: "Senior AI Research Engineer",
    dept: "Engineering",
    location: "Remote / SF",
    type: "Full-time",
    salary: "$180,000 - $250,000",
    team: "AI Research Team",
    description: "We're looking for a Senior AI Research Engineer to join our team and help push the boundaries of neural machine translation. You'll work on cutting-edge language models, develop novel architectures, and collaborate with world-class researchers to build the future of real-time communication.",
    responsibilities: [
      "Design and implement state-of-the-art neural network architectures for language processing",
      "Conduct research experiments and publish findings in top-tier conferences",
      "Collaborate with cross-functional teams to integrate research into production systems",
      "Mentor junior engineers and contribute to technical decision-making",
      "Optimize models for real-time inference at scale"
    ],
    requirements: [
      "PhD or Master's in Computer Science, Machine Learning, or related field",
      "5+ years of experience in ML/AI research or engineering",
      "Strong publication record in NLP, speech processing, or related areas",
      "Proficiency in PyTorch, TensorFlow, and modern ML frameworks",
      "Experience with large-scale distributed training systems"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Unlimited PTO and flexible work arrangements",
      "$5,000 annual learning & development budget",
      "Premium health, dental, and vision coverage",
      "Home office setup allowance"
    ]
  },
  "lead-product-designer": {
    title: "Lead Product Designer",
    dept: "Design",
    location: "San Francisco",
    type: "Full-time",
    salary: "$160,000 - $220,000",
    team: "Product Design Team",
    description: "Join us as Lead Product Designer to shape the visual and interactive experience of our translation platform. You'll lead a talented design team, establish design systems, and create intuitive interfaces that make complex technology feel effortless.",
    responsibilities: [
      "Lead and mentor a team of product designers",
      "Define and evolve our design system and brand guidelines",
      "Collaborate with product and engineering on user-centered solutions",
      "Conduct user research and usability testing",
      "Present design concepts to stakeholders and executives"
    ],
    requirements: [
      "7+ years of product design experience, with 2+ years in leadership",
      "Strong portfolio demonstrating end-to-end product design",
      "Expert in Figma, prototyping tools, and design systems",
      "Experience with B2B SaaS or enterprise products",
      "Excellent communication and presentation skills"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Unlimited PTO and flexible work arrangements",
      "$5,000 annual learning & development budget",
      "Premium health, dental, and vision coverage",
      "Home office setup allowance"
    ]
  },
  "linguistic-data-scientist": {
    title: "Linguistic Data Scientist",
    dept: "Data",
    location: "Remote",
    type: "Full-time",
    salary: "$140,000 - $190,000",
    team: "Data Science Team",
    description: "We're seeking a Linguistic Data Scientist to bridge the gap between linguistics and machine learning. You'll work on data quality, annotation pipelines, and linguistic analysis to improve our translation models across 100+ languages.",
    responsibilities: [
      "Develop linguistic annotation guidelines and quality metrics",
      "Analyze translation quality across diverse language pairs",
      "Build tools for data collection and preprocessing",
      "Collaborate with ML engineers to improve model performance",
      "Research linguistic phenomena to inform model architecture"
    ],
    requirements: [
      "Master's or PhD in Linguistics, Computational Linguistics, or related field",
      "3+ years of experience in NLP or linguistic data science",
      "Proficiency in Python and data analysis tools",
      "Knowledge of multiple languages is a plus",
      "Experience with annotation tools and crowdsourcing platforms"
    ],
    benefits: [
      "Competitive salary and equity package",
      "Unlimited PTO and flexible work arrangements",
      "$5,000 annual learning & development budget",
      "Premium health, dental, and vision coverage",
      "Home office setup allowance"
    ]
  },
  "enterprise-account-executive": {
    title: "Enterprise Account Executive",
    dept: "Sales",
    location: "New York",
    type: "Full-time",
    salary: "$120,000 - $180,000 + Commission",
    team: "Enterprise Sales Team",
    description: "Join our sales team as an Enterprise Account Executive to drive revenue growth with Fortune 500 companies. You'll manage complex sales cycles, build relationships with C-level executives, and help organizations transform their global communication.",
    responsibilities: [
      "Manage full sales cycle from prospecting to close",
      "Build and maintain relationships with enterprise clients",
      "Develop account strategies and territory plans",
      "Collaborate with solutions engineers on technical demos",
      "Achieve and exceed quarterly revenue targets"
    ],
    requirements: [
      "5+ years of enterprise B2B SaaS sales experience",
      "Track record of exceeding quota in complex sales environments",
      "Experience selling to technical and business stakeholders",
      "Strong negotiation and presentation skills",
      "Familiarity with CRM tools (Salesforce preferred)"
    ],
    benefits: [
      "Competitive base salary plus uncapped commission",
      "Unlimited PTO and flexible work arrangements",
      "President's Club trips for top performers",
      "Premium health, dental, and vision coverage",
      "Home office setup allowance"
    ]
  }
}

export default function JobDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const job = jobsData[slug]

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    coverLetter: ""
  })
  const [submitted, setSubmitted] = useState(false)

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-black">
        <div className="grain" />
        <Navbar />
        <main className="flex-grow pt-32 pb-24 px-6 md:px-12 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-serif font-light mb-4">Position not found</h1>
            <Link href="/careers" className="text-black/60 dark:text-white/60 hover:underline">
              ← Back to all positions
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black">
      <div className="grain" />
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: editorialEase }}
          >
            <Link 
              href="/careers" 
              className="inline-flex items-center gap-2 text-sm text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors mb-12"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all positions
            </Link>

            <div className="mb-12">
              <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-4">
                {job.dept}
              </p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light leading-[0.9] mb-8">
                {job.title}
              </h1>
              
              <div className="flex flex-wrap gap-6 text-sm text-black/60 dark:text-white/60">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {job.location}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" /> {job.type}
                </span>
                <span className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> {job.salary}
                </span>
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" /> {job.team}
                </span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <motion.div 
              className="lg:col-span-2 space-y-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: editorialEase, delay: 0.1 }}
            >
              <section>
                <h2 className="text-2xl font-serif font-light mb-6">About the Role</h2>
                <p className="text-black/70 dark:text-white/70 leading-relaxed">
                  {job.description}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-light mb-6">Responsibilities</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-black/70 dark:text-white/70">
                      <span className="text-xs text-black/30 dark:text-white/30 mt-1.5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-light mb-6">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-black/70 dark:text-white/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-black/30 dark:bg-white/30 mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-serif font-light mb-6">Benefits</h2>
                <ul className="space-y-3">
                  {job.benefits.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-black/70 dark:text-white/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-black/30 dark:bg-white/30 mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </motion.div>

            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: editorialEase, delay: 0.2 }}
            >
              <div className="sticky top-32 bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/10 p-8">
                <h3 className="text-xl font-serif font-light mb-6">Apply for this position</h3>
                
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                      <Briefcase className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="text-lg font-medium mb-2">Application Submitted!</h4>
                    <p className="text-sm text-black/60 dark:text-white/60">
                      Thank you for your interest. We'll review your application and get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mb-2 block">
                        Full Name *
                      </label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-white dark:bg-black border-black/10 dark:border-white/10"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mb-2 block">
                        Email *
                      </label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-white dark:bg-black border-black/10 dark:border-white/10"
                        placeholder="john@example.com"
                      />
                    </div>
                    
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mb-2 block">
                        Phone
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-white dark:bg-black border-black/10 dark:border-white/10"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mb-2 block">
                        LinkedIn Profile
                      </label>
                      <Input
                        type="url"
                        value={formData.linkedin}
                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                        className="bg-white dark:bg-black border-black/10 dark:border-white/10"
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                    
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mb-2 block">
                        Cover Letter
                      </label>
                      <Textarea
                        value={formData.coverLetter}
                        onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                        className="bg-white dark:bg-black border-black/10 dark:border-white/10 min-h-[120px]"
                        placeholder="Tell us why you're interested in this role..."
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full rounded-full h-12 text-sm uppercase tracking-[0.2em] font-medium bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80 transition-all duration-500"
                    >
                      Submit Application
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
