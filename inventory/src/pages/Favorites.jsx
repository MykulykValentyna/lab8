import { useState } from 'react';
import { useInventory } from '../store/InventoryContext';
import { useFavorites } from '../hooks/useFavorites';
import InventoryCard from '../components/gallery/InventoryCard';
import InventoryQuickView from '../components/gallery/InventoryQuickView';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const { items } = useInventory();
  const { isFavorite, toggleFavorite, favorites } = useFavorites();
  const [selectedItem, setSelectedItem] = useState(null);

  const favoriteItems = items.filter(item => favorites.includes(item.id));

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between border-b pb-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Ваші улюблені ❤️</h1>
          <p className="text-gray-500">Тут зібрані предмети, які ви відмітили</p>
        </div>
        <Link to="/" className="text-blue-600 hover:underline font-medium">Повернутися до каталогу</Link>
      </header>

      {favoriteItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
          <div className="text-5xl mb-4">🙊</div>
          <h2 className="text-xl font-bold text-gray-800">Список порожній</h2>
          <p className="text-gray-400 mt-2">Ви ще не додали жодного предмета в обране.</p>
          <Link to="/" className="mt-6 inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
            Перейти в галерею
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoriteItems.map(item => (
            <InventoryCard 
              key={item.id} 
              item={item} 
              isFavorite={true}
              onToggleFavorite={toggleFavorite}
              onClick={setSelectedItem}
            />
          ))}
        </div>
      )}

      {selectedItem && <InventoryQuickView item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  );
};

export default Favorites;