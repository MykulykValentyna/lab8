import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { inventoryService } from '../services/inventoryApi';
import InventoryForm from '../components/inventory/InventoryForm';

const AdminInventoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await inventoryService.getById(id);
        setInitialData(response.data);
      } catch (err) {
        setError('Не вдалося завантажити дані для редагування');
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleUpdate = async (data) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const textData = {
        inventory_name: data.inventory_name,
        description: data.description
      };
      await inventoryService.updateText(id, textData);

      if (data.photo instanceof File) {
        const photoData = new FormData();
        photoData.append('photo', data.photo);
        await inventoryService.updatePhoto(id, photoData);
      }

      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Помилка при оновленні даних');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-10 italic text-gray-500">Завантаження форми...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Редагування інвентарю</h1>
          <p className="text-gray-500 text-sm font-mono">ID: {id}</p>
        </div>
        <button 
          onClick={() => navigate('/admin')}
          className="text-sm text-blue-600 hover:underline"
        >
          Скасувати
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
          {error}
        </div>
      )}

      <InventoryForm 
        onSubmit={handleUpdate} 
        initialData={initialData} 
        isSubmitting={isSubmitting} 
      />

      <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h4 className="text-xs font-bold text-blue-800 uppercase mb-2">Примітка до ТЗ</h4>
        <p className="text-xs text-blue-700 leading-relaxed">
          Система автоматично виконає два запити: спочатку оновить текстову інформацію у форматі JSON, 
          а потім завантажить нову фотографію як multipart/form-data, якщо файл було змінено.
        </p>
      </div>
    </div>
  );
};

export default AdminInventoryEdit;