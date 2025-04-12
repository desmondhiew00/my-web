import { createContext, useContext } from "react";

interface AppContext {
	mainRef: React.RefObject<HTMLDivElement | null>;
}

export const AppContext = createContext<AppContext>({
	mainRef: { current: null },
});

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (context === undefined) throw new Error("useAppContext must be used within a AppProvider");
	return context;
};

