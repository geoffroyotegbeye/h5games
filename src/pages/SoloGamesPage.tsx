import GameCard from '../components/GameCard';

// Données fictives pour les jeux solo
const soloGames = [
  {
    id: 'snake',
    title: 'Snake',
    description: 'Le jeu classique Snake. Mangez les pommes et grandissez sans vous mordre la queue!',
    imageUrl: '/src/assets/images/snake.jpg',
    category: 'solo' as const
  },
  {
    id: 'tetris',
    title: 'Tetris',
    description: 'Empilez les blocs et complétez des lignes dans ce jeu de puzzle classique.',
    imageUrl: '/src/assets/images/tetris.jpg',
    category: 'solo' as const
  },
  {
    id: 'memory',
    title: 'Memory',
    description: 'Testez votre mémoire en trouvant les paires de cartes correspondantes.',
    imageUrl: '/src/assets/images/memory.jpg',
    category: 'solo' as const
  },
  {
    id: '2048',
    title: '2048',
    description: 'Fusionnez les nombres pour atteindre la tuile 2048 dans ce jeu de puzzle addictif.',
    imageUrl: '/src/assets/images/2048.jpg',
    category: 'solo' as const
  },
  {
    id: 'sudoku',
    title: 'Sudoku',
    description: 'Remplissez la grille avec des chiffres de 1 à 9 sans répétition dans les lignes, colonnes et régions.',
    imageUrl: '/src/assets/images/sudoku.jpg',
    category: 'solo' as const
  },
  {
    id: 'minesweeper',
    title: 'Démineur',
    description: 'Localisez toutes les mines sans en déclencher une seule dans ce jeu de réflexion classique.',
    imageUrl: '/src/assets/images/minesweeper.jpg',
    category: 'solo' as const
  }
];

const SoloGamesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Jeux Solo</h1>
        <p className="text-xl text-gray-300">Profitez de nos jeux solo et défiez-vous</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {soloGames.map(game => (
          <GameCard 
            key={game.id}
            id={game.id}
            title={game.title}
            description={game.description}
            imageUrl={game.imageUrl}
            category={game.category}
          />
        ))}
      </div>
    </div>
  );
};

export default SoloGamesPage;
