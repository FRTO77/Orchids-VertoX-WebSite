import type { Metadata } from "next";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "VertoX — Real-Time Voice Translator that Preserves Your Voice & Emotion",
  description: "VertoX lets teams and event audiences speak and understand each other instantly: real-time voice translation that preserves the speaker's voice, tone and emotion. Low latency, enterprise-grade privacy, and desktop + web clients.",
  openGraph: {
    title: "VertoX — Real-Time Voice & Emotion Translation",
    description: "Join global meetings and events in your language. VertoX translates speech in real time, preserves the speaker's voice and emotion, and delivers it to listeners' devices with low latency.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Script
            id="orchids-browser-logs"
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
            strategy="afterInteractive"
            data-orchids-project-id="e3e439c0-2974-47be-8c75-c2a41d716fd8"
          />
          <ErrorReporter />
          <Script
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
            strategy="afterInteractive"
            data-target-origin="*"
            data-message-type="ROUTE_CHANGE"
            data-include-search-params="true"
            data-only-in-iframe="true"
            data-debug="true"
            data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
          />
          {children}
          <Toaster position="top-center" />
          <VisualEditsMessenger />
        </ThemeProvider>
      </body>
    </html>
  );
}
