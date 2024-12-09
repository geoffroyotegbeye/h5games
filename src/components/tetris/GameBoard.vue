<script setup lang="ts">
import { TETROMINOS } from '../../constants/tetris'
import type { GameState } from '../../types/tetris'

defineProps<{
  gameState: GameState
}>()
</script>

<template>
  <div class="grid grid-cols-10 gap-px bg-gray-700 p-px">
    <template v-for="(row, y) in gameState.board" :key="y">
      <div
        v-for="(cell, x) in row"
        :key="`${x}-${y}`"
        class="w-6 h-6"
        :class="[
          cell ? TETROMINOS[cell].color : 'bg-gray-900',
          gameState.currentPiece?.shape[y - gameState.currentPiece.position.y]?.[x - gameState.currentPiece.position.x] &&
          y >= gameState.currentPiece.position.y &&
          x >= gameState.currentPiece.position.x &&
          y < gameState.currentPiece.position.y + gameState.currentPiece.shape.length &&
          x < gameState.currentPiece.position.x + gameState.currentPiece.shape[0].length
            ? TETROMINOS[gameState.currentPiece.type].color
            : ''
        ]"
      ></div>
    </template>
  </div>
</template>