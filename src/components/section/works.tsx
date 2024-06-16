"use client";

import { Section } from "@/components/section";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";

import Typescript from "@/assets/tech-stacks/typescript.svg";
import { useAppStore } from "@/store/app.store";
import { useBackgroundTitle } from "../background-title";
import { InView } from "../common/in-view";
import { useNavBarFunctions } from "./navbar";

export function Works() {
	const { updateCurrentSection } = useAppStore();
	const navbar = useNavBarFunctions();
	const bgTitle = useBackgroundTitle();

	return (
		<Section id="works" className="relative pb-[120px]" title="Works">
			<InView
				amount="some"
				onEnter={() => {
					updateCurrentSection("works");
					navbar.setActive("works");
					navbar.trigger(false);
					bgTitle.changeText("Works");
				}}
			>
				<BentoGrid className="relative mx-0">
					{items.map((item, i) => (
						<BentoGridItem
							key={i}
							title={item.title}
							description={item.description}
							header={item.header}
							className={item.className}
							icon={item.icon}
						/>
					))}
				</BentoGrid>
			</InView>
		</Section>
	);
}

const Skeleton = () => (
	<div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black" />
);

const items = [
	{
		title: "The Dawn of Innovation",
		description: "Explore the birth of groundbreaking ideas and inventions.",
		header: <Skeleton />,
		className: "md:col-span-2",
		icon: (
			<div className="flex items-center gap-1">
				<Typescript className="h-4 w-4 text-neutral-500" />
				<Typescript className="h-4 w-4 text-neutral-500" />
				<Typescript className="h-4 w-4 text-neutral-500" />
				<Typescript className="h-4 w-4 text-neutral-500" />
			</div>
		),
	},
	{
		title: "The Digital Revolution",
		description: "Dive into the transformative power of technology.",
		header: <Skeleton />,
		className: "md:col-span-1",
		icon: <Typescript className="h-4 w-4 text-neutral-500" />,
	},
	{
		title: "The Art of Design",
		description: "Discover the beauty of thoughtful and functional design.",
		header: <Skeleton />,
		className: "md:col-span-1",
		icon: <Typescript className="h-4 w-4 text-neutral-500" />,
	},
	{
		title: "The Power of Communication",
		description: "Understand the impact of effective communication in our lives.",
		header: <Skeleton />,
		className: "md:col-span-2",
		icon: <Typescript className="h-4 w-4 text-neutral-500" />,
	},
	{
		title: "The Dawn of Innovation",
		description: "Explore the birth of groundbreaking ideas and inventions.",
		header: <Skeleton />,
		className: "md:col-span-2",
		icon: (
			<div className="flex items-center gap-1">
				<Typescript className="h-4 w-4 text-neutral-500" />
				<Typescript className="h-4 w-4 text-neutral-500" />
				<Typescript className="h-4 w-4 text-neutral-500" />
				<Typescript className="h-4 w-4 text-neutral-500" />
			</div>
		),
	},
	{
		title: "The Digital Revolution",
		description: "Dive into the transformative power of technology.",
		header: <Skeleton />,
		className: "md:col-span-1",
		icon: <Typescript className="h-4 w-4 text-neutral-500" />,
	},
	{
		title: "The Art of Design",
		description: "Discover the beauty of thoughtful and functional design.",
		header: <Skeleton />,
		className: "md:col-span-1",
		icon: <Typescript className="h-4 w-4 text-neutral-500" />,
	},
	{
		title: "The Power of Communication",
		description: "Understand the impact of effective communication in our lives.",
		header: <Skeleton />,
		className: "md:col-span-2",
		icon: <Typescript className="h-4 w-4 text-neutral-500" />,
	},
];
