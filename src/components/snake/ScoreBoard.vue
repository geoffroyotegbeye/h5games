<script setup lang="ts">
defineProps<{
  score: number
  highScore: number
}>()
</script>

<template>
  <div class="flex justify-between items-center mb-4 px-4">
    <div class="text-lg">Score: {{ score }}</div>
    <div class="text-lg">High Score: {{ highScore }}</div>
  </div>
</template>