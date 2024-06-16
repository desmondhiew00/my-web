import { cn } from "@/lib/utils";

interface Props {
	text: string;
	size: number;
	style?: React.CSSProperties;
	className?: string;
	color?: string;
}

export const RotateTextCircle: React.FC<Props> = ({ className, style, text, size, color }) => {
	return (
		<svg
			className={cn("animate-rotate", className)}
			viewBox="0 0 200 200"
			width={size * 1.8}
			height={size * 1.8}
			style={{
				letterSpacing: 4,
				...style,
			}}
		>
			<title>{text}</title>
			<defs>
				<path id="circle" d="M 100, 100 m -75, 0 a 75, 75 0 1, 0 150, 0 a 75, 75 0 1, 0 -150, 0" />
			</defs>
			<text>
				<textPath fill={color || "#fff"} href="#circle">
					{text}
				</textPath>
			</text>
		</svg>
	);
};
