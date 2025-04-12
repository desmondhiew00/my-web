"use client";

import { type HTMLMotionProps, motion } from "framer-motion";

import ArrowSvg from "@/assets/arrow.svg?react";
import usePrefersColorScheme from "@/hooks/use-prefers-color-scheme";

export const ArrowDown: React.FC<HTMLMotionProps<"div">> = ({ ...props }) => {
  const theme = usePrefersColorScheme();
  return (
    <motion.div
      className="w-fit relative flex flex-col items-center"
      initial={{ opacity: 0, x: 0, y: -40 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      {...props}
    >
      <ArrowSvg
        key={`${theme}arrow`}
        className="rotate-[35deg] h-[40px] sm:h-[80px] mb-5 sm:mb-10 mt-4"
        color={theme === "dark" ? "#fff" : "#000"}
        height="100%"
        width="auto"
      />
    </motion.div>
  );
};
