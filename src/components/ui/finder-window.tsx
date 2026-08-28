import { motion, useDragControls } from "framer-motion";
import { type PropsWithChildren, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
	className?: string;
	title?: string;
}

export const FinderWindow: React.FC<PropsWithChildren<Props>> = ({
	children,
	className,
	title,
}) => {
	// Drag from the title bar only, so selecting text in the body still works.
	const dragControls = useDragControls();
	const ref = useRef<HTMLDivElement>(null);
	const [bounds, setBounds] = useState({
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
	});

	// The window can be dropped anywhere on screen, but not past the edges.
	useEffect(() => {
		const measure = () => {
			const el = ref.current;
			if (!el) return;
			// Measure the layout box, not wherever a previous drag left it.
			const dragged = el.style.transform;
			el.style.transform = "none";
			const box = el.getBoundingClientRect();
			el.style.transform = dragged;
			setBounds({
				left: -box.left,
				right: window.innerWidth - box.right,
				top: -box.top,
				bottom: window.innerHeight - box.bottom,
			});
		};
		measure();
		window.addEventListener("resize", measure);
		window.addEventListener("scroll", measure, { passive: true });
		return () => {
			window.removeEventListener("resize", measure);
			window.removeEventListener("scroll", measure);
		};
	}, []);

	return (
		<motion.div
			ref={ref}
			drag
			dragListener={false}
			dragControls={dragControls}
			dragMomentum={false}
			dragElastic={0}
			dragConstraints={bounds}
			whileDrag={{ scale: 1.01 }}
			className={cn(
				"flex flex-col w-full overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800 shadow-[rgba(0,_0,_0,_0.2)_0px_15px_50px] lg:mt-0",
				className,
			)}
		>
			<div
				className="flex relative h-8 flex-row items-center gap-2 bg-gray-50 dark:bg-[#12151D] px-2 overflow-hidden cursor-grab active:cursor-grabbing no-select touch-none"
				onPointerDown={(e) => dragControls.start(e)}
			>
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
			<div className="w-full bg-gray-100 dark:bg-zinc-800 h-full overflow-auto flex">
				{children}
			</div>
		</motion.div>
	);
};
