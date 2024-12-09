import { ref, computed } from 'vue'
import { BOARD_SIZE, INITIAL_SNAKE_LENGTH, GAME_SPEED, DIRECTIONS } from '../constants/snake'
import type { Position, Direction, GameState } from '../types/snake'

export function useSnakeGame() {
  const gameState = ref<GameState>({
    snake: [],
    food: { x: 0, y: 0 },
    direction: 'right',
    score: 0,
    highScore: 0,
    isRunning: false,
    gameOver: false
  })

  let gameInterval: number | null = null

  const initializeSnake = () => {
    const centerY = Math.floor(BOARD_SIZE / 2)
    const startX = Math.floor(BOARD_SIZE / 4)
    
    gameState.value.snake = Array(INITIAL_SNAKE_LENGTH)
      .fill(null)
      .map((_, i) => ({
        x: startX - i,
        y: centerY
      }))
  }

  const generateFood = () => {
    const snake = gameState.value.snake
    let position: Position
    
    do {
      position = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE)
      }
    } while (snake.some(segment => segment.x === position.x && segment.y === position.y))
    
    gameState.value.food = position
  }

  const move = () => {
    const snake = [...gameState.value.snake]
    const head = snake[0]
    const direction = DIRECTIONS[gameState.value.direction]
    
    const newHead = {
      x: (head.x + direction.x + BOARD_SIZE) % BOARD_SIZE,
      y: (head.y + direction.y + BOARD_SIZE) % BOARD_SIZE
    }
    
    // Check collision with self
    if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
      endGame()
      return
    }
    
    snake.unshift(newHead)
    
    // Check if food is eaten
    if (newHead.x === gameState.value.food.x && newHead.y === gameState.value.food.y) {
      gameState.value.score += 10
      generateFood()
    } else {
      snake.pop()
    }
    
    gameState.value.snake = snake
  }

  const startGame = () => {
    if (gameState.value.gameOver) {
      gameState.value.score = 0
      gameState.value.gameOver = false
    }
    
    if (!gameState.value.isRunning) {
      initializeSnake()
      generateFood()
      gameState.value.direction = 'right'
      gameState.value.isRunning = true
      gameInterval = setInterval(move, GAME_SPEED)
    }
  }

  const pauseGame = () => {
    if (gameState.value.isRunning && gameInterval) {
      clearInterval(gameInterval)
      gameInterval = null
      gameState.value.isRunning = false
    } else if (!gameState.value.gameOver) {
      gameState.value.isRunning = true
      gameInterval = setInterval(move, GAME_SPEED)
    }
  }

  const endGame = () => {
    if (gameInterval) {
      clearInterval(gameInterval)
      gameInterval = null
    }
    
    gameState.value.isRunning = false
    gameState.value.gameOver = true
    gameState.value.highScore = Math.max(gameState.value.score, gameState.value.highScore)
  }

  const changeDirection = (newDirection: Direction) => {
    const opposites = {
      up: 'down',
      down: 'up',
      left: 'right',
      right: 'left'
    }
    
    if (newDirection !== opposites[gameState.value.direction]) {
      gameState.value.direction = newDirection
    }
  }

  return {
    gameState: computed(() => gameState.value),
    startGame,
    pauseGame,
    changeDirection
  }
}