<script setup lang="ts">
import GameBoard from '../components/tetris/GameBoard.vue'
import NextPiece from '../components/tetris/NextPiece.vue'
import ScoreBoard from '../components/tetris/ScoreBoard.vue'
import Controls from '../components/tetris/Controls.vue'
import { useTetrisGame } from '../composables/useTetrisGame'

const { gameState, startGame, pauseGame, moveDown, moveHorizontal, rotate } = useTetrisGame()
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-center text-purple-400 mb-8">Tetris</h1>
    
    <div class="flex gap-8">
      <div class="bg-gray-800 p-6 rounded-xl">
        <GameBoard :game-state="gameState" />
        
        <Controls
          @move="moveHorizontal"
          @rotate="rotate"
          @drop="moveDown"
          @start="startGame"
          @pause="pauseGame"
        />
      </div>
      
      <div class="space-y-4">
        <NextPiece :piece="gameState.nextPiece" />
        <ScoreBoard
          :score="gameState.score"
          :level="gameState.level"
          :lines="gameState.lines"
        />
      </div>
    </div>
    
    <div v-if="gameState.gameOver" class="mt-4 text-center text-red-500">
      Game Over! Press Start to play again.
    </div>
    
    <div class="mt-4 text-center text-gray-400">
      <p>Use arrow keys to move and rotate</p>
      <p>Space to pause, Enter to start</p>
    </div>
  </div>
</template>