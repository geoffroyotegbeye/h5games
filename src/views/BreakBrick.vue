<script setup lang="ts">
import { ref, computed } from 'vue'
import GameCanvas from '../components/breakBrick/GameCanvas.vue'
import Controls from '../components/breakBrick/Controls.vue'
import ScoreBoard from '../components/breakBrick/ScoreBoard.vue'
import { useBreakBrickGame } from '../composables/useBreakBrickGame'

const gameCanvasRef = ref<InstanceType<typeof GameCanvas> | null>(null)
const { gameState, startGame, pauseGame, movePaddle } = useBreakBrickGame(computed(() => gameCanvasRef.value?.canvas ?? null))
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-center text-purple-400 mb-8">Break Brick</h1>
    
    <div class="bg-gray-800 p-6 rounded-xl">
      <ScoreBoard
        :score="gameState.score"
        :lives="gameState.lives"
      />
      
      <GameCanvas ref="gameCanvasRef" />
      
      <Controls
        @move="movePaddle"
        @start="startGame"
        @pause="pauseGame"
      />
    </div>
    
    <div v-if="gameState.gameOver" class="mt-4 text-center text-red-500">
      {{ gameState.score === 0 ? 'Game Over!' : 'Congratulations! You won!' }}
      Press Start to play again.
    </div>
    
    <div class="mt-4 text-center text-gray-400">
      <p>Use left and right arrow keys to move the paddle</p>
      <p>Space to pause, Enter to start</p>
    </div>
  </div>
</template>