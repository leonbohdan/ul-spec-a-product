<script setup lang="ts">
// Roadmap placeholder view
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="serif-title text-4xl sm:text-5xl font-normal tracking-tight text-stone-950 dark:text-stone-50">
        Product <span class="italic text-[#1b6b45] dark:text-[#34d399]">Roadmap</span>
      </h1>
      <p class="text-stone-600 dark:text-stone-400 text-base mt-3 max-w-2xl leading-relaxed">
        Explore what we are currently planning, building, and delivering based on verified customer feedback.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
      <!-- Column 1: Planned -->
      <div class="bg-white/70 dark:bg-[#1a1a1a] rounded-xl p-5 border border-stone-200/80 dark:border-stone-800 space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-stone-200/70 dark:border-stone-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <h3 class="font-semibold text-sm uppercase tracking-wider text-stone-800 dark:text-stone-200">Planned</h3>
          </div>
          <span class="text-xs font-mono text-stone-400">1</span>
        </div>
        <div class="p-3.5 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 space-y-1">
          <div class="text-sm font-semibold text-stone-900 dark:text-stone-100">Dark mode support</div>
          <p class="text-xs text-stone-500 dark:text-stone-400">42 votes • High priority</p>
        </div>
      </div>

      <!-- Column 2: In Progress -->
      <div class="bg-white/70 dark:bg-[#1a1a1a] rounded-xl p-5 border border-stone-200/80 dark:border-stone-800 space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-stone-200/70 dark:border-stone-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <h3 class="font-semibold text-sm uppercase tracking-wider text-stone-800 dark:text-stone-200">In Progress</h3>
          </div>
          <span class="text-xs font-mono text-stone-400">1</span>
        </div>
        <div class="p-3.5 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 space-y-1">
          <div class="text-sm font-semibold text-stone-900 dark:text-stone-100">Bulk export to CSV</div>
          <p class="text-xs text-stone-500 dark:text-stone-400">35 votes • Active development</p>
        </div>
      </div>

      <!-- Column 3: Completed -->
      <div class="bg-white/70 dark:bg-[#1a1a1a] rounded-xl p-5 border border-stone-200/80 dark:border-stone-800 space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-stone-200/70 dark:border-stone-800">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-stone-500"></span>
            <h3 class="font-semibold text-sm uppercase tracking-wider text-stone-800 dark:text-stone-200">Completed</h3>
          </div>
          <span class="text-xs font-mono text-stone-400">1</span>
        </div>
        <div class="p-3.5 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 space-y-1">
          <div class="text-sm font-semibold text-stone-900 dark:text-stone-100">Two-factor authentication</div>
          <p class="text-xs text-stone-500 dark:text-stone-400">20 votes • Shipped</p>
        </div>
      </div>
    </div>
  </div>
</template>
