export type TetrominoType = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z'

export interface Position {
  x: number
  y: number
}

export interface Tetromino {
  type: TetrominoType
  position: Position
  shape: number[][]
}

export interface GameState {
  board: (TetrominoType | null)[][]
  currentPiece: Tetromino | null
  nextPiece: TetrominoType
  score: number
  level: number
  lines: number
  isRunning: boolean
  gameOver: boolean
}