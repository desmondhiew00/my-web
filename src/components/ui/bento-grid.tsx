import { cn } from "@/lib/utils";
import Image from "next/image";

export const BentoGrid = ({
	className,
	children,
}: {
	className?: string;
	children?: React.ReactNode;
}) => {
	return (
		<div className={cn("grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ", className)}>
			{children}
		</div>
	);
};

interface BentoGridItemProps {
	className?: string;
	title?: string | React.ReactNode;
	description?: string | React.ReactNode;
	header?: React.ReactNode;
	icon?: React.ReactNode;
	image?: string;
}
export const BentoGridItem: React.FC<BentoGridItemProps> = ({ className, title, description, header, icon, image }) => {
	return (
		<div
			className={cn(
				"row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-gray-100 dark:border-transparent justify-between flex flex-col space-y-4",
				className,
			)}
		>
			{image ? (
				<div className="h-full w-full min-h-[8em] relative">
					<Image
						alt="bento-item-image"
						className="object-cover rounded"
						src={image}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				</div>
			) : (
				header
			)}
			<div className="group-hover/bento:translate-x-2 transition duration-200">
				{icon}
				<div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">{title}</div>
				<div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">{description}</div>
			</div>
		</div>
	);
};

export const SkeletonImage = () => (
	<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black" />
);
