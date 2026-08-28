import { cn } from "@/lib/utils";
import { Logo } from "../logo";

interface Props {
	className?: string;
}

export const HEADER_HEIGHT = {
	mt: "mt-[52px] sm:mt-[80px]",
	pt: "pt-[52px] sm:pt-[80px]",
	h: "h-[52px] sm:h-[80px]",
};

export const Header: React.FC<Props> = ({ className }) => {
	return (
		<div
			className={cn(
				HEADER_HEIGHT.h,
				"pl-[24px] sm:pl-[32px] pr-4 w-full flex justify-between items-center fixed z-20 top-0",
				"glassmorphism",
				className,
			)}
		>
			<Logo />
		</div>
	);
};
