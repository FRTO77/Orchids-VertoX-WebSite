"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReactNode, useState, useRef } from "react";

interface VideoDialogProps {
  videoSrc?: string;
  trigger?: ReactNode;
}

export function VideoDialog({ 
  videoSrc = "/demo.mp4",
  trigger 
}: VideoDialogProps) {
  const [open, setOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg font-bold w-full sm:w-auto">
            Watch Demo <Play className="ml-2 w-4 h-4 fill-current" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-5xl p-0 overflow-hidden border-white/10 bg-black/95 backdrop-blur-xl sm:rounded-[32px]">
        <DialogTitle className="sr-only">VertoX Demo Video</DialogTitle>
        <div className="aspect-video w-full bg-black">
          <video
            ref={videoRef}
            src={videoSrc}
            controls
            autoPlay
            className="w-full h-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
