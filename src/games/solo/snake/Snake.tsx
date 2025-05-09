import { useState, useEffect, useRef, useCallback } from 'react';
import './Snake.css';

// Types
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };
type SnakePart = Position;

interface GameState {
  snake: SnakePart[];
  food: Position;
  direction: Direction;
  gameOver: boolean;
  score: number;
  speed: number;
}

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;
const MAX_SPEED = 80;
const SPEED_INCREMENT = 5;

const Snake = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>({
    snake: [{ x: 10, y: 10 }],
    food: { x: 15, y: 15 },
    direction: 'RIGHT',
    gameOver: false,
    score: 0,
    speed: INITIAL_SPEED,
  });
  const [isPaused, setIsPaused] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const gameLoopRef = useRef<number | null>(null);

  // Générer une position aléatoire pour la nourriture
  const generateFood = useCallback((): Position => {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    return { x, y };
  }, []);

  // Vérifier si deux positions sont identiques
  const isSamePosition = (pos1: Position, pos2: Position): boolean => {
    return pos1.x === pos2.x && pos1.y === pos2.y;
  };

  // Vérifier si la position est occupée par le serpent
  const isPositionOccupied = (position: Position, snake: SnakePart[]): boolean => {
    return snake.some(part => isSamePosition(part, position));
  };

  // Générer une position pour la nourriture qui n'est pas sur le serpent
  const generateFoodNotOnSnake = useCallback((snake: SnakePart[]): Position => {
    let newFood: Position;
    do {
      newFood = generateFood();
    } while (isPositionOccupied(newFood, snake));
    return newFood;
  }, [generateFood]);

  // Initialiser le jeu
  const initGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }];
    setGameState({
      snake: initialSnake,
      food: generateFoodNotOnSnake(initialSnake),
      direction: 'RIGHT',
      gameOver: false,
      score: 0,
      speed: INITIAL_SPEED,
    });
    setIsStarted(true);
    setIsPaused(false);
  }, [generateFoodNotOnSnake]);

  // Mettre à jour la direction du serpent
  const changeDirection = useCallback((newDirection: Direction) => {
    setGameState(prevState => {
      // Empêcher le serpent de faire demi-tour
      if (
        (prevState.direction === 'UP' && newDirection === 'DOWN') ||
        (prevState.direction === 'DOWN' && newDirection === 'UP') ||
        (prevState.direction === 'LEFT' && newDirection === 'RIGHT') ||
        (prevState.direction === 'RIGHT' && newDirection === 'LEFT')
      ) {
        return prevState;
      }
      return { ...prevState, direction: newDirection };
    });
  }, []);

  // Gérer les entrées clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isStarted) {
        if (e.key === 'Enter' || e.key === ' ') {
          initGame();
        }
        return;
      }

      if (e.key === 'p' || e.key === 'P') {
        setIsPaused(prev => !prev);
        return;
      }

      if (isPaused) return;

      switch (e.key) {
        case 'ArrowUp':
          changeDirection('UP');
          break;
        case 'ArrowDown':
          changeDirection('DOWN');
          break;
        case 'ArrowLeft':
          changeDirection('LEFT');
          break;
        case 'ArrowRight':
          changeDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [changeDirection, initGame, isPaused, isStarted]);

  // Mettre à jour le jeu
  const updateGame = useCallback(() => {
    setGameState(prevState => {
      if (prevState.gameOver || isPaused) return prevState;

      // Calculer la nouvelle position de la tête
      const head = { ...prevState.snake[0] };
      switch (prevState.direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      // Vérifier si le serpent sort de la grille
      if (
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE
      ) {
        return { ...prevState, gameOver: true };
      }

      // Vérifier si le serpent se mord la queue
      if (isPositionOccupied(head, prevState.snake.slice(0, -1))) {
        return { ...prevState, gameOver: true };
      }

      // Créer un nouveau serpent en ajoutant la nouvelle tête
      const newSnake = [head, ...prevState.snake];
      
      // Vérifier si le serpent mange la nourriture
      let newFood = prevState.food;
      let newScore = prevState.score;
      let newSpeed = prevState.speed;
      
      if (isSamePosition(head, prevState.food)) {
        // Augmenter le score
        newScore += 10;
        
        // Augmenter la vitesse
        newSpeed = Math.max(MAX_SPEED, newSpeed - SPEED_INCREMENT);
        
        // Générer une nouvelle nourriture
        newFood = generateFoodNotOnSnake(newSnake);
      } else {
        // Si le serpent ne mange pas, retirer la dernière partie
        newSnake.pop();
      }

      return {
        ...prevState,
        snake: newSnake,
        food: newFood,
        score: newScore,
        speed: newSpeed,
      };
    });
  }, [generateFoodNotOnSnake, isPaused]);

  // Boucle de jeu
  useEffect(() => {
    if (!isStarted || isPaused) return;

    const runGameLoop = () => {
      updateGame();
      gameLoopRef.current = window.setTimeout(runGameLoop, gameState.speed);
    };

    gameLoopRef.current = window.setTimeout(runGameLoop, gameState.speed);

    return () => {
      if (gameLoopRef.current !== null) {
        clearTimeout(gameLoopRef.current);
      }
    };
  }, [gameState.speed, isPaused, isStarted, updateGame]);

  // Dessiner le jeu
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner la grille
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dessiner le serpent
    gameState.snake.forEach((part, index) => {
      ctx.fillStyle = index === 0 ? '#4ade80' : '#22c55e';
      ctx.fillRect(
        part.x * CELL_SIZE,
        part.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
      
      // Ajouter un contour
      ctx.strokeStyle = '#16a34a';
      ctx.strokeRect(
        part.x * CELL_SIZE,
        part.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
    });

    // Dessiner la nourriture
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(
      gameState.food.x * CELL_SIZE + CELL_SIZE / 2,
      gameState.food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }, [gameState]);

  // Gérer le redémarrage du jeu
  const handleRestart = () => {
    initGame();
  };

  // Gérer la mise en pause du jeu
  const handlePause = () => {
    setIsPaused(prev => !prev);
  };

  return (
    <div className="snake-game">
      <div className="game-info">
        <div className="score">Score: {gameState.score}</div>
        {!isStarted ? (
          <div className="start-screen">
            <h2>Snake Game</h2>
            <p>Utilisez les flèches pour diriger le serpent</p>
            <p>Appuyez sur Entrée pour commencer</p>
            <button onClick={handleRestart}>Commencer</button>
          </div>
        ) : gameState.gameOver ? (
          <div className="game-over">
            <h2>Game Over!</h2>
            <p>Score final: {gameState.score}</p>
            <button onClick={handleRestart}>Rejouer</button>
          </div>
        ) : (
          <div className="controls">
            <button onClick={handlePause}>
              {isPaused ? 'Reprendre' : 'Pause'}
            </button>
            <button onClick={handleRestart}>Recommencer</button>
          </div>
        )}
      </div>
      <canvas
        ref={canvasRef}
        width={GRID_SIZE * CELL_SIZE}
        height={GRID_SIZE * CELL_SIZE}
        className="game-canvas"
      />
      <div className="instructions">
        <p>Utilisez les flèches pour diriger le serpent</p>
        <p>Appuyez sur P pour mettre en pause</p>
      </div>
    </div>
  );
};

export default Snake;
