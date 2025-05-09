import GameCard from '../components/GameCard';

// Données fictives pour les jeux
const gamesData = [
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
  }
];

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Bienvenue sur H5 Games</h1>
        <p className="text-xl text-gray-300">Découvrez notre collection de jeux HTML5 en ligne</p>
      </div>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6">Jeux Populaires</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gamesData.map(game => (
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
      </section>
      
      <section>
        <h2 className="text-2xl font-bold text-yellow-400 mb-6">À Propos de H5 Games</h2>
        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-gray-300 mb-4">
            H5 Games est une plateforme de jeux en ligne développée avec les technologies web modernes.
            Tous nos jeux sont créés en HTML5, ce qui les rend accessibles sur tous les appareils sans installation.
          </p>
          <p className="text-gray-300">
            Que vous soyez fan de jeux solo ou de jeux d'arcade, vous trouverez votre bonheur ici.
            Amusez-vous bien !
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
