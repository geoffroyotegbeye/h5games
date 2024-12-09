export interface Position {
  x: number
  y: number
}

export interface Ball extends Position {
  dx: number
  dy: number
  radius: number
}

export interface Paddle extends Position {
  width: number
  height: number
}

export interface Brick extends Position {
  width: number
  height: number
  color: string
  visible: boolean
}

export interface GameState {
  ball: Ball
  paddle: Paddle
  bricks: Brick[]
  score: number
  lives: number
  isRunning: boolean
  gameOver: boolean
}