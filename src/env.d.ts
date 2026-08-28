/// <reference types="astro/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module "*.po" {
	export const messages: import("@lingui/core").Messages;
}
