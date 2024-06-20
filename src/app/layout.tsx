import type { Metadata } from "next";
import localFont from "next/font/local";

import "@/styles/globals.css";

const geistSans = localFont({
	src: "../styles/fonts/GeistVF.woff",
	variable: "--font-geist-sans",
});
const geistMono = localFont({
	src: "../styles/fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
});

export const metadata: Metadata = {
	title: "desmondhiew",
	description: "Full-stack developer, making things works with code.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
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

			<body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
		</html>
	);
}
