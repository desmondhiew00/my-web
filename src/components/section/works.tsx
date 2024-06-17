"use client";

import { Section } from "@/components/section";
import { BentoGrid, BentoGridItem, SkeletonImage } from "../ui/bento-grid";

import { useAppStore } from "@/store/app.store";
import { useBackgroundTitle } from "../background-title";
import { InView } from "../common/in-view";
import { useNavBarFunctions } from "./navbar";

import Graphql from "@/assets/tech-stacks/graphql.svg";
import NestJs from "@/assets/tech-stacks/nestjs.svg";
import NextJs from "@/assets/tech-stacks/nextjs.svg";
import React from "@/assets/tech-stacks/reactjs.svg";
import Typescript from "@/assets/tech-stacks/typescript.svg";
import usePrefersColorScheme from "@/hooks/use-prefers-color-scheme";

export function Works() {
	const { updateCurrentSection } = useAppStore();
	const theme = usePrefersColorScheme();
	const navbar = useNavBarFunctions();
	const bgTitle = useBackgroundTitle();
	const iconColor = theme === "light" ? "#000" : "#fff";

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
					{items(iconColor).map((item, i) => (
						<BentoGridItem
							key={i}
							title={item.title}
							description={item.description}
							header={item.header}
							image={item.image}
							className={item.className}
							icon={item.icon}
						/>
					))}
				</BentoGrid>
			</InView>
		</Section>
	);
}

const items = (color: string) => [
	{
		title: "Service Provider Management System",
		description: `
		A web app for managing and onboarding service providers, featuring secure authentication with AWS Cognito,
		Key functionalities include multi-step application processes, profile management, email notifications, and detailed reporting.
		`,
		image: "/images/management-system.jpg",
		className: "md:col-span-1",
		icon: (
			<div className="flex items-center gap-1">
				<Typescript className="h-4 w-4" color={color} />
				<React className="h-4 w-4" color={color} />
				<NextJs className="h-4 w-4" color={color} />
				<NestJs className="h-4 w-4" color={color} />
				<Graphql className="h-4 w-4" color={color} />
			</div>
		),
	},
	{
		title: "The Digital Revolution",
		description: "Dive into the transformative power of technology.",
		header: <SkeletonImage />,
		className: "md:col-span-1",
		icon: <Typescript className="h-4 w-4" />,
	},
	{
		title: "The Art of Design",
		description: "Discover the beauty of thoughtful and functional design.",
		header: <SkeletonImage />,
		className: "md:col-span-1",
		icon: <Typescript className="h-4 w-4" />,
	},
	{
		title: "The Power of Communication",
		description: "Understand the impact of effective communication in our lives.",
		header: <SkeletonImage />,
		className: "md:col-span-2",
		icon: <Typescript className="h-4 w-4" />,
	},
	{
		title: "The Dawn of Innovation",
		description: "Explore the birth of groundbreaking ideas and inventions.",
		header: <SkeletonImage />,
		className: "md:col-span-1",
		icon: (
			<div className="flex items-center gap-1">
				<Typescript className="h-4 w-4" />
				<Typescript className="h-4 w-4" />
				<Typescript className="h-4 w-4" />
				<Typescript className="h-4 w-4" />
			</div>
		),
	},
];
