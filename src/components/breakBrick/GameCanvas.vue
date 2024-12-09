<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../../constants/breakBrick'

const canvas = ref<HTMLCanvasElement | null>(null)

defineExpose({ canvas })
</script>

<template>
  <canvas
    ref="canvas"
    :width="CANVAS_WIDTH"
    :height="CANVAS_HEIGHT"
    class="bg-gray-900 rounded-lg"
  ></canvas>
</template>