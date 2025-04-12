"use client";

import type { SectionType } from "@/components/section";
import { useAppStore } from "@/store/app.store";
import { useEffect, useRef } from "react";

/**
 * Trigger callback when section is in view
 * @param callback
 */
export const useSectionView = (callback?: (section: SectionType) => void) => {
  const store = useAppStore();
  const observer = useRef<IntersectionObserver>(null);

  useEffect(() => {
    const handleIntersection: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          store.updateCurrentSection(entry.target.id as SectionType);
          callback?.(entry.target.id as SectionType);
        }
      }
    };

    observer.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.4,
    });

    const sectionElements = document.querySelectorAll("section");
    for (const section of sectionElements) {
      observer.current?.observe(section);
    }

    return () => {
      for (const section of sectionElements) {
        if (observer.current) observer.current.unobserve(section);
      }
    };
  }, [callback, store]);
};
