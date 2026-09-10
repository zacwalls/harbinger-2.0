// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

const isProd = process.env.NODE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
    output: "static",
    site: isProd ? "https://harbingermma.com" : "https://zacwalls.github.io/",
    base: isProd ? "/" : "/harbinger-2.0",
    image: {
      domains: ['localhost', '://onrender.com'],
    },
    vite: {
      plugins: [tailwindcss()],
    },
});
