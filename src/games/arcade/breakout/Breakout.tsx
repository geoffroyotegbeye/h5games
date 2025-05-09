import { useState, useEffect, useRef, useCallback } from 'react';
import './Breakout.css';

// Types
interface Brick {
  x: number;
  y: number;
  width: number;
  height: number;
  status: boolean;
  color: string;
}

interface Ball {
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;
  speed: number;
}

interface Paddle {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}

interface GameState {
  ball: Ball;
  paddle: Paddle;
  bricks: Brick[][];
  score: number;
  lives: number;
  gameOver: boolean;
  gameWon: boolean;
}

// Constants
const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 400;
const BRICK_ROWS = 5;
const BRICK_COLUMNS = 8;
const BRICK_WIDTH = 50;
const BRICK_HEIGHT = 20;
const BRICK_PADDING = 10;
const BRICK_OFFSET_TOP = 30;
const BRICK_OFFSET_LEFT = 35;
const BALL_RADIUS = 8;
const PADDLE_WIDTH = 80;
const PADDLE_HEIGHT = 10;
const PADDLE_SPEED = 7;
const INITIAL_BALL_SPEED = 4;
const MAX_BALL_SPEED = 8;

// Couleurs pour les briques
const BRICK_COLORS = [
  '#ef4444', // Rouge
  '#f97316', // Orange
  '#eab308', // Jaune
  '#22c55e', // Vert
  '#3b82f6', // Bleu
];

const Breakout = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const keysPressed = useRef<Set<string>>(new Set());

  // Initialiser les briques
  const initBricks = useCallback((): Brick[][] => {
    const bricks: Brick[][] = [];
    for (let row = 0; row < BRICK_ROWS; row++) {
      bricks[row] = [];
      for (let col = 0; col < BRICK_COLUMNS; col++) {
        bricks[row][col] = {
          x: col * (BRICK_WIDTH + BRICK_PADDING) + BRICK_OFFSET_LEFT,
          y: row * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_OFFSET_TOP,
          width: BRICK_WIDTH,
          height: BRICK_HEIGHT,
          status: true,
          color: BRICK_COLORS[row % BRICK_COLORS.length],
        };
      }
    }
    return bricks;
  }, []);

  // Initialiser le jeu
  const initGame = useCallback(() => {
    const newGameState: GameState = {
      ball: {
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT - 30,
        radius: BALL_RADIUS,
        dx: INITIAL_BALL_SPEED,
        dy: -INITIAL_BALL_SPEED,
        speed: INITIAL_BALL_SPEED,
      },
      paddle: {
        x: (CANVAS_WIDTH - PADDLE_WIDTH) / 2,
        y: CANVAS_HEIGHT - PADDLE_HEIGHT - 10,
        width: PADDLE_WIDTH,
        height: PADDLE_HEIGHT,
        speed: PADDLE_SPEED,
      },
      bricks: initBricks(),
      score: 0,
      lives: 3,
      gameOver: false,
      gameWon: false,
    };
    setGameState(newGameState);
    setIsStarted(true);
    setIsPaused(false);
  }, [initBricks]);

  // Détecter les collisions entre la balle et les briques
  const detectBrickCollision = useCallback((ball: Ball, brick: Brick): boolean => {
    if (!brick.status) return false;

    const ballLeft = ball.x - ball.radius;
    const ballRight = ball.x + ball.radius;
    const ballTop = ball.y - ball.radius;
    const ballBottom = ball.y + ball.radius;

    const brickLeft = brick.x;
    const brickRight = brick.x + brick.width;
    const brickTop = brick.y;
    const brickBottom = brick.y + brick.height;

    return (
      ballRight > brickLeft &&
      ballLeft < brickRight &&
      ballBottom > brickTop &&
      ballTop < brickBottom
    );
  }, []);

  // Gérer les collisions
  const handleCollisions = useCallback((state: GameState): GameState => {
    const { ball, paddle, bricks } = state;
    let { score, lives, gameOver, gameWon } = state;
    let { dx, dy, speed } = ball;

    // Collision avec les murs latéraux
    if (ball.x + ball.radius > CANVAS_WIDTH || ball.x - ball.radius < 0) {
      dx = -dx;
    }

    // Collision avec le mur supérieur
    if (ball.y - ball.radius < 0) {
      dy = -dy;
    }

    // Collision avec le paddle
    if (
      ball.y + ball.radius > paddle.y &&
      ball.y + ball.radius < paddle.y + paddle.height &&
      ball.x > paddle.x &&
      ball.x < paddle.x + paddle.width
    ) {
      // Calculer où la balle a frappé le paddle (de -1 à 1)
      const hitPosition = (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);
      
      // Ajuster l'angle de rebond en fonction de l'endroit où la balle a frappé
      dx = speed * Math.sin(hitPosition);
      dy = -speed * Math.cos(hitPosition);
    }

    // Collision avec le bas de l'écran (perte de vie)
    if (ball.y + ball.radius > CANVAS_HEIGHT) {
      lives--;
      
      if (lives <= 0) {
        gameOver = true;
      } else {
        // Réinitialiser la position de la balle
        ball.x = CANVAS_WIDTH / 2;
        ball.y = CANVAS_HEIGHT - 30;
        ball.dx = INITIAL_BALL_SPEED;
        ball.dy = -INITIAL_BALL_SPEED;
        ball.speed = INITIAL_BALL_SPEED;
        
        // Réinitialiser la position du paddle
        paddle.x = (CANVAS_WIDTH - PADDLE_WIDTH) / 2;
      }
    }

    // Collision avec les briques
    let brickCount = 0;
    for (let row = 0; row < BRICK_ROWS; row++) {
      for (let col = 0; col < BRICK_COLUMNS; col++) {
        const brick = bricks[row][col];
        
        if (brick.status) {
          brickCount++;
          
          if (detectBrickCollision(ball, brick)) {
            brick.status = false;
            score += 10;
            
            // Augmenter légèrement la vitesse de la balle
            if (ball.speed < MAX_BALL_SPEED) {
              ball.speed += 0.1;
            }
            
            // Déterminer de quel côté la collision s'est produite
            const ballCenterX = ball.x;
            const ballCenterY = ball.y;
            const brickCenterX = brick.x + brick.width / 2;
            const brickCenterY = brick.y + brick.height / 2;
            
            // Calculer les distances
            const dx = ballCenterX - brickCenterX;
            const dy = ballCenterY - brickCenterY;
            const width = (ball.radius + brick.width / 2);
            const height = (ball.radius + brick.height / 2);
            const crossWidth = width * dy;
            const crossHeight = height * dx;
            
            if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
              if (crossWidth > crossHeight) {
                if (crossWidth > -crossHeight) {
                  // Collision par le bas
                  ball.dy = Math.abs(ball.dy);
                } else {
                  // Collision par la gauche
                  ball.dx = -Math.abs(ball.dx);
                }
              } else {
                if (crossWidth > -crossHeight) {
                  // Collision par la droite
                  ball.dx = Math.abs(ball.dx);
                } else {
                  // Collision par le haut
                  ball.dy = -Math.abs(ball.dy);
                }
              }
            }
          }
        }
      }
    }

    // Vérifier si toutes les briques ont été détruites
    if (brickCount === 0) {
      gameWon = true;
    }

    return {
      ...state,
      ball: {
        ...ball,
        dx,
        dy,
      },
      score,
      lives,
      gameOver,
      gameWon,
    };
  }, [detectBrickCollision]);

  // Mettre à jour la position du paddle
  const updatePaddle = useCallback((state: GameState): GameState => {
    const { paddle } = state;
    let { x } = paddle;

    if (keysPressed.current.has('ArrowLeft') || keysPressed.current.has('a')) {
      x = Math.max(0, x - paddle.speed);
    }
    
    if (keysPressed.current.has('ArrowRight') || keysPressed.current.has('d')) {
      x = Math.min(CANVAS_WIDTH - paddle.width, x + paddle.speed);
    }

    return {
      ...state,
      paddle: {
        ...paddle,
        x,
      },
    };
  }, []);

  // Mettre à jour la position de la balle
  const updateBall = useCallback((state: GameState): GameState => {
    const { ball } = state;
    
    return {
      ...state,
      ball: {
        ...ball,
        x: ball.x + ball.dx,
        y: ball.y + ball.dy,
      },
    };
  }, []);

  // Mettre à jour l'état du jeu
  const updateGameState = useCallback(() => {
    if (!gameState || gameState.gameOver || gameState.gameWon || isPaused) return;

    let newState = { ...gameState };
    newState = updatePaddle(newState);
    newState = updateBall(newState);
    newState = handleCollisions(newState);

    setGameState(newState);
  }, [gameState, handleCollisions, isPaused, updateBall, updatePaddle]);

  // Boucle de jeu
  useEffect(() => {
    if (!isStarted || !gameState) return;

    const gameLoop = () => {
      updateGameState();
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState, isStarted, updateGameState]);

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

      keysPressed.current.add(e.key);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [initGame, isStarted]);

  // Dessiner le jeu
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !gameState) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner l'arrière-plan
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dessiner les briques
    for (let row = 0; row < BRICK_ROWS; row++) {
      for (let col = 0; col < BRICK_COLUMNS; col++) {
        const brick = gameState.bricks[row][col];
        if (brick.status) {
          ctx.fillStyle = brick.color;
          ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
          
          // Ajouter un effet 3D
          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.fillRect(brick.x, brick.y, brick.width, 5);
          ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
          ctx.fillRect(brick.x, brick.y + brick.height - 5, brick.width, 5);
        }
      }
    }

    // Dessiner le paddle
    const { paddle } = gameState;
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    
    // Ajouter un effet 3D au paddle
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, 3);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(paddle.x, paddle.y + paddle.height - 3, paddle.width, 3);

    // Dessiner la balle
    const { ball } = gameState;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#f8fafc';
    ctx.fill();
    ctx.closePath();
    
    // Ajouter un effet de brillance à la balle
    ctx.beginPath();
    ctx.arc(ball.x - ball.radius / 3, ball.y - ball.radius / 3, ball.radius / 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fill();
    ctx.closePath();

    // Dessiner le score
    ctx.font = '16px Arial';
    ctx.fillStyle = '#f8fafc';
    ctx.fillText(`Score: ${gameState.score}`, 8, 20);

    // Dessiner les vies
    ctx.fillText(`Vies: ${gameState.lives}`, CANVAS_WIDTH - 65, 20);

    // Afficher un message si le jeu est en pause
    if (isPaused) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '24px Arial';
      ctx.fillStyle = '#f8fafc';
      ctx.textAlign = 'center';
      ctx.fillText('PAUSE', canvas.width / 2, canvas.height / 2);
      ctx.textAlign = 'start';
    }
  }, [gameState, isPaused]);

  // Gérer le redémarrage du jeu
  const handleRestart = () => {
    initGame();
  };

  // Gérer la mise en pause du jeu
  const handlePause = () => {
    setIsPaused(prev => !prev);
  };

  return (
    <div className="breakout-game">
      {!isStarted ? (
        <div className="start-screen">
          <h2>Breakout</h2>
          <p>Utilisez les flèches gauche et droite pour déplacer la raquette</p>
          <p>Détruisez toutes les briques pour gagner</p>
          <button onClick={handleRestart}>Commencer</button>
        </div>
      ) : gameState?.gameOver ? (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>Score final: {gameState.score}</p>
          <button onClick={handleRestart}>Rejouer</button>
        </div>
      ) : gameState?.gameWon ? (
        <div className="game-won">
          <h2>Victoire!</h2>
          <p>Score final: {gameState.score}</p>
          <button onClick={handleRestart}>Rejouer</button>
        </div>
      ) : (
        <div className="game-container">
          <div className="controls">
            <button onClick={handlePause}>
              {isPaused ? 'Reprendre' : 'Pause'}
            </button>
            <button onClick={handleRestart}>Recommencer</button>
          </div>
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="game-canvas"
          />
          <div className="instructions">
            <p>Utilisez les flèches gauche/droite ou A/D pour déplacer la raquette</p>
            <p>Appuyez sur P pour mettre en pause</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Breakout;
