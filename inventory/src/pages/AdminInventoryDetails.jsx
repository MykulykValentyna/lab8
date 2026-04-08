import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { inventoryService } from '../services/inventoryApi';
import InventoryDetails from '../components/inventory/InventoryDetails';

const AdminInventoryDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      setLoading(true);
      try {
        const response = await inventoryService.getById(id);
        setItem(response.data);
      } catch (err) {
        setError('Не вдалося завантажити дані про цей предмет.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchItemDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          onClick={() => navigate('/admin')}
          className="text-blue-600 hover:underline"
        >
          Повернутися до списку
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => navigate('/admin')}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <span className="mr-2">←</span> Назад до списку
        </button>
        <Link 
          to={`/admin/edit/${id}`}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-sm transition-colors"
        >
          Редагувати ✏️
        </Link>
      </div>

      {item && <InventoryDetails item={item} />}
    </div>
  );
};

export default AdminInventoryDetails;