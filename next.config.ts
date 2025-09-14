import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    images: {
        qualities: [25, 50, 75, 100],
    },
    turbopack: {
        rules: {
            "*.svg": {
                loaders: ["@svgr/webpack"],
                as: "*.js",
            },
        },
    },
    webpack: (config) => {
        // Add rule for SVG files
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack", "url-loader"],
        });

        return config;
    },
    reactStrictMode: true,
};

export default nextConfig;
