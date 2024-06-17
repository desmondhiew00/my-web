"use client";

import { useScreenSize } from "@/hooks/use-screen-size";
import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

export type SectionType = "home" | "skills" | "works";
export const Sections: SectionType[] = ["home", "skills", "works"];

interface Props {
	id: SectionType;
	className?: string;
	title?: string;
}
export const Section: React.FC<PropsWithChildren<Props>> = ({ children, className, id, title }) => {
	const { height } = useScreenSize();
	return (
		<section
			id={id}
			className={cn("ml-10 sm:ml-16 pr-6 min-h-screen relative", height > 648 ? "snap-center" : "", className)}
		>
			{title && (
				<div className="relative mb-5 w-fit px-10 py-2 rounded-md">
					<h2 className="text-3xl font-bold font-sans">{title}</h2>
					<div className="absolute left-0 bottom-0 w-full z-30 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
				</div>
			)}
			{children}
		</section>
	);
};
