import { TracingBeam } from "@/components/ui/tracing-beam";
import { useRef } from "react";
import { AppContext } from "./app-context";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const mainRef = useRef<HTMLDivElement>(null);
  return (
    <AppContext.Provider value={{ mainRef }}>
      <TracingBeam containerRef={mainRef}>{children}</TracingBeam>
    </AppContext.Provider>
  );
};

export default AppProvider;
