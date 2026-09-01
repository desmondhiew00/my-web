import { type HTMLMotionProps, motion } from "framer-motion";
import { cn } from "@/lib/utils";
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
	shellIndicator?: boolean | string;
	indicatorClassName?: string;
	cursor?: boolean;
}

export const Typewriter: React.FC<Props> = ({
	text,
	speed = 0.08,
	delay,
	childDelay = 3,
	shellIndicator = true,
	indicatorClassName = "font-semibold text-shell-indicator",
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
			{shellIndicator && (
				<span className={indicatorClassName}>
					{typeof shellIndicator === "string" ? `${shellIndicator} ` : "> "}
				</span>
			)}
			{parsedText.map((part, i) => {
				const letters = part.content.split("").map((char, j) => (
					<motion.span
						className="whitespace-pre-wrap"
						key={`${char}-${i}-${j}`}
						variants={letterVariants}
					>
						{char}
					</motion.span>
				));

				if (!PART_CLASS[part.type]) return letters;

				return (
					<motion.code className={cn(PART_CLASS[part.type])} key={`${part.content}-${i}`}>
						{letters}
					</motion.code>
				);
			})}
			{cursor && <CursorBlinker className="ml-[2px]" type="lodash" />}
		</motion.div>
	);
};

/**
 * Markers wrap a run of text to give it a role:
 * `command`, ~alias~, #muted#. Everything else is body text; bare urls colour themselves.
 */
const MARKERS = {
	"`": "command",
	"~": "alias",
	"#": "muted",
} as const;

type PartType = (typeof MARKERS)[keyof typeof MARKERS] | "text" | "link";

interface Part {
	type: PartType;
	content: string;
}

const PART_CLASS: Record<PartType, string> = {
	text: "",
	command: "text-cyan-700 dark:text-cyan-400",
	alias: "text-violet-700 dark:text-violet-300",
	muted: "text-gray-500",
	link: "text-blue-700 dark:text-blue-400",
};

const MARKER_CHARS = Object.keys(MARKERS).join("");
const MARKED = new RegExp(`([${MARKER_CHARS}])([^${MARKER_CHARS}]+)\\1|[^${MARKER_CHARS}]+`, "g");
const URL_PATTERN = new RegExp(`https?://[^\\s${MARKER_CHARS}]+`);

const parseText = (text: string): Part[] => {
	const parts: Part[] = [];

	for (const [raw, marker, marked] of text.matchAll(MARKED)) {
		const type = marker ? MARKERS[marker as keyof typeof MARKERS] : "text";
		for (const piece of (marked ?? raw).split(new RegExp(`(${URL_PATTERN.source})`))) {
			if (piece) parts.push({ type: URL_PATTERN.test(piece) ? "link" : type, content: piece });
		}
	}

	return parts;
};

export default Typewriter;
