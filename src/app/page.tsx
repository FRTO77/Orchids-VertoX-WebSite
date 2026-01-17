"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  Globe,
  Zap,
  Shield,
  Mic2,
  CheckCircle2,
  Play,
  Lock,
  ChevronDown,
  Volume2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SolutionsShowcase } from "@/components/solutions-showcase";
import { VideoDialog } from "@/components/video-dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const features = [
  {
    title: "Voice Preservation",
    description: "Translate words while keeping the original speaker's timbre, pitch and emotion intact.",
  },
  {
    title: "Real-Time Latency",
    description: "End-to-end latency of ~0.5s for live calls and events under typical conditions.",
  },
  {
    title: "25+ Languages",
    description: "Native support for major world languages at launch, with continuous expansion.",
  },
  {
    title: "Multi-Platform",
    description: "Web app for instant joining and desktop app for advanced audio routing.",
  },
  {
    title: "Enterprise Security",
    description: "End-to-end encryption, role-based consent, and GDPR/CCPA compliance.",
  },
  {
    title: "Broadcast Ready",
    description: "Host multilingual meetings, live streams, and conference audio at scale.",
  },
];

const processSteps = [
  { num: "01", title: "Join", desc: "Enter via browser link — no install required" },
  { num: "02", title: "Speak", desc: "Grant mic access and begin speaking naturally" },
  { num: "03", title: "Translate", desc: "Real-time neural processing preserves identity" },
  { num: "04", title: "Listen", desc: "Audience hears your voice in their language" },
];

const faqs = [
  {
    question: "How accurate is the translation?",
    answer: "VertoX uses state-of-the-art neural translation models. Accuracy rivals human interpreters for common business speech. We provide domain adaptation for specialized vocabularies.",
  },
  {
    question: "Which languages are supported?",
    answer: "We support 25+ languages at launch including major European, Asian and Middle Eastern languages. New languages are added monthly with priority support for enterprise customers.",
  },
  {
    question: "What is the latency?",
    answer: "Typical end-to-end latency is approximately 0.5 seconds under good network conditions, delivering a natural, near-real-time experience for meetings and events.",
  },
  {
    question: "How do you handle privacy?",
    answer: "Audio processing is encrypted in transit. Voice cloning requires explicit consent. By default, audio is transient and not stored. Enterprises can enable encrypted retention with role-based access.",
  },
  {
    question: "Does it work with existing tools?",
    answer: "Yes — VertoX integrates with Zoom, Microsoft Teams, SIP systems and WebRTC. We also offer APIs and SDKs for custom integrations.",
  },
];

const editorialEase = [0.22, 1, 0.36, 1];

export default function LandingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden relative bg-white dark:bg-black">
      <div className="grain" />
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section - Full viewport, centered, minimal */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center bg-white dark:bg-black bg-grid-black dark:bg-grid-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-black" />
          
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="container mx-auto px-6 md:px-12 relative z-10"
          >
            <div className="max-w-5xl mx-auto text-center">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: editorialEase }}
                className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-8"
              >
                Real-Time Voice Translation
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: editorialEase, delay: 0.1 }}
                className="text-6xl md:text-8xl lg:text-[10rem] font-serif font-light leading-[0.85] tracking-tight mb-8"
              >
                Be <em className="italic">yourself</em>
                <br />
                in any language
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: editorialEase, delay: 0.3 }}
                className="text-lg md:text-xl text-black/60 dark:text-white/60 font-light max-w-2xl mx-auto mb-12 leading-relaxed"
              >
                Translate live conversations preserving your voice, tone and identity.
                Ultra-low latency. Enterprise security.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: editorialEase, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="rounded-full h-14 px-10 text-sm uppercase tracking-[0.2em] font-medium bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80 transition-all duration-500 group"
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full h-14 px-10 text-sm uppercase tracking-[0.2em] font-medium border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-500"
                  >
                    Request Demo
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{
              opacity: { delay: 1.5, duration: 0.5 },
              y: { delay: 1.5, duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <ChevronDown className="w-6 h-6 text-black/20 dark:text-white/20" />
          </motion.div>
        </section>

        {/* Demo Video Section - Black background */}
        <section id="demo" className="py-32 bg-black text-white relative overflow-hidden scroll-mt-20">
          <div className="bg-grid-white absolute inset-0" />
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: editorialEase }}
                className="mb-16"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">01 / Experience</p>
                <h2 className="text-5xl md:text-7xl font-serif font-light leading-[0.9]">
                  See it in <em className="italic">action</em>
                </h2>
              </motion.div>

              <VideoDialog
                trigger={
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: editorialEase, delay: 0.2 }}
                    className="relative aspect-[16/9] overflow-hidden cursor-pointer group"
                  >
                    <div className="absolute inset-0 bg-zinc-900">
                      <Image
                        src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=2070"
                        alt="VertoX Demo"
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100 transition-all duration-1000"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full border border-white/30 flex items-center justify-center group-hover:scale-110 group-hover:border-white/60 transition-all duration-500">
                        <Play className="w-8 h-8 text-white fill-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-2">Live Demo</p>
                          <h3 className="text-2xl md:text-3xl font-serif font-light">Global Event Translation</h3>
                        </div>
                        <div className="hidden md:flex gap-12">
                          <div className="text-right">
                            <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-1">Latency</p>
                            <p className="text-2xl font-serif">~0.5s</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-1">Languages</p>
                            <p className="text-2xl font-serif">25+</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                }
              />
            </div>
          </div>
        </section>

        {/* Process Section - White background */}
        <section id="features" className="py-32 bg-white text-black relative overflow-hidden scroll-mt-20">
          <div className="bg-grid-black absolute inset-0" />
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: editorialEase }}
                className="mb-20"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-black/40 mb-4">02 / Process</p>
                <h2 className="text-5xl md:text-7xl font-serif font-light leading-[0.9]">
                  How it <em className="italic">works</em>
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-black/10">
                {processSteps.map((step, i) => (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: editorialEase, delay: i * 0.1 }}
                    className="bg-white p-8 md:p-10 group hover:bg-black hover:text-white transition-all duration-700"
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-black/40 group-hover:text-white/40 mb-6 transition-colors duration-700">
                      {step.num}
                    </p>
                    <h3 className="text-3xl md:text-4xl font-serif font-light mb-4">{step.title}</h3>
                    <p className="text-sm text-black/60 group-hover:text-white/60 leading-relaxed transition-colors duration-700">
                      {step.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Voice Cloning Section - Full width image + text */}
        <section className="py-32 bg-black text-white relative overflow-hidden">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: editorialEase }}
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">03 / Technology</p>
                  <h2 className="text-5xl md:text-7xl font-serif font-light leading-[0.9] mb-8">
                    Global voice,
                    <br />
                    <em className="italic">local</em> identity
                  </h2>
                  <p className="text-lg text-white/60 font-light leading-relaxed mb-10 max-w-lg">
                    VertoX translates spoken language while preserving the original speaker's timbre, tone and emotional cues. Your voice travels across languages.
                  </p>

                  <div className="space-y-6">
                    {[
                      { label: "Identity Match", value: "High Fidelity" },
                      { label: "Emotion", value: "Preserved" },
                      { label: "Latency", value: "~0.5 seconds" },
                    ].map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: editorialEase, delay: i * 0.1 }}
                        className="flex justify-between items-center py-4 border-b border-white/10"
                      >
                        <span className="text-xs uppercase tracking-[0.3em] text-white/40">{stat.label}</span>
                        <span className="text-lg font-serif">{stat.value}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: editorialEase, delay: 0.4 }}
                    className="mt-10"
                  >
                    <Link href="/signup">
                      <Button
                        size="lg"
                        className="rounded-full h-14 px-10 text-sm uppercase tracking-[0.2em] font-medium bg-white text-black hover:bg-white/90 transition-all duration-500 group"
                      >
                        Start Now
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: editorialEase, delay: 0.2 }}
                  className="relative aspect-[4/5] overflow-hidden"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2070"
                    alt="Voice technology"
                    fill
                    className="object-cover grayscale hover:grayscale-0 scale-110 hover:scale-100 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid - Minimal cards */}
        <section className="py-32 bg-white text-black relative overflow-hidden">
          <div className="bg-grid-black absolute inset-0" />
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: editorialEase }}
                className="text-center mb-20"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-black/40 mb-4">04 / Capabilities</p>
                <h2 className="text-5xl md:text-7xl font-serif font-light leading-[0.9]">
                  Engineered for <em className="italic">connection</em>
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10">
                {features.map((feature, i) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: editorialEase, delay: i * 0.05 }}
                    className="bg-white p-10 group hover:bg-black hover:text-white transition-all duration-700"
                  >
                    <h3 className="text-2xl font-serif font-light mb-4 group-hover:translate-x-4 transition-transform duration-500">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-black/60 group-hover:text-white/60 leading-relaxed transition-colors duration-700">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="min-h-screen relative overflow-hidden flex items-center">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
              alt="Earth from space"
              fill
              className="object-cover grayscale"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: editorialEase }}
            className="relative z-10 container mx-auto px-6 md:px-12"
          >
            <div className="max-w-4xl mx-auto text-center">
              <svg 
                className="w-12 h-12 mx-auto mb-8 text-white/40" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light italic text-white leading-relaxed mb-8">
                "The limits of my language mean the limits of my world."
              </h2>
              
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                — Ludwig Wittgenstein
              </p>
            </div>
          </motion.div>
        </section>

        {/* Solutions Showcase */}
        <div id="solutions" className="scroll-mt-20">
          <SolutionsShowcase />
        </div>

        {/* Security Section */}
        <section className="py-32 bg-white text-black relative overflow-hidden">
          <div className="bg-grid-black absolute inset-0" />
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: editorialEase }}
                  className="relative aspect-square overflow-hidden order-2 lg:order-1"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=2070"
                    alt="Security"
                    fill
                    className="object-cover grayscale hover:grayscale-0 scale-110 hover:scale-100 transition-all duration-1000"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: editorialEase, delay: 0.2 }}
                  className="order-1 lg:order-2"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-black/40 mb-4">05 / Security</p>
                  <h2 className="text-5xl md:text-7xl font-serif font-light leading-[0.9] mb-8">
                    Enterprise-grade
                    <br />
                    <em className="italic">protection</em>
                  </h2>
                  <p className="text-lg text-black/60 font-light leading-relaxed mb-10">
                    Default flows use transient audio processing without persistent storage.
                    Participants are prompted for consent before any voice cloning.
                  </p>

                  <div className="grid grid-cols-2 gap-6">
                    {[
                      "End-to-End Encryption",
                      "GDPR & CCPA Ready",
                      "Consent-First",
                      "Private Cloud",
                    ].map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: editorialEase, delay: i * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-sm">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-32 bg-black text-white relative overflow-hidden scroll-mt-20">
          <div className="bg-grid-white absolute inset-0" />
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: editorialEase }}
                className="text-center mb-16"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">06 / Questions</p>
                <h2 className="text-5xl md:text-7xl font-serif font-light">
                  Common <em className="italic">inquiries</em>
                </h2>
              </motion.div>

              <Accordion type="single" collapsible className="space-y-0">
                {faqs.map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: editorialEase, delay: i * 0.05 }}
                  >
                    <AccordionItem
                      value={`item-${i}`}
                      className="border-b border-white/10 py-2"
                    >
                      <AccordionTrigger className="text-lg md:text-xl font-serif font-light hover:no-underline text-left py-6 [&[data-state=open]]:text-white [&[data-state=closed]]:text-white/60 transition-colors duration-500">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-white/60 font-light leading-relaxed pb-6">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Final CTA - Editorial style */}
        <section className="py-32 md:py-48 bg-white text-black relative overflow-hidden">
          <div className="bg-grid-black absolute inset-0" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="text-[20vw] font-serif font-light text-black/[0.02] whitespace-nowrap">
              VertoX
            </span>
          </div>
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: editorialEase }}
                className="text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-[0.9] mb-8"
              >
                Ready to break
                <br />
                the <em className="italic">language</em> barrier?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: editorialEase, delay: 0.2 }}
                className="text-lg md:text-xl text-black/60 font-light max-w-xl mx-auto mb-12 leading-relaxed"
              >
                Speak in your language. Sound like yourself.
                VertoX preserves human identity in translation.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: editorialEase, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="rounded-full h-16 px-12 text-sm uppercase tracking-[0.2em] font-medium bg-black text-white hover:bg-black/80 transition-all duration-500 group"
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full h-16 px-12 text-sm uppercase tracking-[0.2em] font-medium border-black/20 hover:bg-black/5 transition-all duration-500"
                  >
                    Enterprise Demo
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: editorialEase, delay: 0.6 }}
                className="mt-16 pt-16 border-t border-black/10"
              >
                <div className="flex flex-wrap justify-center gap-12 text-xs uppercase tracking-[0.3em] text-black/40">
                  <span>Voice Preservation</span>
                  <span>Real-Time</span>
                  <span>Enterprise Security</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
