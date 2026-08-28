import { defineConfig } from "@lingui/cli";

export default defineConfig({
	sourceLocale: "en",
	locales: ["en", "ja", "zh-CN"],
	catalogs: [
		{
			path: "<rootDir>/src/locales/{locale}/messages",
			include: ["<rootDir>/src"],
		},
	],
});
