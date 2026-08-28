import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { Footer } from "@/components/section/footer";
import { Header } from "@/components/section/header";
import { Home } from "@/components/section/home";
import { TracingBeam } from "@/components/ui/tracing-beam";

import "./i18n";

export default function Root() {
	return (
		<I18nProvider i18n={i18n}>
			<TracingBeam>
				<Header />
				<Home />
				<Footer />
			</TracingBeam>
		</I18nProvider>
	);
}
