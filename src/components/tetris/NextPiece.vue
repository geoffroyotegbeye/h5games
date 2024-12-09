<script setup lang="ts">
import { TETROMINOS } from '../../constants/tetris'
import type { TetrominoType } from '../../types/tetris'

defineProps<{
  piece: TetrominoType
}>()
</script>

<template>
  <div class="bg-gray-800 p-4 rounded-lg">
    <h3 class="text-lg font-semibold mb-2">Next Piece</h3>
    <div class="grid gap-px bg-gray-700 p-px" :style="`grid-template-columns: repeat(${TETROMINOS[piece].shape[0].length}, minmax(0, 1fr))`">
      <template v-for="(row, y) in TETROMINOS[piece].shape" :key="y">
        <div
          v-for="(cell, x) in row"
          :key="`${x}-${y}`"
          class="w-4 h-4"
          :class="cell ? TETROMINOS[piece].color : 'bg-gray-900'"
        ></div>
      </template>
    </div>
  </div>
</template>