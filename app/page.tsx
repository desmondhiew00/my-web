import { Footer } from "@/components/section/footer";
import { Header } from "@/components/section/header";
import { Home } from "@/components/section/home";
import { NavBar } from "@/components/section/navbar";
import { GoogleTagManager } from "@next/third-parties/google";
import dynamic from "next/dynamic";
import Providers from "./providers";

const Skills = dynamic(() => import("@/components/section/skills"), {
	ssr: false,
	loading: () => <div />,
});

const Works = dynamic(() => import("@/components/section/works"), {
	ssr: false,
	loading: () => <div />,
});

const BackgroundTitle = dynamic(() => import("@/components/background-title"), {
	ssr: false,
	loading: () => <div />,
});

export default function Root() {
	return (
		<>
			<GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GA_ID ?? ""} />
			<Providers>
				<Header />
				<NavBar />

				<Home />
				<Skills />
				<Works />
				<Footer />

				<BackgroundTitle />
			</Providers>
		</>
	);
}
