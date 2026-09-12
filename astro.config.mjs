// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

const isStaging = process.env.NODE_ENV === 'staging';

// https://astro.build/config
export default defineConfig({
    output: "static",
    site: isStaging ? "https://zacwalls.github.io/" : "https://harbingermma.com",
    base: isStaging ? "/harbinger-2.0" : "/",
    image: {
      domains: ['localhost', '://onrender.com'],
    },
    vite: {
      plugins: [tailwindcss()],
    },
});
