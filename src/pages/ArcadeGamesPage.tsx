import GameCard from '../components/GameCard';

// Données fictives pour les jeux arcade
const arcadeGames = [
  {
    id: 'breakout',
    title: 'Breakout',
    description: 'Cassez tous les blocs avec une balle rebondissante dans ce jeu arcade classique.',
    imageUrl: '/src/assets/images/breakout.jpg',
    category: 'arcade' as const
  },
  {
    id: 'space-invaders',
    title: 'Space Invaders',
    description: 'Défendez la Terre contre une invasion extraterrestre dans ce jeu de tir classique.',
    imageUrl: '/src/assets/images/space-invaders.jpg',
    category: 'arcade' as const
  },
  {
    id: 'pacman',
    title: 'Pac-Man',
    description: 'Mangez toutes les pac-gommes tout en évitant les fantômes dans ce jeu d\'arcade emblématique.',
    imageUrl: '/src/assets/images/pacman.jpg',
    category: 'arcade' as const
  },
  {
    id: 'frogger',
    title: 'Frogger',
    description: 'Aidez la grenouille à traverser la route et la rivière sans se faire écraser.',
    imageUrl: '/src/assets/images/frogger.jpg',
    category: 'arcade' as const
  },
  {
    id: 'asteroids',
    title: 'Asteroids',
    description: 'Pilotez un vaisseau spatial et détruisez les astéroïdes avant qu\'ils ne vous percutent.',
    imageUrl: '/src/assets/images/asteroids.jpg',
    category: 'arcade' as const
  },
  {
    id: 'galaga',
    title: 'Galaga',
    description: 'Combattez des vagues d\'ennemis extraterrestres dans ce shoot\'em up classique.',
    imageUrl: '/src/assets/images/galaga.jpg',
    category: 'arcade' as const
  }
];

const ArcadeGamesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Jeux Arcade</h1>
        <p className="text-xl text-gray-300">Revivez les classiques de l'arcade</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {arcadeGames.map(game => (
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

export default ArcadeGamesPage;
