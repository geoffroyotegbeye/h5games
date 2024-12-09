export const BOARD_SIZE = 20
export const INITIAL_SNAKE_LENGTH = 3
export const GAME_SPEED = 150
export const DIRECTIONS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 }
} as const