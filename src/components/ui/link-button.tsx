import { motion } from "framer-motion";
import type { ComponentProps } from "react";

export const LinkButton: React.FC<ComponentProps<typeof motion.a>> = (
  props,
) => {
  return (
    <motion.a
      whileHover={{
        scale: 1.15,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.9 }}
      rel="noreferrer"
      target="_blank"
      {...props}
    />
  );
};
