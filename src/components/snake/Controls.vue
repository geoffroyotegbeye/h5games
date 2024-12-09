<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const emit = defineEmits<{
  (e: 'direction', direction: 'up' | 'down' | 'left' | 'right'): void
  (e: 'start'): void
  (e: 'pause'): void
}>()

const handleKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowUp':
      emit('direction', 'up')
      break
    case 'ArrowDown':
      emit('direction', 'down')
      break
    case 'ArrowLeft':
      emit('direction', 'left')
      break
    case 'ArrowRight':
      emit('direction', 'right')
      break
    case ' ':
      event.preventDefault()
      emit('pause')
      break
    case 'Enter':
      emit('start')
      break
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="flex justify-center gap-4 mt-4">
    <button
      @click="$emit('start')"
      class="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg transition-colors"
    >
      Start
    </button>
    <button
      @click="$emit('pause')"
      class="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 rounded-lg transition-colors"
    >
      Pause
    </button>
  </div>
</template>