export interface Position {
  x: number
  y: number
}

export type Direction = 'up' | 'down' | 'left' | 'right'

export interface GameState {
  snake: Position[]
  food: Position
  direction: Direction
  score: number
  highScore: number
  isRunning: boolean
  gameOver: boolean
}