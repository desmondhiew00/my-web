import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

interface LinkButtonProps {
	href: string;
}

export const LinkButton: React.FC<PropsWithChildren<LinkButtonProps>> = ({ href, children }) => {
	return (
		<motion.a
			whileHover={{
				scale: 1.15,
				transition: { duration: 0.3 },
			}}
			whileTap={{ scale: 0.9 }}
			rel="noreferrer"
			target="_blank"
			href={href}
		>
			{children}
		</motion.a>
	);
};
