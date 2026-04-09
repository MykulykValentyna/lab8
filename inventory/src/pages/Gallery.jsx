import { useState, useEffect, useMemo } from 'react';
import { useInventory } from '../store/InventoryContext';
import { useFavorites } from '../hooks/useFavorites';
import InventoryGallery from '../components/gallery/InventoryGallery';
import InventoryQuickView from '../components/gallery/InventoryQuickView';
import FavoritesBar from '../components/gallery/FavoritesBar';

const Gallery = () => {
  const { items, loading, fetchItems, error } = useInventory();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const [selectedItem, setSelectedItem] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.inventory_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [items, searchQuery]);

  return (
    <div className="space-y-10 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Каталог <span className="text-blue-600">складу</span>
          </h1>
          <p className="text-gray-500 max-w-md">
            Переглядайте доступне обладнання, вивчайте деталі та зберігайте потрібні позиції в обране.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Пошук інвентарю..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
          <span className="absolute left-3 top-3.5 text-gray-400">🔍</span>
        </div>
      </header>

      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl animate-shake">
          <p className="font-bold">Упс! Сталася помилка</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      <InventoryGallery 
        items={filteredItems} 
        loading={loading} 
        onCardClick={setSelectedItem}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
      />

      {selectedItem && (
        <InventoryQuickView 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      )}

      <FavoritesBar />
    </div>
  );
};

export default Gallery;