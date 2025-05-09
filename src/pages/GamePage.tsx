import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, lazy, Suspense } from 'react';

// Importation dynamique des jeux
const Snake = lazy(() => import('../games/solo/snake'));
const Breakout = lazy(() => import('../games/arcade/breakout'));

interface GameData {
  id: string;
  title: string;
  description: string;
  category: 'solo' | 'arcade';
  component: React.ComponentType;
}

// Données des jeux disponibles
const GAMES_DATA: Record<string, Record<string, GameData>> = {
  solo: {
    'snake': {
      id: 'snake',
      title: 'Snake',
      description: 'Le jeu classique Snake. Mangez les pommes et grandissez sans vous mordre la queue!',
      category: 'solo',
      component: Snake
    },
  },
  arcade: {
    'breakout': {
      id: 'breakout',
      title: 'Breakout',
      description: 'Cassez tous les blocs avec une balle rebondissante dans ce jeu arcade classique.',
      category: 'arcade',
      component: Breakout
    },
  }
};

const GamePage = () => {
  const { category, gameId } = useParams<{ category: string; gameId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState<GameData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGame = async () => {
      if (!category || !gameId) {
        setError('Jeu non trouvé');
        setLoading(false);
        return;
      }

      try {
        // Vérifier si le jeu existe dans notre catalogue
        if (GAMES_DATA[category]?.[gameId]) {
          setGame(GAMES_DATA[category][gameId]);
        } else {
          setError(`Le jeu ${gameId} n'existe pas dans la catégorie ${category}`);
        }
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement du jeu');
        setLoading(false);
      }
    };

    loadGame();
  }, [category, gameId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Erreur</h1>
        <p className="text-xl text-gray-300 mb-6">{error || 'Jeu non trouvé'}</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-6 rounded transition-colors"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">{game.title}</h1>
        <p className="text-gray-300 mb-4">{game.description}</p>
        <div className="flex space-x-4">
          <span className={`px-3 py-1 text-sm rounded-full ${
            game.category === 'solo' ? 'bg-blue-500' : 'bg-purple-500'
          }`}>
            {game.category === 'solo' ? 'Solo' : 'Arcade'}
          </span>
          <button 
            onClick={() => navigate(`/${game.category}`)}
            className="text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            Retour aux jeux {game.category}
          </button>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg p-4 h-[600px] flex items-center justify-center">
        <Suspense fallback={<div className="text-white">Chargement du jeu...</div>}>
          <game.component />
        </Suspense>
      </div>
    </div>
  );
};

export default GamePage;
