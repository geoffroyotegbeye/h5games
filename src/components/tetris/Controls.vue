<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const emit = defineEmits<{
  (e: 'move', direction: number): void
  (e: 'rotate'): void
  (e: 'drop'): void
  (e: 'start'): void
  (e: 'pause'): void
}>()

const handleKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowLeft':
      emit('move', -1)
      break
    case 'ArrowRight':
      emit('move', 1)
      break
    case 'ArrowDown':
      emit('drop')
      break
    case 'ArrowUp':
      emit('rotate')
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