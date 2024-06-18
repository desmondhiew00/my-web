import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Props {
	text: string;
	delay?: number;
	style?: object;
	className?: string;
	onClick?: () => void;
}
export const TextButton: React.FC<Props> = ({ text, onClick, delay = 0, className, style }) => {
	return (
		<motion.button
			className={cn("relative w-fit", className)}
			whileHover={{ x: 10, transition: { duration: 0.3 } }}
			whileTap={{ scale: 0.9 }}
			style={style}
		>
			<motion.div
				className={cn("relative z-10 overflow-hidden py-2", onClick ? "cursor-pointer" : "")}
				transition={{ delay: delay + 0.6, duration: 1 }}
				initial={{ width: "0%" }}
				animate={{ width: "100%" }}
				onClick={onClick}
			>
				<span className="px-6 no-select">{text}</span>
			</motion.div>
			<motion.div
				className={cn("absolute bg-gray-100 dark:bg-zinc-800 h-full top-0 left-0 opacity-80")}
				transition={{ delay: delay, duration: 0.6, ease: "easeInOut" }}
				initial={{ width: "0%" }}
				animate={{ width: "100%" }}
			/>
		</motion.button>
	);
};
