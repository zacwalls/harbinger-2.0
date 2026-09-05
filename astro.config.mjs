// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";


// https://astro.build/config
export default defineConfig({
    output: "static",
    image: {
      domains: ['localhost', '://onrender.com', 'zacwalls.github.io/harbinger-2.0/'],
    },
    vite: {
      plugins: [tailwindcss()],
    },
});
