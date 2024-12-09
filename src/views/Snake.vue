<script setup lang="ts">
import GameBoard from '../components/snake/GameBoard.vue'
import ScoreBoard from '../components/snake/ScoreBoard.vue'
import Controls from '../components/snake/Controls.vue'
import { useSnakeGame } from '../composables/useSnakeGame'

const { gameState, startGame, pauseGame, changeDirection } = useSnakeGame()
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold text-center text-purple-400 mb-8">Snake</h1>
    
    <div class="bg-gray-800 p-6 rounded-xl">
      <ScoreBoard
        :score="gameState.score"
        :high-score="gameState.highScore"
      />
      
      <GameBoard
        :snake="gameState.snake"
        :food="gameState.food"
      />
      
      <Controls
        @direction="changeDirection"
        @start="startGame"
        @pause="pauseGame"
      />
      
      <div v-if="gameState.gameOver" class="mt-4 text-center text-red-500">
        Game Over! Press Start to play again.
      </div>
    </div>
    
    <div class="mt-4 text-center text-gray-400">
      <p>Use arrow keys to control the snake</p>
      <p>Space to pause, Enter to start</p>
    </div>
  </div>
</template>