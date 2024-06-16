import { type UseInViewOptions, delay, motion, useAnimation, useInView } from "framer-motion";
import { type PropsWithChildren, useEffect, useRef } from "react";

interface Props extends UseInViewOptions {
	delay?: number;
	className?: string;
	variants?: {
		hidden: object;
		visible: object;
	};
	onEnter?: () => void;
	onExit?: () => void;
}
export const InView: React.FC<PropsWithChildren<Props>> = ({
	children,
	className,
	delay,
	variants,
	onEnter,
	onExit,
	...config
}) => {
	const ref = useRef(null);
	const inView = useInView(ref, { once: false, amount: 1, ...config });
	const controls = useAnimation();

	useEffect(() => {
		if (inView) {
			controls.start("visible");
			onEnter?.();
		} else {
			controls.start("hidden");
			onExit?.();
		}
	}, [controls, inView]);

	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={controls}
			variants={
				variants || {
					hidden: {
						opacity: 0,
					},
					visible: {
						opacity: 1,
						transition: {
							delay,
							duration: 1,
						},
					},
				}
			}
			className={className}
		>
			{children}
		</motion.div>
	);
};
