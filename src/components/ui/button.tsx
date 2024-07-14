import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

interface Props {
	className?: string;
	onClick?: () => void;
}
export const Button: React.FC<PropsWithChildren<Props>> = ({ className, children, onClick }) => {
	return (
		<motion.button
			className={cn("px-2 bg-gray-100 dark:bg-zinc-800 rounded", className)}
			whileHover={{ y: 2, transition: { duration: 0.3 } }}
			whileTap={{ scale: 0.9 }}
			onClick={onClick}
		>
			{children}
		</motion.button>
	);
};
