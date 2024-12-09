<script setup lang="ts">
import { RouterLink } from 'vue-router'

const games = [
  {
    name: 'Markdown Previewer',
    path: '/markdown',
    description: 'Éditeur Markdown en temps réel'
  },
  {
    name: 'Calculatrice',
    path: '/calculator',
    description: 'Calculatrice interactive'
  },
  {
    name: 'Snake',
    path: '/snake',
    description: 'Le jeu du serpent classique'
  },
  {
    name: 'Tetris',
    path: '/tetris',
    description: 'Le célèbre jeu de blocs'
  },
  {
    name: 'Break Brick',
    path: '/breakbrick',
    description: 'Casse-briques arcade'
  }
]
</script>

<template>
  <div class="text-center">
    <h1 class="text-5xl font-bold mb-8 text-purple-400">Arcade Multijeux</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <RouterLink
        v-for="game in games"
        :key="game.path"
        :to="game.path"
        class="block p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
      >
        <h2 class="text-2xl font-bold mb-2">{{ game.name }}</h2>
        <p class="text-gray-400">{{ game.description }}</p>
      </RouterLink>
    </div>
  </div>
</template>