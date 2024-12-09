<script setup lang="ts">
import { marked } from 'marked'
import { computed } from 'vue'

const props = defineProps<{
  content: string
}>()

const htmlContent = computed(() => marked(props.content))
</script>

<template>
  <div 
    class="prose prose-invert max-w-none h-full p-4 bg-gray-800 rounded-lg overflow-auto"
    v-html="htmlContent"
  ></div>
</template>