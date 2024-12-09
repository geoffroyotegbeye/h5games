<script setup lang="ts">
defineProps<{
  score: number
  lives: number
}>()
</script>

<template>
  <div class="flex justify-between items-center mb-4">
    <div class="text-xl font-semibold">Score: {{ score }}</div>
    <div class="text-xl font-semibold">Lives: {{ lives }}</div>
  </div>
</template>