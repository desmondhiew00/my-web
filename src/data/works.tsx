import { type BentoGridItemProps, SkeletonImage } from "@/components/ui/bento-grid";

import Css from "@/assets/tech-stacks/css3.svg";
import Firebase from "@/assets/tech-stacks/firebase.svg";
import Graphql from "@/assets/tech-stacks/graphql.svg";
import Html from "@/assets/tech-stacks/html5.svg";
import Jquery from "@/assets/tech-stacks/jquery.svg";
import Javascript from "@/assets/tech-stacks/js.svg";
import Mysql from "@/assets/tech-stacks/mysql.svg";
import NestJs from "@/assets/tech-stacks/nestjs.svg";
import NextJs from "@/assets/tech-stacks/nextjs.svg";
import NodeJs from "@/assets/tech-stacks/nodejs.svg";
import React from "@/assets/tech-stacks/reactjs.svg";
import Typescript from "@/assets/tech-stacks/typescript.svg";
import type { PropsWithChildren } from "react";

const IconContainer: React.FC<PropsWithChildren> = ({ children }) => (
	<div className="flex items-center gap-1">{children}</div>
);

const getData = (color: string): BentoGridItemProps[] => {
	const iconProps = { className: "h-4 w-4", color };

	return [
		{
			title: "Service Provider Management System",
			description: `Built a web app for managing and onboarding service providers, 
				featuring authentication with AWS Cognito, 
				Key functionalities include application processes, profile management, email notifications, and reporting.`,
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
			title: "Typing Speed Test",
			description: "A hobby app that tests your typing speed and accuracy. Built with html, css and jquery.",
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
			title: "Coffee Ordering System",
			description: `Built a comprehensive coffee ordering system with an intuitive admin dashboard and backend API for mobile app.
			Key features include a point and voucher system to enhance customer loyalty.`,
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
			title: "CRM System",
			description: `Developed a simplified CRM system with an admin dashboard, tenant dashboard, and backend API server.
			Key features include multi-tenant support with separate databases, ticket & sales system, email account integration,
			PBX call system using 3CX, live chat between agents and embed live chat between agent and customer.`,
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
			title: "Customer Support Management System",
			description: `
			Developed a customer service and technician management platform to streamline operations and enhance service delivery.
			Integrated with Yeastar PBX to manage calls and support tickets.
			Mobile app for technicians to manage their work based on support tickets.
			`,
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
	];
};

export default getData;
