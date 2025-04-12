import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";

interface LinkButtonProps {
  href: string;
  ariaLabel?: string;
}

export const LinkButton: React.FC<PropsWithChildren<LinkButtonProps>> = ({
  href,
  ariaLabel,
  children,
}) => {
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
      aria-label={ariaLabel}
    >
      {children}
    </motion.a>
  );
};
