import { useEffect, useLayoutEffect, useState } from "react";

export type ColorScheme = "light" | "dark";

const usePrefersColorScheme = (): ColorScheme => {
	const [colorScheme, setColorScheme] = useState<ColorScheme>("light");

	useLayoutEffect(() => {
		if (typeof window !== "undefined") {
			setColorScheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
		}
	});

	useEffect(() => {
		const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		const handleChange = (event: MediaQueryListEvent) => {
			setColorScheme(event.matches ? "dark" : "light");
		};

		darkModeMediaQuery.addEventListener("change", handleChange);

		return () => {
			darkModeMediaQuery.removeEventListener("change", handleChange);
		};
	}, []);

	return colorScheme;
};

export default usePrefersColorScheme;
