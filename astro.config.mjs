// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

const isProd = process.env.NODE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
    output: "static",
    base: isProd ? "/harbinger-2.0/" : "/",
    image: {
      domains: ['localhost', '://onrender.com', 'zacwalls.github.io/harbinger-2.0/'],
    },
    vite: {
      plugins: [tailwindcss()],
    },
});
