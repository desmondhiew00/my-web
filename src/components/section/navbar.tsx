"use client";

import { TextButton } from "@/components/ui/text-button";
import { useAppStore } from "@/store/app.store";
import { animate, motion } from "framer-motion";
import { SectionType } from "../section";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
export enum NavButton {
  HOME = "home-nav",
  SKILLS = "skills-nav",
  WORKS = "works-nav",
}

export const NavBar = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "NavBar" });

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" }); // or 'auto'
      }
    }
  }, []);

  return (
    <motion.div
      id="nav-buttons"
      className="flex flex-col gap-4 fixed bottom-[24px] left-5 z-40"
    >
      <a href={`#${SectionType.HOME}`}>
        <TextButton
          id={`nav-item-${SectionType.HOME}`}
          className="nav-button"
          type="div"
          text={t("home")}
          delay={Math.random() * 0.8}
        />
      </a>
      <a href={`#${SectionType.SKILLS}`}>
        <TextButton
          id={`nav-item-${SectionType.SKILLS}`}
          className="nav-button"
          type="div"
          text={t("skills")}
          delay={Math.random() * 0.8}
        />
      </a>

      <a href={`#${SectionType.WORKS}`}>
        <TextButton
          id={`nav-item-${SectionType.WORKS}`}
          className="nav-button"
          type="div"
          text={t("works")}
          delay={Math.random() * 0.8}
        />
      </a>
    </motion.div>
  );
};

export const useNavBarFunctions = () => {
  const { updateCollapsed } = useAppStore();
  const trigger = (open: boolean) => {
    updateCollapsed(open);
    const elements = document.querySelectorAll(".nav-button");
    for (const ele of elements) {
      animate(
        ele,
        { x: open ? 0 : -150 },
        {
          duration: 0.5,
          delay: Math.random() * 0.3,
        }
      );
    }
  };

  const setActive = (section: SectionType) => {
    const navButtons = document.querySelectorAll(".nav-button");
    for (const ele of navButtons) {
      animate(ele, { opacity: 1 });
    }
    const navEle = document.getElementById(`nav-item-${section}`);
    if (navEle) animate(navEle, { opacity: 0.3 });
  };

  return { trigger, setActive };
};
