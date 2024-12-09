<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="h-full">
    <textarea
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      class="w-full h-full p-4 bg-gray-800 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
      placeholder="Écrivez votre markdown ici..."
    ></textarea>
  </div>
</template>