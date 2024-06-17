"use client";

import { Section } from "@/components/section";
import worksData from "@/data/works";
import usePrefersColorScheme from "@/hooks/use-prefers-color-scheme";
import { useAppStore } from "@/store/app.store";
import { useBackgroundTitle } from "../background-title";
import { BentoGrid, BentoGridItem, SkeletonImage } from "../ui/bento-grid";
import { InView } from "../ui/in-view";
import { useNavBarFunctions } from "./navbar";

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
					{worksData(iconColor).map((item, i) => (
						<BentoGridItem {...item} key={i} />
					))}
				</BentoGrid>

				<div className="ml-5 mt-2">
					<span>And more to come...</span>
				</div>
			</InView>
		</Section>
	);
}
