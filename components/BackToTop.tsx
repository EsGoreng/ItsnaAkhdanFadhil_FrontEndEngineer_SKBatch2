"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BackToTopProps {
  threshold?: number;
}

export function BackToTop({ threshold = 350 }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={scrollToTop}
      aria-label="Kembali ke atas"
      className={cn(
        "fixed bottom-6 right-6 z-40 size-11 rounded-full bg-background/80 backdrop-blur-md shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 group",
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <ArrowUp className="size-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
    </Button>
  );
}
