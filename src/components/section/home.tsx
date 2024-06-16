"use client";

import { InView } from "@/components/common/in-view";
import { Section } from "@/components/section";
import Typewriter from "@/components/ui/typewriter";
import usePrefersColorScheme from "@/hooks/use-prefers-color-scheme";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import Github from "@/assets/tech-stacks/github.svg";
import LinkedIn from "@/assets/tech-stacks/linkedin.svg";
import data from "@/data/texts";
import { useAppStore } from "@/store/app.store";
import { useBackgroundTitle } from "../background-title";
import { FinderWindow } from "../ui/finder-window";
import { useNavBarFunctions } from "./navbar";

export function Home() {
	const { updateCurrentSection } = useAppStore();
	const theme = usePrefersColorScheme();
	const navbar = useNavBarFunctions();
	const bgTitle = useBackgroundTitle();
	const [time, setTime] = useState("");

	useEffect(() => {
		setTime(dayjs().format("ddd MMM D HH:mm:ss"));
	}, []);

	return (
		<Section id="home" className="min-h-screen">
			<div className="mt-5 mb-8">
				<InView
					amount="some"
					className="mb-5 flex gap-3 items-center"
					onEnter={() => {
						updateCurrentSection("home");
						navbar.setActive("home");
						navbar.trigger(true);
						bgTitle.changeText("Desmond Hiew");
					}}
				>
					<motion.a whileTap={{ scale: 0.9 }} rel="noreferrer" target="_blank" href="https://github.com/desmondhiew00">
						<Github className="w-5 h-5" color={theme === "dark" ? "#fff" : "#000"} />
					</motion.a>
					<motion.a
						whileTap={{ scale: 0.9 }}
						rel="noreferrer"
						target="_blank"
						href="https://www.linkedin.com/in/desmond-hiew-ab1a201b1"
					>
						<LinkedIn className="w-6 h-6" color="#0a66c2" />
					</motion.a>
				</InView>

				{time && <div className="mb-2 text-[10px] sm:text-xs text-gray-500">Last login: {time} on desmond hiew</div>}
				<InView amount="some">
					<FinderWindow className="max-w-3xl" title="desmond hiew.txt">
						<div className="p-3 min-h-[300px]">
							<Typewriter className="mb-4" text={data["about-title"]} cursor={false} delay={0.6} childDelay={0.5} />
							<Typewriter text={data["about-description"].join("\n")} delay={2} childDelay={0.5} speed={0.02} />
						</div>
					</FinderWindow>
				</InView>
			</div>
		</Section>
	);
}
