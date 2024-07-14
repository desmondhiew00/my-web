import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			use: [{ loader: "@svgr/webpack", options: { icon: true } }],
		});

		config.resolve.fallback = {
			...config.resolve.fallback,
			fs: false,
		};
		return config;
	},
};

export default withNextIntl(nextConfig);
