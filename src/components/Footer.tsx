const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-yellow-400">H5 Games</h3>
            <p className="text-sm mt-1">La meilleure plateforme de jeux en ligne</p>
          </div>
          <div className="text-sm">
            <p>&copy; {new Date().getFullYear()} H5 Games. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
