"use client";

import { useAppStore } from "@/store/app.store";
import { animate, motion } from "framer-motion";

export const BackgroundTitle = () => {
	const state = useAppStore();
	return (
		<motion.h1
			id="background-title"
			className="fixed right-0 bottom-5 text-[32px] sm:text-[64px] font-black opacity-5 font-sans pointer-events-none"
			style={{ writingMode: "vertical-lr" }}
		>
			{state.bgTitle}
		</motion.h1>
	);
};

export const useBackgroundTitle = () => {
	const store = useAppStore();
	const hidden = { opacity: 0, y: -20 };
	const visible = { opacity: 0.05, y: 0 };

	const hide = () => {
		animate("h1#background-title", hidden, { duration: 0.5 });
	};

	const show = (delay?: number) => {
		animate("h1#background-title", visible, { duration: 0.5, delay });
	};

	const changeText = (text: string) => {
		if (document.getElementById("background-title")?.innerText === text) return;

		animate([
			["h1#background-title", hidden],
			["h1#background-title", visible],
		]);
		setTimeout(() => {
			store.updateBgTitle(text);
		}, 300);
	};

	return { hide, show, changeText };
};

export default BackgroundTitle;
