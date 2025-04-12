"use client";

import { Section, SectionType } from "@/components/section";
// import worksData from "@/data/works";
import usePrefersColorScheme from "@/hooks/use-prefers-color-scheme";
import { useAppStore } from "@/store/app.store";
import { useBackgroundTitle } from "../background-title";
import {
  BentoGrid,
  BentoGridItem,
  type BentoGridItemProps,
} from "../ui/bento-grid";
import { InView } from "../ui/in-view";
import { useNavBarFunctions } from "./navbar";

import Css from "@/assets/tech-stacks/css3.svg?react";
import Firebase from "@/assets/tech-stacks/firebase.svg?react";
import Graphql from "@/assets/tech-stacks/graphql.svg?react";
import Html from "@/assets/tech-stacks/html5.svg?react";
import Jquery from "@/assets/tech-stacks/jquery.svg?react";
import Javascript from "@/assets/tech-stacks/js.svg?react";
import Mysql from "@/assets/tech-stacks/mysql.svg?react";
import NestJs from "@/assets/tech-stacks/nestjs.svg?react";
import NextJs from "@/assets/tech-stacks/nextjs.svg?react";
import NodeJs from "@/assets/tech-stacks/nodejs.svg?react";
import React from "@/assets/tech-stacks/reactjs.svg?react";
import Typescript from "@/assets/tech-stacks/typescript.svg?react";
import VsCode from "@/assets/tech-stacks/vscode.svg?react";
import { useTranslation } from "react-i18next";
import { type PropsWithChildren, useMemo } from "react";

export function Works() {
  const { t } = useTranslation(undefined, { keyPrefix: "Works" });
  const { updateCurrentSection } = useAppStore();
  const theme = usePrefersColorScheme();
  const navbar = useNavBarFunctions();
  const bgTitle = useBackgroundTitle();
  const iconColor = theme === "light" ? "#000" : "#fff";

  const data = useMemo(() => getData(iconColor, t), [iconColor, t]);

  return (
    <Section
      id={SectionType.WORKS}
      className="relative pb-[120px]"
      title={t("title")}
    >
      <InView
        amount="some"
        onEnter={() => {
          updateCurrentSection(SectionType.WORKS);
          navbar.setActive(SectionType.WORKS);
          navbar.trigger(false);
          bgTitle.changeText("Works");
        }}
      >
        <BentoGrid className="relative mx-0">
          {data.map((item, i) => (
            <BentoGridItem key={i} {...item} />
          ))}
        </BentoGrid>

        <div className="ml-5 mt-3">
          <span>{t("more_to_come")}</span>
        </div>
      </InView>
    </Section>
  );
}

const getData = (
  color: string,
  t: (key: string) => string
): BentoGridItemProps[] => {
  const iconProps = { className: "h-4 w-4", color };

  return [
    {
      // title: "Service Provider Management System",
      // description: `Built a web app for managing and onboarding service providers,
      // 	featuring authentication with AWS Cognito,
      // 	Key functionalities include application processes, profile management, email notifications, and reporting.`,
      title: t("project_a.title"),
      description: t("project_a.description"),
      image: "/images/works-simple-dashboard.jpg",
      imgAttribution: "Designed by Freepik",
      className: "md:col-span-1",
      icon: (
        <IconContainer>
          <Typescript {...iconProps} />
          <React {...iconProps} />
          <NextJs {...iconProps} />
          <NestJs {...iconProps} />
          <Mysql {...iconProps} />
          <Graphql {...iconProps} />
        </IconContainer>
      ),
    },
    {
      // title: "Typing Speed Test",
      // description: "A hobby app that tests your typing speed and accuracy. Built with html, css and jquery.",
      title: t("project_b.title"),
      description: t("project_b.description"),
      image: "/images/works-typing-speed-test.png",
      link: "https://typing-test.simplyapp.cc",
      className: "md:col-span-1",
      icon: (
        <IconContainer>
          <Javascript {...iconProps} />
          <Html {...iconProps} />
          <Css {...iconProps} />
          <Jquery {...iconProps} />
        </IconContainer>
      ),
    },
    {
      // title: "Coffee Ordering System",
      // description: `Built a comprehensive coffee ordering system with an intuitive admin dashboard and backend API for mobile app.
      // Key features include a point and voucher system to enhance customer loyalty.`,
      title: t("project_c.title"),
      description: t("project_c.description"),
      image: "/images/works-coffee-ordering.jpg",
      imgAttribution: "Designed by Freepik",
      className: "md:col-span-1",
      icon: (
        <IconContainer>
          <Typescript {...iconProps} />
          <React {...iconProps} />
          <NextJs {...iconProps} />
          <NestJs {...iconProps} />
          <Mysql {...iconProps} />
          <Graphql {...iconProps} />
          <Firebase {...iconProps} />
        </IconContainer>
      ),
    },
    {
      // title: "CRM System",
      // description: `Developed a simplified CRM system with an admin dashboard, tenant dashboard, and backend API server.
      // Key features include multi-tenant support with separate databases, ticket & sales system, email account integration,
      // PBX call system using 3CX, live chat between agents and embed live chat between agent and customer.`,
      title: t("project_d.title"),
      description: t("project_d.description"),
      image: "/images/works-crm.jpeg",
      className: "md:col-span-2",
      icon: (
        <IconContainer>
          <Javascript {...iconProps} />
          <React {...iconProps} />
          <Mysql {...iconProps} />
          <NodeJs {...iconProps} />
        </IconContainer>
      ),
    },
    {
      // title: "Customer Support Management System",
      // description: `
      // Developed a customer service and technician management platform to streamline operations and enhance service delivery.
      // Integrated with Yeastar PBX to manage calls and support tickets.
      // Mobile app for technicians to manage their work based on support tickets.
      // `,
      title: t("project_e.title"),
      description: t("project_e.description"),
      image: "/images/works-kanban.jpg",
      className: "md:col-span-1",
      icon: (
        <IconContainer>
          <Typescript {...iconProps} />
          <React {...iconProps} />
          <NextJs {...iconProps} />
          <NestJs {...iconProps} />
          <Mysql {...iconProps} />
          <Graphql {...iconProps} />
          <Firebase {...iconProps} />
        </IconContainer>
      ),
    },
    {
      // title: VSCode Extension
      title: t("project_f.title"),
      description: t("project_f.description"),
      image: "/images/vscode-singular-plural.png",
      className: "md:col-span-1",
      link: "https://marketplace.visualstudio.com/items?itemName=desmondhiew.singular-plural",
      icon: (
        <IconContainer>
          <VsCode {...iconProps} />
          <Typescript {...iconProps} />
        </IconContainer>
      ),
    },
  ];
};

const IconContainer: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="flex items-center gap-2">{children}</div>
);

export default Works;
