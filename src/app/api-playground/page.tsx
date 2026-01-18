"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { 
  Mic, 
  Volume2, 
  Languages, 
  AudioWaveform,
  Play,
  Square,
  Upload,
  ArrowRight,
  Check,
  Copy,
  Loader2,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const editorialEase = [0.22, 1, 0.36, 1]

const apis = [
  {
    id: "speech-to-text",
    name: "Speech to Text",
    shortName: "STT",
    icon: Mic,
    description: "Convert spoken audio into accurate text transcriptions with support for 100+ languages.",
    endpoint: "/v1/speech-to-text",
    color: "from-amber-500 to-orange-600",
    features: ["Real-time streaming", "Speaker diarization", "Punctuation & formatting", "Custom vocabulary"],
    codeSnippets: {
      curl: `curl -X POST https://api.vertox.ai/v1/speech-to-text \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: multipart/form-data" \\
  -F "audio=@recording.wav" \\
  -F "language=en" \\
  -F "timestamps=true"`,
      javascript: `const formData = new FormData();
formData.append('audio', audioFile);
formData.append('language', 'en');
formData.append('timestamps', 'true');

const response = await fetch('https://api.vertox.ai/v1/speech-to-text', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: formData
});

const { text, segments } = await response.json();`,
      python: `import requests

url = "https://api.vertox.ai/v1/speech-to-text"
files = {"audio": open("recording.wav", "rb")}
data = {"language": "en", "timestamps": "true"}
headers = {"Authorization": "Bearer YOUR_API_KEY"}

response = requests.post(url, files=files, data=data, headers=headers)
result = response.json()
print(result["text"])`
    }
  },
  {
    id: "text-to-speech",
    name: "Text to Speech",
    shortName: "TTS",
    icon: Volume2,
    description: "Generate natural-sounding speech from text with customizable voices and emotions.",
    endpoint: "/v1/text-to-speech",
    color: "from-emerald-500 to-teal-600",
    features: ["50+ neural voices", "Emotion control", "SSML support", "Custom voice cloning"],
    codeSnippets: {
      curl: `curl -X POST https://api.vertox.ai/v1/text-to-speech \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Hello, welcome to VertoX!",
    "voice": "aria",
    "language": "en",
    "emotion": "friendly"
  }' \\
  --output speech.mp3`,
      javascript: `const response = await fetch('https://api.vertox.ai/v1/text-to-speech', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    text: 'Hello, welcome to VertoX!',
    voice: 'aria',
    language: 'en',
    emotion: 'friendly'
  })
});

const audioBlob = await response.blob();
const audioUrl = URL.createObjectURL(audioBlob);`,
      python: `import requests

url = "https://api.vertox.ai/v1/text-to-speech"
payload = {
    "text": "Hello, welcome to VertoX!",
    "voice": "aria",
    "language": "en",
    "emotion": "friendly"
}
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)
with open("speech.mp3", "wb") as f:
    f.write(response.content)`
    }
  },
  {
    id: "speech-to-speech",
    name: "Speech to Speech",
    shortName: "STS",
    icon: AudioWaveform,
    description: "Transform speech while preserving the speaker's voice characteristics and emotional tone.",
    endpoint: "/v1/speech-to-speech",
    color: "from-violet-500 to-purple-600",
    features: ["Voice preservation", "Accent conversion", "Noise reduction", "Real-time processing"],
    codeSnippets: {
      curl: `curl -X POST https://api.vertox.ai/v1/speech-to-speech \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: multipart/form-data" \\
  -F "audio=@input.wav" \\
  -F "target_voice=professional" \\
  -F "preserve_emotion=true" \\
  --output output.wav`,
      javascript: `const formData = new FormData();
formData.append('audio', audioFile);
formData.append('target_voice', 'professional');
formData.append('preserve_emotion', 'true');

const response = await fetch('https://api.vertox.ai/v1/speech-to-speech', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: formData
});

const audioBlob = await response.blob();
const outputUrl = URL.createObjectURL(audioBlob);`,
      python: `import requests

url = "https://api.vertox.ai/v1/speech-to-speech"
files = {"audio": open("input.wav", "rb")}
data = {
    "target_voice": "professional",
    "preserve_emotion": "true"
}
headers = {"Authorization": "Bearer YOUR_API_KEY"}

response = requests.post(url, files=files, data=data, headers=headers)
with open("output.wav", "wb") as f:
    f.write(response.content)`
    }
  },
  {
    id: "speech-translation",
    name: "Speech Translation",
    shortName: "ST",
    icon: Languages,
    description: "Translate spoken audio directly to another language while cloning the original voice.",
    endpoint: "/v1/translate",
    color: "from-rose-500 to-pink-600",
    features: ["100+ language pairs", "Voice cloning", "Emotion preservation", "Sub-500ms latency"],
    codeSnippets: {
      curl: `curl -X POST https://api.vertox.ai/v1/translate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: multipart/form-data" \\
  -F "audio=@speech.wav" \\
  -F "source_lang=en" \\
  -F "target_lang=es" \\
  -F "voice_clone=true" \\
  --output translated.wav`,
      javascript: `const formData = new FormData();
formData.append('audio', audioFile);
formData.append('source_lang', 'en');
formData.append('target_lang', 'es');
formData.append('voice_clone', 'true');

const response = await fetch('https://api.vertox.ai/v1/translate', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: formData
});

const translatedAudio = await response.blob();`,
      python: `import requests

url = "https://api.vertox.ai/v1/translate"
files = {"audio": open("speech.wav", "rb")}
data = {
    "source_lang": "en",
    "target_lang": "es",
    "voice_clone": "true"
}
headers = {"Authorization": "Bearer YOUR_API_KEY"}

response = requests.post(url, files=files, data=data, headers=headers)
with open("translated.wav", "wb") as f:
    f.write(response.content)`
    }
  }
]

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "pt", name: "Portuguese" },
  { code: "it", name: "Italian" },
  { code: "ar", name: "Arabic" },
]

export default function APIPlaygroundPage() {
  const [activeApi, setActiveApi] = useState(apis[0])
  const [copied, setCopied] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [sourceLang, setSourceLang] = useState("en")
  const [targetLang, setTargetLang] = useState("es")
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAudioFile(file)
    }
  }

  const simulateProcessing = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      if (activeApi.id === "speech-to-text") {
        setOutputText("Hello, this is a sample transcription from the VertoX Speech-to-Text API. The audio has been processed and converted to text with high accuracy.")
      } else if (activeApi.id === "text-to-speech") {
        setOutputText("Audio generated successfully! Click play to listen.")
      } else if (activeApi.id === "speech-to-speech") {
        setOutputText("Voice transformation complete. The original voice characteristics have been preserved while applying the selected modifications.")
      } else {
        setOutputText("Translation complete! The audio has been translated from English to Spanish while preserving the original speaker's voice and emotion.")
      }
    }, 2000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] dark:bg-[#0a0a0a]">
      <div className="grain" />
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: editorialEase }}
            className="text-center mb-16"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-6">API Playground</p>
            <h1 className="text-5xl md:text-7xl font-serif font-light leading-[0.85] mb-8">
              Test our <em className="italic">voice</em> APIs
            </h1>
            <p className="text-lg text-black/60 dark:text-white/60 font-light max-w-2xl mx-auto">
              Explore and experiment with our suite of voice AI APIs. Try them out before integrating into your application.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
            {apis.map((api, i) => (
              <motion.button
                key={api.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: editorialEase, delay: i * 0.1 }}
                onClick={() => setActiveApi(api)}
                className={cn(
                  "relative p-6 text-left transition-all duration-500 border group",
                  activeApi.id === api.id
                    ? "bg-black text-white dark:bg-white dark:text-black border-transparent"
                    : "bg-white dark:bg-black border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center mb-4 transition-all duration-500",
                  activeApi.id === api.id
                    ? "bg-white/20 dark:bg-black/20"
                    : "bg-black/10 dark:bg-white/10"
                )}>
                  <api.icon className={cn(
                    "w-5 h-5",
                    activeApi.id === api.id ? "text-white dark:text-black" : "text-black/60 dark:text-white/60"
                  )} />
                </div>
                <h3 className="text-lg font-serif mb-1">{api.shortName}</h3>
                <p className={cn(
                  "text-xs",
                  activeApi.id === api.id
                    ? "text-white/60 dark:text-black/60"
                    : "text-black/40 dark:text-white/40"
                )}>{api.name}</p>
                {activeApi.id === api.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white/50 to-white/20 dark:from-black/50 dark:to-black/20"
                  />
                )}
              </motion.button>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <motion.div
              key={activeApi.id + "-info"}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: editorialEase }}
              className="bg-white dark:bg-black border border-black/10 dark:border-white/10 p-8 md:p-10"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-black/10 dark:bg-white/10">
                  <activeApi.icon className="w-7 h-7 text-black/70 dark:text-white/70" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-serif">{activeApi.name}</h2>
                  <code className="text-xs text-black/40 dark:text-white/40 font-mono">{activeApi.endpoint}</code>
                </div>
              </div>
              
              <p className="text-black/60 dark:text-white/60 font-light leading-relaxed mb-8">
                {activeApi.description}
              </p>

              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mb-4">Key Features</p>
                <div className="grid grid-cols-2 gap-3">
                  {activeApi.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span className="text-black/70 dark:text-white/70">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-black dark:bg-zinc-900 p-6 rounded-xl">
                <Tabs defaultValue="curl" className="w-full">
                  <div className="flex items-center justify-between mb-4">
                    <TabsList className="bg-white/5 border border-white/10 p-1 rounded-full">
                      <TabsTrigger value="curl" className="rounded-full px-4 text-xs data-[state=active]:bg-white data-[state=active]:text-black">cURL</TabsTrigger>
                      <TabsTrigger value="javascript" className="rounded-full px-4 text-xs data-[state=active]:bg-white data-[state=active]:text-black">JS</TabsTrigger>
                      <TabsTrigger value="python" className="rounded-full px-4 text-xs data-[state=active]:bg-white data-[state=active]:text-black">Python</TabsTrigger>
                    </TabsList>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="text-white/40 hover:text-white hover:bg-white/5 h-8 w-8"
                      onClick={() => copyToClipboard(activeApi.codeSnippets.curl)}
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  {Object.entries(activeApi.codeSnippets).map(([key, code]) => (
                    <TabsContent key={key} value={key} className="m-0">
                      <div className="font-mono text-xs leading-relaxed overflow-x-auto max-h-[200px] overflow-y-auto">
                        <pre className="text-white/70">
                          <code>{code}</code>
                        </pre>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </motion.div>

            <motion.div
              key={activeApi.id + "-playground"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: editorialEase }}
              className="bg-white dark:bg-black border border-black/10 dark:border-white/10 p-8 md:p-10"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-serif">Try it out</h3>
                <span className="text-xs px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  Demo Mode
                </span>
              </div>

              {(activeApi.id === "speech-to-text" || activeApi.id === "speech-to-speech" || activeApi.id === "speech-translation") && (
                <div className="mb-6">
                  <label className="text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mb-3 block">
                    Audio Input
                  </label>
                  <div className="border-2 border-dashed border-black/10 dark:border-white/10 rounded-xl p-8 text-center hover:border-black/20 dark:hover:border-white/20 transition-colors">
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={handleFileUpload}
                      ref={fileInputRef}
                      className="hidden"
                    />
                    {audioFile ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                          <Check className="w-5 h-5 text-emerald-500" />
                        </div>
                        <span className="text-sm">{audioFile.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 mx-auto mb-3 text-black/20 dark:text-white/20" />
                        <p className="text-sm text-black/40 dark:text-white/40 mb-3">
                          Drag & drop an audio file or
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                          className="rounded-full"
                        >
                          Browse Files
                        </Button>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <span className="text-xs text-black/40 dark:text-white/40">Or record:</span>
                    <Button
                      variant={isRecording ? "destructive" : "outline"}
                      size="sm"
                      onClick={() => setIsRecording(!isRecording)}
                      className="rounded-full gap-2"
                    >
                      {isRecording ? (
                        <>
                          <Square className="w-3 h-3" /> Stop
                        </>
                      ) : (
                        <>
                          <Mic className="w-3 h-3" /> Record
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {activeApi.id === "text-to-speech" && (
                <div className="mb-6">
                  <label className="text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mb-3 block">
                    Text Input
                  </label>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter text to convert to speech..."
                    className="w-full h-32 p-4 border border-black/10 dark:border-white/10 rounded-xl bg-transparent text-sm resize-none focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors"
                  />
                </div>
              )}

              {activeApi.id === "speech-translation" && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mb-3 block">
                      Source Language
                    </label>
                    <select
                      value={sourceLang}
                      onChange={(e) => setSourceLang(e.target.value)}
                      className="w-full p-3 border border-black/10 dark:border-white/10 rounded-xl bg-transparent text-sm focus:outline-none focus:border-black/30 dark:focus:border-white/30"
                    >
                      {languages.map((lang) => (
                        <option key={lang.code} value={lang.code} className="bg-white dark:bg-black">
                          {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mb-3 block">
                      Target Language
                    </label>
                    <select
                      value={targetLang}
                      onChange={(e) => setTargetLang(e.target.value)}
                      className="w-full p-3 border border-black/10 dark:border-white/10 rounded-xl bg-transparent text-sm focus:outline-none focus:border-black/30 dark:focus:border-white/30"
                    >
                      {languages.map((lang) => (
                        <option key={lang.code} value={lang.code} className="bg-white dark:bg-black">
                          {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <Button
                onClick={simulateProcessing}
                disabled={isProcessing}
                className="w-full rounded-full h-12 text-sm uppercase tracking-[0.2em] font-medium bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80 transition-all duration-500 mb-6"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Run API
                  </>
                )}
              </Button>

              {outputText && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-black/5 dark:bg-white/5 rounded-xl p-6"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mb-3">
                    Output
                  </p>
                  <p className="text-sm text-black/70 dark:text-white/70 leading-relaxed">
                    {outputText}
                  </p>
                  {(activeApi.id === "text-to-speech" || activeApi.id === "speech-to-speech" || activeApi.id === "speech-translation") && (
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-black/10 dark:border-white/10">
                      <Button variant="outline" size="sm" className="rounded-full gap-2">
                        <Play className="w-3 h-3" /> Play Audio
                      </Button>
                      <Button variant="ghost" size="sm" className="rounded-full gap-2">
                        <ArrowRight className="w-3 h-3" /> Download
                      </Button>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: editorialEase }}
            className="border border-black/10 dark:border-white/10 p-12 md:p-20 text-center bg-white dark:bg-black"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-light leading-[0.9] mb-6">
              Ready to <em className="italic">build</em>?
            </h2>
            <p className="text-black/60 dark:text-white/60 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
              Get your API key and start integrating VertoX voice AI into your applications today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button className="rounded-full h-14 px-10 text-sm uppercase tracking-[0.2em] font-medium bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80 transition-all duration-500">
                  Get API Key
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/docs">
                <Button variant="outline" className="rounded-full h-14 px-10 text-sm uppercase tracking-[0.2em] font-medium border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-500">
                  View Documentation
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
