"use client";

import { useAppStore } from "@/store/app.store";
import { motion } from "framer-motion";

import ArrowDown from "@/assets/arrow-down.svg?react";
import ArrowUp from "@/assets/arrow-up.svg?react";
import { SectionTypes } from "./section";

export const PageScroll = () => {
  const { currentSection } = useAppStore();
  const hasPrev = SectionTypes.indexOf(currentSection) > 0;
  const hasNext =
    SectionTypes.indexOf(currentSection) < SectionTypes.length - 1;

  const onScrollUp = () => {
    const index = SectionTypes.indexOf(currentSection);
    if (index > 0) {
      const prevSection = document.getElementById(SectionTypes[index - 1]);
      if (prevSection) prevSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onScrollBottom = () => {
    if (!hasNext) {
      onScrollUp();
      return;
    }
    const nextSection = document.getElementById(
      SectionTypes[SectionTypes.indexOf(currentSection) + 1]
    );
    if (nextSection) nextSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-[20px] right-[48px] sm:right-[96px] flex flex-col gap-3">
      <Button
        icon={ArrowUp}
        onClick={onScrollUp}
        visible={hasPrev && hasNext}
      />
      <Button
        icon={!hasNext ? ArrowUp : ArrowDown}
        onClick={onScrollBottom}
        visible
      />
    </div>
  );
};

const Button = ({
  icon: Icon,
  onClick,
  visible,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
  visible: boolean;
}) => {
  return (
    <motion.button
      className="bg-black/5 dark:bg-white/5 p-2 sm:p-3 rounded-md"
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      initial={{ opacity: 0, pointerEvents: "none", cursor: "none" }}
      animate={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        cursor: visible ? "pointer" : "default",
      }}
    >
      <Icon className="w-6 h-6" />
    </motion.button>
  );
};
