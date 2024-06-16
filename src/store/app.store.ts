import type { SectionType } from "@/components/section";
import { create } from "zustand";

interface IAppStore {
	bgTitle: string;
	currentSection: SectionType;
	collapsed: boolean;

	updateBgTitle: (text: string) => void;
	updateCurrentSection: (section: SectionType) => void;
	updateCollapsed: (collapsed: boolean) => void;
}

export const useAppStore = create<IAppStore>((set) => ({
	bgTitle: "Desmond Hiew",
	currentSection: "home",
	collapsed: false,

	updateBgTitle: (text: string) => set({ bgTitle: text }),
	updateCurrentSection: (section: SectionType) => set({ currentSection: section }),
	updateCollapsed: (collapsed: boolean) => set({ collapsed }),
}));
