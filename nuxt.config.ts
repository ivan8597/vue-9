import { defineNuxtConfig } from "nuxt/config";
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import ViteVueInspector from "vite-plugin-vue-inspector"; // Импортируйте плагин

export default defineNuxtConfig({
  ssr: false,

  app: {
    head: {
      title: "My Nuxt App",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
  css: ["@/src/assets/main.css"],
  modules: ["@pinia/nuxt"],

  vite: {
    plugins: [
      // vue(),
      // vueJsx(),
      // ViteVueInspector()
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./", import.meta.url)),
      },
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  compatibilityDate: "2025-01-20",
});
