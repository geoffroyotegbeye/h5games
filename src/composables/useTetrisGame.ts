import { ref, computed } from 'vue'
import { BOARD_WIDTH, BOARD_HEIGHT, TETROMINOS, TICK_SPEED } from '../constants/tetris'
import type { GameState, Tetromino, TetrominoType, Position } from '../types/tetris'

export function useTetrisGame() {
  const gameState = ref<GameState>({
    board: Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null)),
    currentPiece: null,
    nextPiece: 'T',
    score: 0,
    level: 1,
    lines: 0,
    isRunning: false,
    gameOver: false
  })

  let gameInterval: number | null = null

  const createTetromino = (type: TetrominoType): Tetromino => ({
    type,
    position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 },
    shape: [...TETROMINOS[type].shape]
  })

  const rotateMatrix = (matrix: number[][]): number[][] => {
    const N = matrix.length
    const rotated = matrix.map((row, i) =>
      matrix.map(col => col[N - i - 1])
    )
    return rotated
  }

  const isValidMove = (piece: Tetromino, position: Position): boolean => {
    return piece.shape.every((row, dy) =>
      row.every((value, dx) => {
        if (!value) return true
        const newX = position.x + dx
        const newY = position.y + dy
        return (
          newX >= 0 &&
          newX < BOARD_WIDTH &&
          newY < BOARD_HEIGHT &&
          (newY < 0 || gameState.value.board[newY][newX] === null)
        )
      })
    )
  }

  const mergePiece = (piece: Tetromino) => {
    piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          const boardY = piece.position.y + y
          if (boardY >= 0) {
            gameState.value.board[boardY][piece.position.x + x] = piece.type
          }
        }
      })
    })
  }

  const clearLines = () => {
    let linesCleared = 0
    gameState.value.board = gameState.value.board.filter(row => {
      const isFull = row.every(cell => cell !== null)
      if (isFull) linesCleared++
      return !isFull
    })

    while (gameState.value.board.length < BOARD_HEIGHT) {
      gameState.value.board.unshift(Array(BOARD_WIDTH).fill(null))
    }

    if (linesCleared > 0) {
      gameState.value.lines += linesCleared
      gameState.value.score += linesCleared * 100 * gameState.value.level
      gameState.value.level = Math.floor(gameState.value.lines / 10) + 1
    }
  }

  const moveDown = () => {
    if (!gameState.value.currentPiece) return

    const newPosition = {
      ...gameState.value.currentPiece.position,
      y: gameState.value.currentPiece.position.y + 1
    }

    if (isValidMove(gameState.value.currentPiece, newPosition)) {
      gameState.value.currentPiece.position = newPosition
    } else {
      mergePiece(gameState.value.currentPiece)
      clearLines()
      spawnNewPiece()
    }
  }

  const moveHorizontal = (direction: number) => {
    if (!gameState.value.currentPiece) return

    const newPosition = {
      ...gameState.value.currentPiece.position,
      x: gameState.value.currentPiece.position.x + direction
    }

    if (isValidMove(gameState.value.currentPiece, newPosition)) {
      gameState.value.currentPiece.position = newPosition
    }
  }

  const rotate = () => {
    if (!gameState.value.currentPiece) return

    const rotatedShape = rotateMatrix(gameState.value.currentPiece.shape)
    const originalShape = gameState.value.currentPiece.shape

    gameState.value.currentPiece.shape = rotatedShape
    if (!isValidMove(gameState.value.currentPiece, gameState.value.currentPiece.position)) {
      gameState.value.currentPiece.shape = originalShape
    }
  }

  const getRandomTetromino = (): TetrominoType => {
    const pieces = Object.keys(TETROMINOS) as TetrominoType[]
    return pieces[Math.floor(Math.random() * pieces.length)]
  }

  const spawnNewPiece = () => {
    gameState.value.currentPiece = createTetromino(gameState.value.nextPiece)
    gameState.value.nextPiece = getRandomTetromino()

    if (!isValidMove(gameState.value.currentPiece, gameState.value.currentPiece.position)) {
      endGame()
    }
  }

  const startGame = () => {
    if (gameState.value.gameOver) {
      gameState.value.board = Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null))
      gameState.value.score = 0
      gameState.value.level = 1
      gameState.value.lines = 0
      gameState.value.gameOver = false
    }

    if (!gameState.value.isRunning) {
      gameState.value.nextPiece = getRandomTetromino()
      spawnNewPiece()
      gameState.value.isRunning = true
      gameInterval = setInterval(() => {
        if (gameState.value.isRunning) {
          moveDown()
        }
      }, TICK_SPEED / gameState.value.level)
    }
  }

  const pauseGame = () => {
    gameState.value.isRunning = !gameState.value.isRunning
  }

  const endGame = () => {
    if (gameInterval) {
      clearInterval(gameInterval)
      gameInterval = null
    }
    gameState.value.isRunning = false
    gameState.value.gameOver = true
  }

  return {
    gameState: computed(() => gameState.value),
    startGame,
    pauseGame,
    moveDown,
    moveHorizontal,
    rotate
  }
}