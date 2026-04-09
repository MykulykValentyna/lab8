import InventoryCard from './InventoryCard';

const InventoryGallery = ({ items, loading, onCardClick, isFavorite, onToggleFavorite }) => {
  
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 space-y-4 shadow-sm border border-gray-100">
            <div className="aspect-square bg-gray-200 animate-pulse rounded-xl"></div>
            <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 animate-pulse rounded w-1/2"></div>
            <div className="h-10 bg-gray-100 animate-pulse rounded-lg w-full mt-4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-24 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-sm mb-4">
          <span className="text-3xl">🔍</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800">Нічого не знайдено</h3>
        <p className="text-gray-500 mt-2">Спробуйте змінити фільтри або додати нові товари в адмінці.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {items.map((item) => (
        <InventoryCard
          key={item.id}
          item={item}
          isFavorite={isFavorite(item.id)}
          onToggleFavorite={onToggleFavorite}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
};

export default InventoryGallery;