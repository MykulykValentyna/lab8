import { useFavorites } from '../../hooks/useFavorites';
import { Link } from 'react-router-dom';

const FavoritesBar = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-bounce">
      <Link 
        to="/favorites" 
        className="bg-red-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 hover:bg-red-600 transition-colors border-2 border-white"
      >
        <span className="font-bold">{favorites.length}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      </Link>
    </div>
  );
};

export default FavoritesBar;