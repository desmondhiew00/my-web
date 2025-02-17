"use client";

import { Section, SectionType } from "@/components/section";
import { InView } from "@/components/ui/in-view";
import usePrefersColorScheme from "@/hooks/use-prefers-color-scheme";
import { animate, inView, motion } from "framer-motion";

import I18nFolder from "@/assets/folder/i18n-folder.svg";
import SrcFolder from "@/assets/folder/src-folder.svg";
import ToolsFolder from "@/assets/folder/tools-folder.svg";

import Coffee from "@/assets/coffee.svg";
import Macbook from "@/assets/macbook.svg";
import Speaker from "@/assets/speaker.svg";
import Aws from "@/assets/tech-stacks/aws.svg";
import Css3 from "@/assets/tech-stacks/css3.svg";
import Graphql from "@/assets/tech-stacks/graphql.svg";
import Html5 from "@/assets/tech-stacks/html5.svg";
import I18n from "@/assets/tech-stacks/i18n.svg";
import Js from "@/assets/tech-stacks/js.svg";
import MySQL from "@/assets/tech-stacks/mysql.svg";
import Nestjs from "@/assets/tech-stacks/nestjs.svg";
import Nextjs from "@/assets/tech-stacks/nextjs.svg";
import Nodejs from "@/assets/tech-stacks/nodejs.svg";
import Reactjs from "@/assets/tech-stacks/reactjs.svg";
import Typescript from "@/assets/tech-stacks/typescript.svg";
import Video from "@/assets/video.svg";

import { useAppStore } from "@/store/app.store";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo } from "react";
import { useBackgroundTitle } from "../background-title";
import { useNavBarFunctions } from "./navbar";

export function Skills() {
	const locale = useLocale();
	const t = useTranslations("Skills");
	const { updateCurrentSection } = useAppStore();
	const theme = usePrefersColorScheme();
	const navbar = useNavBarFunctions();
	const bgTitle = useBackgroundTitle();
	const color = theme === "dark" ? "#fff" : "#000";

	const skills = useMemo(
		() => [
			{ name: "javascript.js", Icon: Js },
			{ name: "typescript.ts", Icon: Typescript },
			{ name: "node.js", Icon: Nodejs },
			{ name: "index.html", Icon: Html5 },
			{ name: "style.css", Icon: Css3 },
			{ name: "mysql.sql", Icon: MySQL },
			{ name: "react.tsx", Icon: Reactjs },
			{ name: "graphql.gql", Icon: Graphql },
			{ name: "next.js", Icon: Nextjs },
			{ name: "nest.js", Icon: Nestjs },
			{ name: "aws.cloud", Icon: Aws },
		],
		[],
	);

	const languages = useMemo(
		() => [
			{ name: t("en"), Icon: I18n },
			{ name: t("cn"), Icon: I18n },
			{ name: t("jp"), Icon: I18n },
		],
		[locale],
	);

	const tools = useMemo(
		() => [
			{ name: t("mac"), Icon: Macbook },
			{ name: t("coffee"), Icon: Coffee },
			{ name: t("audio"), Icon: Speaker },
			{ name: t("anime"), Icon: Video },
		],
		[locale],
	);

	useEffect(() => {
		inView("#skill-item", ({ target }) => {
			animate(target, { opacity: 1, x: 0 }, { delay: Math.random() * 0.5 });
			return () => {
				animate(target, { opacity: 0, x: -50 });
			};
		});
	}, [locale]);

	return (
		<Section id={SectionType.SKILLS} title={t("title")}>
			<InView
				amount="some"
				className="mt-4 space-y-8"
				variants={{
					hidden: {
						x: -100,
						opacity: 0,
					},
					visible: {
						x: 0,
						opacity: 1,
						transition: {
							duration: 0.5,
						},
					},
				}}
				onEnter={() => {
					updateCurrentSection(SectionType.SKILLS);
					navbar.setActive(SectionType.SKILLS);
					navbar.trigger(false);
					bgTitle.changeText("Skills");
				}}
			>
				<div>
					<FolderItem text={t("folder_skill")} Icon={SrcFolder} color={color} />
					<div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
						{skills.map((data) => (
							<ListItem key={data.name} color={color} {...data} />
						))}
					</div>
				</div>

				<div>
					<FolderItem text={t("folder_lang")} Icon={I18nFolder} color={color} />
					<div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
						{languages.map((data) => (
							<ListItem key={data.name} color={color} {...data} />
						))}
					</div>
				</div>

				<div>
					<FolderItem text={t("folder_fuels")} Icon={ToolsFolder} color={color} />
					<div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
						{tools.map((data) => (
							<ListItem key={data.name} color={color} {...data} />
						))}
					</div>
				</div>
			</InView>
		</Section>
	);
}

// biome-ignore lint/suspicious/noExplicitAny: No type for SVGR icon
const FolderItem = ({ color, text, Icon }: { color: string; text: string; Icon: any }) => {
	return (
		<div className="flex items-center gap-2 mb-4">
			<div className="p-1 rounded-md shadow center">
				<Icon className="w-5 h-5 sm:w-8 sm:h-8" color={color} />
			</div>
			<span>{text}</span>
		</div>
	);
};

// biome-ignore lint/suspicious/noExplicitAny: No type for SVGR icon
const ListItem = ({ name, Icon, color }: { name: string; Icon: any; color: string }) => {
	return (
		<motion.div
			id="skill-item"
			key={name}
			className="flex items-center ml-3 sm:ml-5 gap-2 relative w-fit"
			initial={{ opacity: 0 }}
		>
			<div className="p-1 rounded-md shadow center">
				<Icon className="w-6 h-6 sm:w-7 sm:h-7" color={color} />
			</div>

			<span className="text-[10px] sm:text-sm">{name}</span>
			<div className="absolute right-0 w-[50%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
		</motion.div>
	);
};

export default Skills;
