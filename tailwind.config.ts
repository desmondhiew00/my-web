import svgToDataUri from "mini-svg-data-uri";
import type { Config } from "tailwindcss";
// import colors from "tailwindcss/colors";
// import defaultTheme from "tailwindcss/defaultTheme";
// @ts-ignore
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				"shell-indicator": "var(--shell-indicator)",
			},
			fontFamily: {
				sans: ["var(--font-geist-sans)"],
				mono: ["var(--font-geist-mono)"],
			},
			animation: {
				"meteor-effect": "meteor 5s linear infinite",
				rotate: "rotate 5s linear infinite",
			},
			keyframes: {
				meteor: {
					"0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
					"70%": { opacity: "1" },
					"100%": {
						transform: "rotate(215deg) translateX(-500px)",
						opacity: "0",
					},
				},
				rotate: {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(360deg)" },
				},
			},
		},
	},
	plugins: [
		addVariablesForColors,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		({ matchUtilities, theme }: any) => {
			matchUtilities(
				{
					"bg-grid": (value: string) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
						)}")`,
					}),
					"bg-grid-small": (value: string) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
						)}")`,
					}),
					"bg-dot": (value: string) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`,
						)}")`,
					}),
				},
				{ values: flattenColorPalette(theme("backgroundColor")), type: "color" },
			);
		},
	],
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function addVariablesForColors({ addBase, theme }: any) {
	const allColors = flattenColorPalette(theme("colors"));
	const newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

	addBase({
		":root": newVars,
	});
}

export default config;
