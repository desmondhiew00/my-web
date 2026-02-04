import { Footer } from "@/components/section/footer";
import { Header } from "@/components/section/header";
import { Home } from "@/components/section/home";
import { NavBar } from "@/components/section/navbar";
import { lazy } from "react";
import { AppProvider } from "./context/app-provider";

import "./i18n/init";
// import analytics from "./lib/firebase-analytics";
// import { logEvent } from "firebase/analytics";

const Skills = lazy(() => import("@/components/section/skills"));
const Works = lazy(() => import("@/components/section/works"));
const BackgroundTitle = lazy(() => import("@/components/background-title"));

export default function Root() {
  // useEffect(() => {
  //   logEvent(analytics, "page_view", { page: "home" });
  // }, []);

  return (
    <AppProvider>
      <Header />
      <NavBar />

      <Home />
      <Skills />
      <Works />
      <Footer />

      <BackgroundTitle />
    </AppProvider>
  );
}
