<script setup lang="ts">
defineProps<{
  score: number
  level: number
  lines: number
}>()
</script>

<template>
  <div class="bg-gray-800 p-4 rounded-lg space-y-2">
    <div class="flex justify-between">
      <span>Score:</span>
      <span>{{ score }}</span>
    </div>
    <div class="flex justify-between">
      <span>Level:</span>
      <span>{{ level }}</span>
    </div>
    <div class="flex justify-between">
      <span>Lines:</span>
      <span>{{ lines }}</span>
    </div>
  </div>
</template>