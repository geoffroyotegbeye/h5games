import { ref, onUnmounted } from 'vue'
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  BALL_RADIUS,
  BRICK_WIDTH,
  BRICK_HEIGHT,
  BRICK_ROWS,
  BRICK_COLS,
  BRICK_PADDING,
  BALL_SPEED,
  PADDLE_SPEED,
  COLORS
} from '../constants/breakBrick'
import type { GameState, Ball, Paddle, Brick } from '../types/breakBrick'

export function useBreakBrickGame(canvasRef: Ref<HTMLCanvasElement | null>) {
  const gameState = ref<GameState>({
    ball: {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT - PADDLE_HEIGHT - BALL_RADIUS - 10,
      dx: BALL_SPEED,
      dy: -BALL_SPEED,
      radius: BALL_RADIUS
    },
    paddle: {
      x: CANVAS_WIDTH / 2 - PADDLE_WIDTH / 2,
      y: CANVAS_HEIGHT - PADDLE_HEIGHT - 10,
      width: PADDLE_WIDTH,
      height: PADDLE_HEIGHT
    },
    bricks: [],
    score: 0,
    lives: 3,
    isRunning: false,
    gameOver: false
  })

  let animationFrame: number | null = null

  const createBricks = () => {
    const bricks: Brick[] = []
    const offsetX = (CANVAS_WIDTH - (BRICK_COLS * (BRICK_WIDTH + BRICK_PADDING))) / 2

    for (let row = 0; row < BRICK_ROWS; row++) {
      for (let col = 0; col < BRICK_COLS; col++) {
        bricks.push({
          x: offsetX + col * (BRICK_WIDTH + BRICK_PADDING),
          y: 50 + row * (BRICK_HEIGHT + BRICK_PADDING),
          width: BRICK_WIDTH,
          height: BRICK_HEIGHT,
          color: COLORS.bricks[row],
          visible: true
        })
      }
    }

    return bricks
  }

  const resetBall = () => {
    gameState.value.ball = {
      x: gameState.value.paddle.x + PADDLE_WIDTH / 2,
      y: CANVAS_HEIGHT - PADDLE_HEIGHT - BALL_RADIUS - 10,
      dx: BALL_SPEED,
      dy: -BALL_SPEED,
      radius: BALL_RADIUS
    }
  }

  const detectCollision = (ball: Ball, rect: { x: number; y: number; width: number; height: number }) => {
    return ball.x + ball.radius > rect.x &&
           ball.x - ball.radius < rect.x + rect.width &&
           ball.y + ball.radius > rect.y &&
           ball.y - ball.radius < rect.y + rect.height
  }

  const movePaddle = (direction: number) => {
    const paddle = gameState.value.paddle
    const newX = paddle.x + direction * PADDLE_SPEED

    if (newX >= 0 && newX + PADDLE_WIDTH <= CANVAS_WIDTH) {
      paddle.x = newX
    }
  }

  const update = () => {
    if (!gameState.value.isRunning) return

    const { ball, paddle } = gameState.value

    // Move ball
    ball.x += ball.dx
    ball.y += ball.dy

    // Wall collisions
    if (ball.x + ball.radius > CANVAS_WIDTH || ball.x - ball.radius < 0) {
      ball.dx = -ball.dx
    }
    if (ball.y - ball.radius < 0) {
      ball.dy = -ball.dy
    }

    // Paddle collision
    if (detectCollision(ball, paddle)) {
      ball.dy = -ball.dy
      // Add angle based on where the ball hits the paddle
      const hitPoint = (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2)
      ball.dx = hitPoint * BALL_SPEED
    }

    // Brick collision
    gameState.value.bricks.forEach(brick => {
      if (brick.visible && detectCollision(ball, brick)) {
        brick.visible = false
        ball.dy = -ball.dy
        gameState.value.score += 10

        // Play sound
        const audio = new Audio('/brick-hit.mp3')
        audio.play().catch(() => {}) // Ignore errors if sound can't play
      }
    })

    // Ball out of bounds
    if (ball.y + ball.radius > CANVAS_HEIGHT) {
      gameState.value.lives--
      if (gameState.value.lives <= 0) {
        endGame()
      } else {
        resetBall()
      }
    }

    // Check win condition
    if (gameState.value.bricks.every(brick => !brick.visible)) {
      endGame(true)
    }

    draw()
    animationFrame = requestAnimationFrame(update)
  }

  const draw = () => {
    const canvas = canvasRef.value
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // Draw paddle
    ctx.fillStyle = COLORS.paddle
    ctx.fillRect(
      gameState.value.paddle.x,
      gameState.value.paddle.y,
      PADDLE_WIDTH,
      PADDLE_HEIGHT
    )

    // Draw ball
    ctx.beginPath()
    ctx.arc(
      gameState.value.ball.x,
      gameState.value.ball.y,
      BALL_RADIUS,
      0,
      Math.PI * 2
    )
    ctx.fillStyle = COLORS.ball
    ctx.fill()
    ctx.closePath()

    // Draw bricks
    gameState.value.bricks.forEach(brick => {
      if (brick.visible) {
        ctx.fillStyle = brick.color
        ctx.fillRect(brick.x, brick.y, brick.width, brick.height)
      }
    })
  }

  const startGame = () => {
    if (gameState.value.gameOver) {
      gameState.value.score = 0
      gameState.value.lives = 3
      gameState.value.bricks = createBricks()
      gameState.value.gameOver = false
    }

    if (!gameState.value.isRunning) {
      gameState.value.isRunning = true
      if (!gameState.value.bricks.length) {
        gameState.value.bricks = createBricks()
      }
      resetBall()
      update()
    }
  }

  const pauseGame = () => {
    gameState.value.isRunning = !gameState.value.isRunning
    if (gameState.value.isRunning) {
      update()
    }
  }

  const endGame = (win = false) => {
    gameState.value.isRunning = false
    gameState.value.gameOver = true
    if (animationFrame) {
      cancelAnimationFrame(animationFrame)
    }
  }

  onUnmounted(() => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame)
    }
  })

  return {
    gameState,
    startGame,
    pauseGame,
    movePaddle
  }
}