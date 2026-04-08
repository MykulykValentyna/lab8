const InventoryDetails = ({ item }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        
        <div className="md:w-1/2 bg-gray-50 flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-gray-100">
          <div className="relative group">
            <img 
              src={item.photo_url || 'https://via.placeholder.com/600x400?text=Немає+фото'} 
              alt={item.inventory_name} 
              className="max-w-full h-auto rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
            />
            {!item.photo_url && (
              <p className="mt-2 text-center text-xs text-gray-400">Зображення не завантажено</p>
            )}
          </div>
        </div>

        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded">
              Деталі інвентарю
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-gray-900 leading-tight">
              {item.inventory_name}
            </h2>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
              Опис
            </h4>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 italic text-gray-700 leading-relaxed">
              {item.description || "Опис для цього предмета відсутній."}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400">ID Позиції</p>
              <p className="font-mono text-sm text-gray-600">#{item.id}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Останнє оновлення</p>
              <p className="text-sm text-gray-600">
                {item.updated_at ? new Date(item.updated_at).toLocaleDateString() : '—'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InventoryDetails;