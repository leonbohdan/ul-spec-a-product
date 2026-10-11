<script setup lang="ts">
// Internal Dashboard placeholder view
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
            Internal Staff Only
          </span>
        </div>
        <h1 class="serif-title text-3xl sm:text-4xl font-normal tracking-tight text-stone-950 dark:text-stone-50">
          Feedback Management <span class="italic text-[#1b6b45] dark:text-[#34d399]">Console</span>
        </h1>
        <p class="text-stone-600 dark:text-stone-400 text-sm mt-1">
          Review submissions, manage lifecycle statuses, record internal notes, and triage community feedback.
        </p>
      </div>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs font-medium text-stone-700 dark:text-stone-300 shadow-2xs"
        >
          Export CSV
        </button>
      </div>
    </div>

    <!-- Triage Filter Bar Placeholder -->
    <div class="p-4 rounded-xl bg-white/70 dark:bg-[#1a1a1a] border border-stone-200/80 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4 text-xs">
      <div class="flex items-center gap-2 text-stone-500 dark:text-stone-400">
        <span class="font-medium">Filter by Status:</span>
        <span class="px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">All (5)</span>
        <span class="px-2 py-1 rounded text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer">Under Review</span>
        <span class="px-2 py-1 rounded text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer">Planned</span>
        <span class="px-2 py-1 rounded text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer">In Progress</span>
      </div>
      <div class="flex items-center gap-2 text-stone-500 dark:text-stone-400">
        <span>Sort:</span>
        <span class="font-semibold text-stone-900 dark:text-stone-100">Most Votes</span>
      </div>
    </div>
  </div>
</template>
