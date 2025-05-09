import { Link } from 'react-router-dom';

interface GameCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'solo' | 'arcade';
}

const GameCard = ({ id, title, description, imageUrl, category }: GameCardProps) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <span className={`px-2 py-1 text-xs rounded-full ${
            category === 'solo' ? 'bg-blue-500' : 'bg-purple-500'
          }`}>
            {category === 'solo' ? 'Solo' : 'Arcade'}
          </span>
        </div>
        <p className="text-gray-300 mb-4 text-sm">{description}</p>
        <Link 
          to={`/games/${category}/${id}`} 
          className="block w-full text-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded transition-colors"
        >
          Jouer
        </Link>
      </div>
    </div>
  );
};

export default GameCard;
