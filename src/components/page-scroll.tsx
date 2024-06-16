"use client";

import { useAppStore } from "@/store/app.store";
import { motion } from "framer-motion";
import { Sections } from "./section";

import ArrowDown from "@/assets/arrow-down.svg";
import ArrowUp from "@/assets/arrow-up.svg";

export const PageScroll = () => {
	const { currentSection } = useAppStore();
	const hasPrev = Sections.indexOf(currentSection) > 0;
	const hasNext = Sections.indexOf(currentSection) < Sections.length - 1;

	const onScrollUp = () => {
		const index = Sections.indexOf(currentSection);
		if (index > 0) {
			const prevSection = document.getElementById(Sections[index - 1]);
			if (prevSection) prevSection.scrollIntoView({ behavior: "smooth" });
		}
	};

	const onScrollBottom = () => {
		if (!hasNext) {
			onScrollUp();
			return;
		}
		const nextSection = document.getElementById(Sections[Sections.indexOf(currentSection) + 1]);
		if (nextSection) nextSection.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div className="fixed bottom-[20px] right-[48px] sm:right-[96px] flex flex-col gap-3">
			<Button icon={ArrowUp} onClick={onScrollUp} visible={hasPrev && hasNext} />
			<Button icon={!hasNext ? ArrowUp : ArrowDown} onClick={onScrollBottom} visible />
		</div>
	);
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const Button = ({ icon: Icon, onClick, visible }: { icon: any; onClick?: () => void; visible: boolean }) => {
	return (
		<motion.button
			className="bg-black/5 dark:bg-white/5 p-2 sm:p-3 rounded-md"
			whileTap={{ scale: 0.9 }}
			onClick={onClick}
			initial={{ opacity: 0, pointerEvent: "none", cursor: "none" }}
			animate={{
				opacity: visible ? 1 : 0,
				pointerEvent: visible ? "auto" : "none",
				cursor: visible ? "pointer" : "default",
			}}
		>
			<Icon className="w-6 h-6" />
		</motion.button>
	);
};
