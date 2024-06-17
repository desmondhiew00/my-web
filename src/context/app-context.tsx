"use client";

import { TracingBeam } from "@/components/ui/tracing-beam";
import { createContext, useContext, useRef } from "react";

interface AppContext {
	mainRef: React.RefObject<HTMLDivElement>;
}

export const AppContext = createContext<AppContext>({
	mainRef: { current: null },
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const mainRef = useRef<HTMLDivElement>(null);

	return (
		<AppContext.Provider value={{ mainRef }}>
			<TracingBeam containerRef={mainRef}>{children}</TracingBeam>
		</AppContext.Provider>
	);
};

const useAppContext = () => {
	const context = useContext(AppContext);
	if (context === undefined) throw new Error("useAppContext must be used within a AppProvider");
	return context;
};

export { useAppContext };
export default AppProvider;
