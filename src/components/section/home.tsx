"use client";

import { Section, SectionType } from "@/components/section";
import { InView } from "@/components/ui/in-view";
import Typewriter from "@/components/ui/typewriter";
import usePrefersColorScheme from "@/hooks/use-prefers-color-scheme";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import { changeLocale } from "@/actions/cookie";
import Github from "@/assets/tech-stacks/github.svg";
import LinkedIn from "@/assets/tech-stacks/linkedin.svg";
import useMediaQuery from "@/hooks/use-media-query";
import { useAppStore } from "@/store/app.store";
import { useLocale, useTranslations } from "next-intl";
import { useBackgroundTitle } from "../background-title";
import { Button } from "../ui/button";
import { FinderWindow } from "../ui/finder-window";
import { LinkButton } from "../ui/link-button";
import { useNavBarFunctions } from "./navbar";

import "dayjs/locale/en";
import "dayjs/locale/ja";
import "dayjs/locale/zh-cn";

export function Home() {
	const t = useTranslations("Home");
	const locale = useLocale();
	const { updateCurrentSection } = useAppStore();
	const theme = usePrefersColorScheme();
	const navbar = useNavBarFunctions();
	const bgTitle = useBackgroundTitle();
	const [time, setTime] = useState("");
	const isLargeScreen = useMediaQuery("(min-width: 640px)");

	useEffect(() => {
		dayjs.locale(locale);
		if (locale !== "en") {
			setTime(dayjs().format("(dddd) MMMD日 HH:mm:ss"));
		} else {
			setTime(dayjs().format("(dddd) MMM D HH:mm:ss"));
		}
	}, [locale]);

	return (
		<Section id={SectionType.HOME}>
			<div className="mt-5 mb-8">
				<InView
					amount="some"
					className="mb-5 flex gap-3 items-center"
					onEnter={() => {
						updateCurrentSection(SectionType.HOME);
						navbar.setActive(SectionType.HOME);
						navbar.trigger(true);
						bgTitle.changeText("Desmond Hiew");
					}}
				>
					<LinkButton href="https://github.com/desmondhiew00" aria-label="github">
						<Github className="w-5 h-5" color={theme === "dark" ? "#fff" : "#000"} />
					</LinkButton>
					<LinkButton href="https://www.linkedin.com/in/desmond-hiew-ab1a201b1" aria-label="linkedin">
						<LinkedIn className="w-6 h-6" color="#0a66c2" />
					</LinkButton>

					<hr className="border-[1px] h-[20px] border-gray-100 dark:border-zinc-700 rounded" />
					<Button className="" onClick={() => changeLocale("en")}>
						en
					</Button>
					<Button className="" onClick={() => changeLocale("ja")}>
						jp
					</Button>
					<Button className="" onClick={() => changeLocale("zh-cn")}>
						cn
					</Button>
				</InView>

				{time && (
					<div className="mb-2 text-[10px] sm:text-xs text-gray-500">
						{t("last-login")}: {time} on desmond hiew
					</div>
				)}
				<InView amount="some">
					<FinderWindow className="max-w-3xl" title="desmond hiew.txt">
						<div className="p-3 min-h-[300px]">
							<Typewriter className="mb-4" text={t("about-title")} cursor={false} delay={0.6} childDelay={0.5} />
							<Typewriter text={t("about-description")} delay={1} childDelay={0.5} speed={0.02} />
						</div>
					</FinderWindow>
				</InView>
			</div>
		</Section>
	);
}
