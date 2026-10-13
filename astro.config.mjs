// @ts-check
import { defineConfig } from "astro/config"
import tailwindcss from "@tailwindcss/vite"
import preact from "@astrojs/preact"
import netlify from "@astrojs/netlify"
import sitemap from "@astrojs/sitemap"

const isStaging = process.env.NODE_ENV === "staging"

// Vagaro waiver pages: kept so old links still work, but not linked or listed in the sitemap
const unlistedPages = [
    "liability-waiver",
    "minor-liability-waiver",
    "minor-competition-release-waiver",
]

// https://astro.build/config
export default defineConfig({
    output: "static",
    site: isStaging
        ? "https://harbingermma.netlify.app/"
        : "https://harbingermma.com",
    base: isStaging ? "/harbinger-2.0/" : "/",
    trailingSlash: "always",
    redirects: {
        "/home": "/",
    },

    image: {
        domains: ["localhost", "://onrender.com"],
    },

    vite: {
        plugins: [tailwindcss()],
    },

    integrations: [
        preact(),
        sitemap({
            filter: (page) => !unlistedPages.some((slug) => page.endsWith(`/${slug}/`)),
        }),
    ],
    adapter: netlify({
        imageCDN: false,
    }),
})
