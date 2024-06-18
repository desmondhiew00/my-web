"use client";

import Github from "@/assets/tech-stacks/github.svg";
import LinkedIn from "@/assets/tech-stacks/linkedin.svg";
import usePrefersColorScheme from "@/hooks/use-prefers-color-scheme";
import { LinkButton } from "../ui/link-button";

export const Footer = () => {
	const theme = usePrefersColorScheme();

	return (
		<div className="w-full py-4 space-y-2">
			<div className="center gap-3">
				<LinkButton href="https://github.com/desmondhiew00" ariaLabel="github">
					<Github className="w-5 h-5" color={theme === "dark" ? "#fff" : "#000"} />
				</LinkButton>
				<LinkButton href="https://www.linkedin.com/in/desmond-hiew-ab1a201b1" ariaLabel="linkedin">
					<LinkedIn className="w-6 h-6" color="#0a66c2" />
				</LinkButton>
			</div>
			<div className="text-center text-xs">
				<span>Made with ☕ by Desmond Hiew</span>
			</div>
		</div>
	);
};
