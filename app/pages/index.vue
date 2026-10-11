<script setup lang="ts">
import { ref } from 'vue'

interface IdeaItem {
  id: number
  title: string
  description: string
  votes: number
  hasVoted: boolean
  status: 'PLANNED' | 'IN PROGRESS' | 'UNDER REVIEW' | 'COMPLETED' | 'DECLINED'
  statusClasses: string
}

const ideas = ref<IdeaItem[]>([
  {
    id: 1,
    title: 'Dark mode support',
    description: 'A dark colour theme across the whole app — much easier on the eyes during evening triage sessions.',
    votes: 42,
    hasVoted: false,
    status: 'PLANNED',
    statusClasses: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200/70 dark:border-emerald-800/70'
  },
  {
    id: 2,
    title: 'Bulk export to CSV',
    description: 'Export any filtered data set to CSV for use in external reporting and internal finance spreadsheets.',
    votes: 35,
    hasVoted: false,
    status: 'IN PROGRESS',
    statusClasses: 'text-blue-700 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400 border-blue-200/70 dark:border-blue-800/70'
  },
  {
    id: 3,
    title: 'Search across tags and custom fields',
    description: 'Current search only covers titles. Including tags and metadata would make finding specific feedback instantaneous.',
    votes: 28,
    hasVoted: false,
    status: 'UNDER REVIEW',
    statusClasses: 'text-amber-800 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200/70 dark:border-amber-800/70'
  },
  {
    id: 4,
    title: 'Two-factor authentication',
    description: 'Optional 2FA via authenticator app or SMS to strengthen account security for company workspace.',
    votes: 20,
    hasVoted: false,
    status: 'COMPLETED',
    statusClasses: 'text-stone-600 bg-stone-100 dark:bg-stone-800/80 dark:text-stone-300 border-stone-200 dark:border-stone-700'
  },
  {
    id: 5,
    title: 'Native iOS and Android app',
    description: 'A dedicated mobile application for easier use on the go rather than relying on mobile browser tabs.',
    votes: 15,
    hasVoted: false,
    status: 'DECLINED',
    statusClasses: 'text-rose-700 bg-rose-50 dark:bg-rose-950/60 dark:text-rose-400 border-rose-200/70 dark:border-rose-800/70'
  }
])

function toggleVote(idea: IdeaItem) {
  if (idea.hasVoted) {
    idea.hasVoted = false
    idea.votes--
  } else {
    idea.hasVoted = true
    idea.votes++
  }
}
</script>

<template>
  <div class="space-y-12">
    <!-- Hero Section -->
    <div>
      <h1 class="serif-title text-4xl sm:text-6xl font-normal tracking-tight text-stone-950 dark:text-stone-50 leading-[1.1]">
        What should we<br />
        <span class="italic text-[#1b6b45] dark:text-[#34d399]">build next?</span>
      </h1>
      <p class="text-stone-600 dark:text-stone-400 text-base sm:text-lg mt-5 max-w-2xl font-normal leading-relaxed">
        Share your ideas, vote on what matters most, and track what we're working on. 1-click verification with Google or GitHub — no passwords.
      </p>

      <!-- Counter divider -->
      <div class="mt-12 flex items-center">
        <span class="text-xs font-mono font-medium tracking-widest text-stone-400 dark:text-stone-500 uppercase">
          — {{ ideas.length }} IDEAS (100 / PAGE • SCROLL TO LOAD) —
        </span>
      </div>
      <div class="w-full h-px bg-stone-200/80 dark:bg-stone-800 mt-3"></div>
    </div>

    <!-- Ideas List Feed -->
    <div class="space-y-3">
      <div
        v-for="idea in ideas"
        :key="idea.id"
        class="group bg-white/80 dark:bg-[#1a1a1a] rounded-xl p-4 sm:p-5 border border-stone-200/80 dark:border-stone-800 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-stone-300 dark:hover:border-stone-700 hover:shadow-md transition flex items-center justify-between gap-4 cursor-pointer"
      >
        <div class="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
          <!-- Upvote Widget -->
          <button
            type="button"
            @click.stop="toggleVote(idea)"
            :class="[
              'flex flex-col items-center justify-center w-12 h-14 rounded-lg border transition flex-shrink-0 cursor-pointer',
              idea.hasVoted
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                : 'border-stone-200 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-900/60 hover:bg-emerald-50/60 hover:border-emerald-300 dark:hover:bg-emerald-950/30 text-stone-700 dark:text-stone-300'
            ]"
            :title="idea.hasVoted ? 'Click to remove vote' : 'Click to upvote'"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7" />
            </svg>
            <span class="font-bold text-sm mt-0.5">{{ idea.votes }}</span>
          </button>

          <!-- Text Details -->
          <div class="min-w-0 flex-1">
            <h2 class="text-base font-semibold text-stone-900 dark:text-stone-100 truncate group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
              {{ idea.title }}
            </h2>
            <p class="text-sm text-stone-500 dark:text-stone-400 mt-0.5 truncate">
              {{ idea.description }}
            </p>
          </div>
        </div>

        <!-- Status Badge & Chevron -->
        <div class="flex items-center space-x-3 flex-shrink-0">
          <span
            :class="[
              'text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full border',
              idea.statusClasses
            ]"
          >
            {{ idea.status }}
          </span>
          <svg class="w-4 h-4 text-stone-300 dark:text-stone-600 group-hover:text-stone-400 dark:group-hover:text-stone-300 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Batch End Notice -->
    <div class="pt-6 pb-2 text-center">
      <div class="text-stone-400 dark:text-stone-600 text-xs font-mono tracking-widest uppercase">
        — 100 IDEAS / BATCH • SCROLL TO LOAD MORE —
      </div>
    </div>
  </div>
</template>
