"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

interface Props {
	className?: string;
	title?: string;
}

export const FinderWindow: React.FC<PropsWithChildren<Props>> = ({ children, className, title }) => {
	return (
		<div
			className={cn(
				"flex flex-col w-full overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800 shadow-[rgba(0,_0,_0,_0.2)_0px_15px_50px] lg:mt-0",
				className,
			)}
		>
			<div className="flex relative h-8 flex-row items-center gap-2 bg-gray-50 dark:bg-[#12151D] px-2 overflow-hidden">
				<div className="flex gap-2 bg-inherit z-10 pr-2">
					<div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-red-500" />
					<div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-gray-300" />
					<div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-green-500" />
				</div>
				{title && (
					<motion.h2
						className="center-x w-full absolute sm:left-0 text-xs sm:text-base"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3, duration: 1 }}
					>
						{title}
					</motion.h2>
				)}
			</div>
			<div className="w-full bg-gray-100 dark:bg-zinc-800 h-full overflow-auto flex">{children}</div>
		</div>
	);
};
