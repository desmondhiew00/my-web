"use client";

import usePrefersColorScheme from "@/hooks/use-prefers-color-scheme";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { RotateTextCircle } from "./ui/rotate-text-circle";

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
	const theme = usePrefersColorScheme();
	return (
		<motion.div
			className="flex items-center"
			initial={{ opacity: 0, x: -20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 1 }}
		>
			<div className="relative center">
				<RotateTextCircle text="Desmond Hiew" size={40} color={theme === "dark" ? "#fff" : "#000"} />
				<Image src="/avatar.jpeg" alt="Desmond Hiew" width={40} height={40} className="rounded-full absolute" />
			</div>
			<h1 className={cn("font-black text-xl sm:text-4xl", className)}>dh.</h1>
		</motion.div>
	);
};
