import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useInventory } from '../store/InventoryContext';
import InventoryTable from '../components/inventory/InventoryTable';
import ConfirmModal from '../components/inventory/ConfirmModal';

const AdminInventory = () => {
  const { items, loading, error, fetchItems, removeItem } = useInventory();
  
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleDeleteConfirm = async () => {
    if (itemToDelete) {
      await removeItem(itemToDelete);
      setItemToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Управління складом</h1>
          <p className="text-gray-500">Перегляд та редагування поточного інвентарю</p>
        </div>
        <Link 
          to="/admin/create" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors shadow-sm text-center"
        >
          ＋ Додати позицію
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Завантаження даних...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Помилка: </strong>
          <span>{error}</span>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed">
          <p className="text-gray-500">Склад порожній. Додайте перший товар!</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
          <InventoryTable 
            items={items} 
            onDeleteClick={(id) => setItemToDelete(id)} 
          />
        </div>
      )}

      {itemToDelete && (
        <ConfirmModal 
          onConfirm={handleDeleteConfirm} 
          onCancel={() => setItemToDelete(null)} 
        />
      )}
    </div>
  );
};

export default AdminInventory;