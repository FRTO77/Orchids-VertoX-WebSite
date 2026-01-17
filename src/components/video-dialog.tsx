"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface VideoDialogProps {
  videoUrl?: string;
  trigger?: ReactNode;
}

export function VideoDialog({ 
  videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ", // Default to a placeholder, user should replace with actual demo
  trigger 
}: VideoDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg font-bold w-full sm:w-auto">
            Watch Demo <Play className="ml-2 w-4 h-4 fill-current" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-5xl p-0 overflow-hidden border-white/10 bg-black/90 backdrop-blur-xl sm:rounded-[32px]">
        <DialogTitle className="sr-only">VertoX Demo Video</DialogTitle>
        <div className="aspect-video w-full">
          <iframe
            src={`${videoUrl}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
