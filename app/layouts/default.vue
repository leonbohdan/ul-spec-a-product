<script setup lang="ts">
import { ref, computed } from 'vue'

const route = useRoute()
const colorMode = useColorMode()

// Mobile navigation menu toggle state
const isMobileMenuOpen = ref(false)

// Placeholder submission modal state
const isSubmitModalOpen = ref(false)

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

function openSubmitModal() {
  isSubmitModalOpen.value = true
}

function closeSubmitModal() {
  isSubmitModalOpen.value = false
}

const navLinks = [
  { name: 'Board', path: '/', badge: null },
  { name: 'Roadmap', path: '/roadmap', badge: null },
  { name: 'Internal Dashboard', path: '/admin', badge: 'Staff' }
]

function isLinkActive(linkPath: string) {
  if (linkPath === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(linkPath)
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#fbf9f4] dark:bg-[#121212] text-stone-900 dark:text-stone-100 transition-colors duration-200 antialiased font-sans">
    <!-- Header & Navigation Bar -->
    <header class="bg-[#111111] dark:bg-[#0a0a0a] border-b border-stone-800 text-white sticky top-0 z-30 shadow-xs">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        
        <!-- Left: Logo & Primary Desktop Navigation -->
        <div class="flex items-center space-x-6 sm:space-x-8">
          <!-- Text-Based Typographic Logo -->
          <NuxtLink to="/" class="flex items-center space-x-1.5 text-lg group focus:outline-none">
            <span class="font-bold tracking-tight text-white group-hover:text-stone-200 transition">acme</span>
            <span class="text-stone-500 font-light px-0.5">/</span>
            <span class="serif-title italic text-emerald-400 group-hover:text-emerald-300 font-normal text-xl transition">ideas</span>
          </NuxtLink>

          <!-- Desktop Navigation Menu Links -->
          <nav class="hidden md:flex items-center space-x-1" aria-label="Main Navigation">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.path"
              :to="link.path"
              :class="[
                'px-3 py-1.5 rounded-lg text-sm transition flex items-center gap-1.5 font-medium',
                isLinkActive(link.path)
                  ? 'bg-stone-800 text-white shadow-xs'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
              ]"
            >
              <span>{{ link.name }}</span>
              <span
                v-if="link.badge"
                class="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/80"
              >
                {{ link.badge }}
              </span>
            </NuxtLink>
          </nav>
        </div>

        <!-- Right: Utility Actions (Theme Toggle, + Submit an Idea, Sign-in Placeholder) -->
        <div class="flex items-center space-x-2 sm:space-x-3">
          
          <!-- Theme Toggle (Sun / Moon) -->
          <button
            type="button"
            @click="toggleTheme"
            aria-label="Toggle color theme"
            title="Toggle theme (Light / Dark)"
            class="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800/80 transition focus:outline-none focus:ring-2 focus:ring-stone-600 cursor-pointer"
          >
            <!-- Sun Icon (shown in dark mode) -->
            <svg class="w-4 h-4 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <!-- Moon Icon (shown in light mode) -->
            <svg class="w-4 h-4 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.03 9.03 0 008.354-5.646z" />
            </svg>
          </button>

          <!-- Profile / Sign-in Placeholder -->
          <div class="relative">
            <button
              type="button"
              class="flex items-center space-x-2 px-2.5 py-1.5 rounded-lg border border-stone-800 bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white transition text-xs font-medium focus:outline-none focus:ring-2 focus:ring-stone-700 cursor-pointer"
              title="Sign in placeholder"
            >
              <div class="w-5 h-5 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 border border-stone-700">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span class="hidden sm:inline">Sign in</span>
            </button>
          </div>

          <!-- New Suggestion Button (+ Submit an Idea) -->
          <button
            type="button"
            @click="openSubmitModal"
            class="bg-[#1b6b45] hover:bg-[#165637] text-white font-semibold text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition shadow-xs hover:shadow flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 cursor-pointer active:scale-95"
          >
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
            </svg>
            <span class="whitespace-nowrap">Submit an Idea</span>
          </button>

          <!-- Mobile Hamburger Menu Button -->
          <button
            type="button"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800/80 transition focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                v-if="!isMobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

        </div>

      </div>

      <!-- Mobile Dropdown Navigation Menu -->
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden border-t border-stone-800 bg-[#111111] px-4 pt-2 pb-4 space-y-1 shadow-lg"
      >
        <NuxtLink
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          @click="isMobileMenuOpen = false"
          :class="[
            'block px-3 py-2 rounded-lg text-sm transition flex items-center justify-between font-medium',
            isLinkActive(link.path)
              ? 'bg-stone-800 text-white font-semibold'
              : 'text-stone-300 hover:text-white hover:bg-stone-800/50'
          ]"
        >
          <span>{{ link.name }}</span>
          <span
            v-if="link.badge"
            class="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/80"
          >
            {{ link.badge }}
          </span>
        </NuxtLink>
      </div>
    </header>

    <!-- Main Content Slot Area -->
    <main class="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="border-t border-stone-200/80 dark:border-stone-800/80 bg-stone-100/50 dark:bg-[#0c0c0c] transition-colors duration-200 mt-auto">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <!-- Logo & Copyright -->
          <div class="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
            <div class="flex items-center space-x-1 text-base">
              <span class="font-bold tracking-tight text-stone-900 dark:text-white">acme</span>
              <span class="text-stone-400 dark:text-stone-600 font-light px-0.5">/</span>
              <span class="serif-title italic text-emerald-700 dark:text-emerald-400 font-normal">ideas</span>
            </div>
            <span class="hidden sm:inline text-stone-300 dark:text-stone-700">•</span>
            <span class="text-xs text-stone-500 dark:text-stone-400 font-normal">
              © 2026 Acme, Inc. All rights reserved.
            </span>
          </div>

          <!-- Status Badge with Pulsing Live Indicator -->
          <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-300 shadow-2xs">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span class="font-medium">All systems operational</span>
          </div>

          <!-- Secondary Links -->
          <div class="flex items-center space-x-4 text-xs text-stone-500 dark:text-stone-400">
            <NuxtLink to="/roadmap" class="hover:text-stone-900 dark:hover:text-white transition">Roadmap</NuxtLink>
            <NuxtLink to="/admin" class="hover:text-stone-900 dark:hover:text-white transition">Staff Portal</NuxtLink>
            <span class="text-stone-300 dark:text-stone-700">•</span>
            <span class="text-stone-400 dark:text-stone-500">Privacy First</span>
          </div>

        </div>

        <!-- Privacy & Notification Note -->
        <div class="mt-6 pt-6 border-t border-stone-200/60 dark:border-stone-800/60 text-center text-xs text-stone-500 dark:text-stone-400">
          Built with customer transparency in mind. Your verified identity is kept strictly private. Automated progress notifications with 1-click unsubscribe.
        </div>

      </div>
    </footer>

    <!-- Submit Idea Design Placeholder Modal -->
    <div
      v-if="isSubmitModalOpen"
      class="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity"
      @click.self="closeSubmitModal"
    >
      <div class="bg-[#fbf9f4] dark:bg-[#1a1a1a] rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-2xl relative">
        <button
          type="button"
          @click="closeSubmitModal"
          class="absolute top-5 right-5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition focus:outline-none"
          aria-label="Close modal"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div>
          <h3 class="serif-title text-2xl font-normal text-stone-950 dark:text-white">Submit a Product Idea</h3>
          <p class="text-sm text-stone-600 dark:text-stone-400 mt-1 font-normal">
            Tell us what you'd like to see next. 1-click social sign-in — zero passwords.
          </p>

          <form @submit.prevent="closeSubmitModal" class="mt-6 space-y-4">
            <div>
              <label class="block text-xs font-mono font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">
                Title
              </label>
              <input
                type="text"
                placeholder="Short, descriptive title"
                class="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:ring-2 focus:ring-[#1b6b45] focus:outline-none text-sm transition"
              />
            </div>

            <div>
              <label class="block text-xs font-mono font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">
                Description
              </label>
              <textarea
                rows="3"
                placeholder="Explain what problem this solves for you..."
                class="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:ring-2 focus:ring-[#1b6b45] focus:outline-none text-sm transition"
              ></textarea>
            </div>

            <div class="space-y-2">
              <label class="block text-xs font-mono font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Verify Identity to Submit
              </label>
              <div class="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  class="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 transition text-sm font-medium text-stone-800 dark:text-stone-200 shadow-2xs"
                >
                  <svg class="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  class="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 transition text-sm font-medium text-stone-800 dark:text-stone-200 shadow-2xs"
                >
                  <svg class="w-4 h-4 fill-current text-stone-900 dark:text-white" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                  <span>GitHub</span>
                </button>
              </div>
              <p class="text-xs text-amber-700 dark:text-amber-400 flex items-center gap-1.5 pt-0.5">
                <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                Sign in with Google or GitHub to enable submitting ideas (Design placeholder).
              </p>
            </div>

            <p class="text-xs text-stone-500 dark:text-stone-400">
              1-click Social Auth guarantees verified real identities with zero spam. Your email is kept strictly private.
            </p>

            <div class="pt-2 flex justify-end space-x-3 items-center">
              <button
                type="button"
                @click="closeSubmitModal"
                class="px-4 py-2 rounded-lg text-sm font-medium text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#1b6b45] hover:bg-[#165637] text-white transition shadow-sm cursor-pointer"
              >
                Submit Idea
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>
