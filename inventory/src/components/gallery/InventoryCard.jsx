const InventoryCard = ({ item, isFavorite, onToggleFavorite, onClick }) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
      <button 
        onClick={(e) => { e.stopPropagation(); onToggleFavorite(item.id); }}
        className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all ${
          isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-400 hover:text-red-500'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      </button>

      <div className="aspect-square overflow-hidden cursor-pointer" onClick={() => onClick(item)}>
        <img 
          src={item.photo_url || 'https://via.placeholder.com/400'} 
          alt={item.inventory_name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-800 truncate">{item.inventory_name}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2 h-10">{item.description}</p>
        <button 
          onClick={() => onClick(item)}
          className="mt-4 w-full py-2 bg-gray-50 hover:bg-blue-50 text-blue-600 text-sm font-semibold rounded-lg transition-colors"
        >
          Швидкий перегляд
        </button>
      </div>
    </div>
  );
};

export default InventoryCard;