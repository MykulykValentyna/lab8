import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { inventoryService } from '../services/inventoryApi';
import InventoryForm from '../components/inventory/InventoryForm';

const AdminInventoryCreate = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (data) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('inventory_name', data.inventory_name);
      formData.append('description', data.description);
      
      if (data.photo) {
        formData.append('photo', data.photo);
      }

      await inventoryService.create(formData);
      
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Помилка при створенні запису. Перевірте обов’язкові поля.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Додати новий інвентар</h1>
        <p className="text-gray-500 text-sm">Заповніть форму для реєстрації нової одиниці на складі</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
          {error}
        </div>
      )}

      <InventoryForm 
        onSubmit={handleCreate} 
        isSubmitting={isSubmitting} 
      />

      <div className="mt-6 text-center">
        <button 
          onClick={() => navigate('/admin')}
          className="text-gray-400 hover:text-gray-600 text-sm transition-colors"
        >
          ← Скасувати та повернутися
        </button>
      </div>
    </div>
  );
};

export default AdminInventoryCreate;