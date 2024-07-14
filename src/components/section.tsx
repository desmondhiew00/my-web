"use client";

import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import type { PropsWithChildren } from "react";
import { HEADER_HEIGHT } from "./section/header";

export enum SectionType {
	HOME = "home",
	SKILLS = "skills",
	WORKS = "works",
}
export const SectionTypes: SectionType[] = [SectionType.HOME, SectionType.SKILLS, SectionType.WORKS];

interface Props {
	id: SectionType;
	className?: string;
	title?: string;
}
export const Section: React.FC<PropsWithChildren<Props>> = ({ children, className, id, title }) => {
	// const { height } = useScreenSize();
	const locale = useLocale();

	return (
		<section id={id} className={cn("ml-10 sm:ml-16 pr-6 min-h-screen relative", HEADER_HEIGHT.pt, className)}>
			{title && (
				<div className="relative mb-5 w-fit sm:px-10 px-5 py-2 rounded-md">
					<h2 className={cn("text-xl sm:text-3xl font-bold", locale === "en" ? "font-sans" : "")}>{title}</h2>
					<div className="absolute left-0 bottom-0 w-full z-30 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
				</div>
			)}
			{children}
		</section>
	);
};
