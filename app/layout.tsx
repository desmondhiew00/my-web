import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Stick } from "next/font/google";
import localFont from "next/font/local";

import "@/styles/globals.css";
import { cn } from "@/lib/utils";

const geistSans = localFont({
	src: "../src/styles/fonts/GeistVF.woff",
	variable: "--font-geist-sans",
});
const geistMono = localFont({
	src: "../src/styles/fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
});
const jpFont = Stick({
	subsets: ["latin"],
	display: "swap",
	weight: ["400"],
});

export const metadata: Metadata = {
	title: "desmondhiew",
	description: "Full-stack developer, making things works with code. (desmondhiew)",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getLocale();
	const messages = await getMessages();

	return (
		<html lang={locale}>
			<head>
				<meta name="description" content={metadata.description || ""} />
				<meta name="theme-color" content="#000000" />
				<meta name="color-scheme" content="light dark" />

				<meta name="creator" content="desmondhiew" />
				<meta name="author" content="desmondhiew" />
				<meta property="og:title" content="desmondhiew" />
				<meta property="og:description" content={metadata.description || ""} />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://desmondhiew.com" />
				<meta property="og:site_name" content="desmondhiew" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="desmondhiew" />
				<meta name="twitter:description" content="desmondhiew's hello world" />
			</head>

			<body
				className={cn(`${geistSans.variable} ${geistMono.variable}`, locale === "jp" ? jpFont.className : "")}
				style={{
					fontFamily: `${geistMono.style.fontFamily}, ${jpFont.style.fontFamily}`,
				}}
			>
				<NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
				<GoogleAnalytics gaId={process.env.GA_ID ?? ""} />
			</body>
		</html>
	);
}
