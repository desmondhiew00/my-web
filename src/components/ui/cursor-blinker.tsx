import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const cursorVariants = (duration = 1) => ({
	blinking: {
		opacity: [0, 0, 1, 1],
		transition: {
			duration,
			repeat: Infinity,
			repeatDelay: 0,
			ease: "linear",
			times: [0, 0.5, 0.5, 1],
		},
	},
});

interface Props {
	className?: string;
	duration?: number;
	type?: "cursor" | "lodash";
}

export const CursorBlinker: React.FC<Props> = ({ className, duration, type }) => {
	return (
		<motion.div
			variants={cursorVariants(duration)}
			animate="blinking"
			className={cn(
				"inline-block bg-slate-900 dark:bg-white",
				type === "cursor" ? cursorStyle : lodashStyle,
				className,
			)}
		/>
	);
};

const cursorStyle = "inline-block h-5 w-[1px] bg-slate-900 dark:bg-white";
const lodashStyle = "inline-block h-[2px] w-2.5 rounded-md bg-slate-900 dark:bg-white rounded-full";
