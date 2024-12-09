<script setup lang="ts">
import { RouterLink } from 'vue-router'

const games = [
  { name: 'Accueil', path: '/' },
  { name: 'Markdown Previewer', path: '/markdown' },
  { name: 'Calculatrice', path: '/calculator' },
  { name: 'Snake', path: '/snake' },
  { name: 'Tetris', path: '/tetris' },
  { name: 'Break Brick', path: '/breakbrick' }
]
</script>

<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-purple-400">h5games</h1>
        <div class="flex space-x-4">
          <RouterLink
            v-for="game in games"
            :key="game.path"
            :to="game.path"
            class="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
            active-class="bg-gray-700"
          >
            {{ game.name }}
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>