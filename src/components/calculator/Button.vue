<script setup lang="ts">
defineProps<{
  value: string
  variant?: 'default' | 'operator' | 'action'
}>()
</script>

<template>
  <button
    class="h-16 text-xl font-semibold rounded-lg transition-colors"
    :class="{
      'bg-gray-700 hover:bg-gray-600': variant === 'default',
      'bg-purple-600 hover:bg-purple-500': variant === 'operator',
      'bg-orange-600 hover:bg-orange-500': variant === 'action'
    }"
    @click="$emit('click')"
  >
    {{ value }}
  </button>
</template>