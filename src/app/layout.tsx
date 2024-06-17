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
	title: "dh.",
	description: "Desmond Hiew",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="description" content="Desmond Hiew" />
				<meta name="theme-color" content="#000000" />
				<meta name="color-scheme" content="light dark" />
				<meta property="og:title" content="dh." />
				<meta property="og:description" content="Desmond Hiew" />
				<meta property="og:image" content="/avatar.jpeg" />
				<meta property="og:url" content="https://desmondhiew.cc" />
				<meta property="og:type" content="website" />
				<meta property="og:site_name" content="Desmond Hiew" />
				<title>dh.</title>
			</head>

			<body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
		</html>
	);
}
