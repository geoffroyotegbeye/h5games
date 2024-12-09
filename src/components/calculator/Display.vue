<script setup lang="ts">
defineProps<{
  value: string
}>()
</script>

<template>
  <div class="bg-gray-800 p-4 rounded-lg mb-4">
    <div class="text-right text-3xl font-mono truncate">{{ value || '0' }}</div>
  </div>
</template>