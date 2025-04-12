"use client";

import useMediaQuery from "@/hooks/use-media-query";
import usePrefersColorScheme from "@/hooks/use-prefers-color-scheme";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { RotateTextCircle } from "./ui/rotate-text-circle";

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  const theme = usePrefersColorScheme();
  const isLargeScreen = useMediaQuery("(min-width: 640px)");

  return (
    <motion.div
      className="flex items-center"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="relative center">
        <RotateTextCircle
          text="Desmond Hiew"
          size={isLargeScreen ? 40 : 28}
          color={theme === "dark" ? "#fff" : "#000"}
        />
        <img
          src="/avatar.jpeg"
          alt="Desmond Hiew"
          width={isLargeScreen ? 40 : 28}
          height={isLargeScreen ? 40 : 28}
          className="rounded-full absolute"
        />
      </div>
      <h1 className={cn("font-black text-xl sm:text-4xl", className)}>dh.</h1>
    </motion.div>
  );
};
