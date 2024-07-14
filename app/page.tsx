import { BackgroundTitle } from "@/components/background-title";
import { Footer } from "@/components/section/footer";
import { Header } from "@/components/section/header";
import { Home } from "@/components/section/home";
import { NavBar } from "@/components/section/navbar";
import { Skills } from "@/components/section/skills";
import { Works } from "@/components/section/works";
import Providers from "./providers";

export default function Root() {
	return (
		<Providers>
			<Header />
			<NavBar />

			<Home />
			<Skills />
			<Works />
			<Footer />

			<BackgroundTitle />
		</Providers>
	);
}
