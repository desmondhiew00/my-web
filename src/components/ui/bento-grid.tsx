import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[20rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export interface BentoGridItemProps {
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  image?: string;
  imgAttribution?: string;
  link?: string;
}
export const BentoGridItem: React.FC<BentoGridItemProps> = ({
  className,
  title,
  description,
  header,
  icon,
  image,
  imgAttribution,
  link,
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black bg-white border border-gray-100 dark:border-transparent justify-between flex flex-col space-y-4",
        className
      )}
    >
      {image ? (
        <div className="h-full w-full min-h-[9em] relative hover group-hover/bento:translate-y-2 transition duration-200">
          <img
            alt="bento-item-image"
            className="object-cover rounded w-full h-full"
            style={{ objectPosition: "0% 20%" }}
            src={image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {imgAttribution && (
            <span className="absolute bottom-[2px] right-[2px] bg-black/50 text-white/75 text-[6px] px-2">
              {imgAttribution}
            </span>
          )}
        </div>
      ) : (
        header
      )}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2 line-clamp-1">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300 sm:line-clamp-5">
          {description}
        </div>
        {link && (
          <motion.div whileTap={{ scale: 0.99 }}>
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="font-sans font-normal text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200 text-xs"
            >
              View more
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export const SkeletonImage = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black" />
);
