<script setup lang="ts">
import { computed } from 'vue'
import { BOARD_SIZE } from '../../constants/snake'
import type { Position } from '../../types/snake'

const props = defineProps<{
  snake: Position[]
  food: Position
}>()

const board = computed(() => {
  const grid = Array(BOARD_SIZE).fill(null).map(() => 
    Array(BOARD_SIZE).fill('empty')
  )
  
  // Place snake
  props.snake.forEach((pos, index) => {
    grid[pos.y][pos.x] = index === 0 ? 'head' : 'body'
  })
  
  // Place food
  grid[props.food.y][props.food.x] = 'food'
  
  return grid
})
</script>

<template>
  <div class="grid gap-1" :style="`grid-template-columns: repeat(${BOARD_SIZE}, minmax(0, 1fr))`">
    <template v-for="(row, y) in board" :key="y">
      <div
        v-for="(cell, x) in row"
        :key="`${x}-${y}`"
        class="w-6 h-6 rounded-sm"
        :class="{
          'bg-purple-500': cell === 'head',
          'bg-purple-400': cell === 'body',
          'bg-red-500': cell === 'food',
          'bg-gray-700': cell === 'empty'
        }"
      ></div>
    </template>
  </div>
</template>