import { useEffect, useState } from "react";

export const useScreenSize = () => {
	const [screen, setScreen] = useState({ width: 0, height: 0 });

	useEffect(() => {
		const updateScreenSize = () => {
			setScreen({ width: window.innerWidth, height: window.innerHeight });
		};

		updateScreenSize();

		window.addEventListener("resize", updateScreenSize);

		return () => {
			window.removeEventListener("resize", updateScreenSize);
		};
	}, []);

	return screen;
};
