"use client";

import useMediaQuery from "@/hooks/use-media-query";
import usePrefersColorScheme from "@/hooks/use-prefers-color-scheme";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/app.store";
import { Logo } from "../logo";
import { MenuButton } from "../ui/menu-button";
import { useNavBarFunctions } from "./navbar";

interface Props {
	className?: string;
}

export const HEADER_HEIGHT = {
	mt: "mt-[52px] sm:mt-[80px]",
	pt: "pt-[52px] sm:pt-[80px]",
	h: "h-[52px] sm:h-[80px]",
};

export const Header: React.FC<Props> = ({ className }) => {
	const { collapsed } = useAppStore();
	const theme = usePrefersColorScheme();
	const isLargeScreen = useMediaQuery("(min-width: 640px)");
	const navbar = useNavBarFunctions();

	return (
		<>
			<div
				className={cn(
					HEADER_HEIGHT.h,
					"pl-[24px] sm:pl-[32px] pr-4 w-full flex justify-between items-center fixed z-20 top-0",
					"glassmorphism",
					className,
				)}
			>
				<Logo />
				<MenuButton
					className="p-1.5 sm:p-3 center"
					isOpen={collapsed}
					onClick={() => {
						navbar.trigger(!collapsed);
					}}
					strokeWidth={isLargeScreen ? 3 : 2}
					color={theme === "dark" ? "#fff" : "#000"}
					lineProps={{ strokeLinecap: "round" }}
					transition={{ type: "spring", stiffness: 260, damping: 20 }}
					width={isLargeScreen ? 20 : 10}
					height={isLargeScreen ? 20 : 10}
				/>
			</div>
		</>
	);
};
