"use client";

import { useEffect } from "react";

interface Options {
  slug: string;
  title: string;
  enabled?: boolean;
}

export function useProgressSaver({ slug, title, enabled = true }: Options) {
  useEffect(() => {
    if (!enabled) return;

    const saveProgress = (scrollPosition: number) => {
      fetch("/api/user/save-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, title, scrollPosition })
      }).catch(() => undefined);
    };

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? window.scrollY / docHeight : 0;
      saveProgress(ratio);
    };

    const throttled = () => {
      window.requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", throttled);
    saveProgress(0);

    return () => {
      window.removeEventListener("scroll", throttled);
      const denominator = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = denominator > 0 ? document.documentElement.scrollTop / denominator : 0;
      saveProgress(ratio);
    };
  }, [slug, title, enabled]);
}

