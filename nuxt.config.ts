// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxtjs/device",
    // '@nuxtjs/supabase',
    "@nuxt/icon",
    "@vueuse/nuxt",
  ],
  // supabase: {
  //   redirect: false,
  // },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
});
