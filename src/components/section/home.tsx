import Github from "@/assets/tech-stacks/github.svg?react";
import LinkedIn from "@/assets/tech-stacks/linkedin.svg?react";
import { Section, SectionType } from "@/components/section";
import { Terminal } from "@/components/terminal";
import { InView } from "@/components/ui/in-view";
import usePrefersColorScheme from "@/hooks/use-prefers-color-scheme";
import { activateLocale } from "@/i18n";
import { Button } from "../ui/button";
import { LinkButton } from "../ui/link-button";

export function Home() {
	const theme = usePrefersColorScheme();
	// const isLargeScreen = useMediaQuery("(min-width: 640px)");

	return (
		<Section id={SectionType.HOME}>
			<div className="mt-5 mb-8">
				<InView amount="some" className="mb-5 flex gap-3 items-center">
					<LinkButton href="https://github.com/desmondhiew00" aria-label="GitHub profile">
						<Github className="w-5 h-5" color={theme === "dark" ? "#fff" : "#000"} />
					</LinkButton>
					<LinkButton
						href="https://www.linkedin.com/in/desmond-hiew-ab1a201b1"
						aria-label="LinkedIn profile"
					>
						<LinkedIn className="w-6 h-6" color="#0a66c2" />
					</LinkButton>

					<hr className="border-[1px] h-[20px] border-gray-100 dark:border-zinc-700 rounded" />
					<Button className="" onClick={() => activateLocale("en")}>
						en
					</Button>
					<Button className="" onClick={() => activateLocale("ja")}>
						jp
					</Button>
					<Button className="" onClick={() => activateLocale("zh-CN")}>
						cn
					</Button>
				</InView>

				<InView amount="some">
					<Terminal />
				</InView>
			</div>
		</Section>
	);
}
