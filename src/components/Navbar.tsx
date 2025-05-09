import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-yellow-400 hover:text-yellow-300">
            H5 Games
          </Link>
          <div className="space-x-6">
            <Link to="/" className="hover:text-yellow-400 transition-colors">
              Accueil
            </Link>
            <Link to="/solo" className="hover:text-yellow-400 transition-colors">
              Jeux Solo
            </Link>
            <Link to="/arcade" className="hover:text-yellow-400 transition-colors">
              Jeux Arcade
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
