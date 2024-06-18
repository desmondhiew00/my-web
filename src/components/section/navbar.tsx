"use client";

import { TextButton } from "@/components/ui/text-button";
import { useAppStore } from "@/store/app.store";
import { animate, motion } from "framer-motion";
import { SectionType } from "../section";

export enum NavButton {
	HOME = "home-nav",
	SKILLS = "skills-nav",
	WORKS = "works-nav",
}

export const NavBar = () => {
	return (
		<motion.div id="nav-buttons" className="flex flex-col gap-4 fixed bottom-[24px] left-5 z-40">
			<a href={`#${SectionType.HOME}`}>
				<TextButton className="nav-button" text="Home" delay={Math.random() * 0.8} />
			</a>
			<a href={`#${SectionType.SKILLS}`}>
				<TextButton className="nav-button" text="Skills" delay={Math.random() * 0.8} />
			</a>

			<a href={`#${SectionType.WORKS}`}>
				<TextButton className="nav-button" text="Works" delay={Math.random() * 0.8} />
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
				},
			);
		}
	};

	const setActive = (section: SectionType) => {
		const navButtons = document.querySelectorAll(".nav-button");
		for (const ele of navButtons) {
			animate(ele, { opacity: 1 });
		}
		const navEle = document.getElementById(section);
		if (navEle) animate(navEle, { opacity: 0.3 });
	};

	return { trigger, setActive };
};
