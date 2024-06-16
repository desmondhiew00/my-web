"use client";

import { cn } from "@/lib/utils";
import { type HTMLMotionProps, motion } from "framer-motion";
import { CursorBlinker } from "./cursor-blinker";

const letterVariants = {
	hidden: {
		display: "none",
		opacity: 0,
	},
	visible: {
		display: "inline",
		opacity: 1,
		transition: {
			opacity: { duration: 0 },
		},
	},
};

interface Props extends HTMLMotionProps<"p"> {
	text: string;
	speed?: number;
	delay?: number;
	childDelay?: number;
	shellIndicator?: boolean;
	cursor?: boolean;
}

export const Typewriter: React.FC<Props> = ({
	text,
	speed = 0.08,
	delay,
	childDelay = 3,
	shellIndicator = true,
	cursor = true,
	...rest
}) => {
	const parsedText = parseText(text);

	return (
		<motion.div
			key={text}
			variants={{
				hidden: {
					display: "none",
				},
				visible: {
					display: "block",
					opacity: 1,
					transition: {
						delay,
						staggerChildren: speed,
						delayChildren: (delay || 0) + (childDelay || 0),
					},
				},
			}}
			initial="hidden"
			animate="visible"
			{...rest}
		>
			{shellIndicator && <span className="font-semibold text-shell-indicator">{"> "}</span>}
			{parsedText.map((part, i) => {
				if (typeof part === "string") {
					return part.split("").map((char, j) => (
						<motion.span className="whitespace-pre-wrap" key={`${char}-${i}-${j}`} variants={letterVariants}>
							{char}
						</motion.span>
					));
				}

				if (part.type === "code") {
					return (
						<motion.code className={cn("text-[#c11646] dark:text-[#e8912d]")} key={`${part.content}-${i}`}>
							{part.content.split("").map((char, j) => (
								<motion.span className="whitespace-pre-wrap" key={`${char}-${i}-${j}`} variants={letterVariants}>
									{char}
								</motion.span>
							))}
						</motion.code>
					);
				}

				return null;
			})}
			{cursor && <CursorBlinker className="ml-[2px]" type="lodash" />}
		</motion.div>
	);
};

const parseText = (text: string) => {
	const parts: (string | { type: string; content: string })[] = [];
	const regex = /`([^`]+)`|[^`]+/g;
	let match: RegExpExecArray | null;

	// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
	while ((match = regex.exec(text)) !== null) {
		if (match[1]) {
			parts.push({ type: "code", content: match[1] });
		} else {
			parts.push(match[0]);
		}
	}

	return parts;
};

export default Typewriter;
