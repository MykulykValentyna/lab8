import { useState, useEffect } from 'react';

const InventoryForm = ({ onSubmit, initialData = {}, isSubmitting = false }) => {
  const [formData, setFormData] = useState({
    inventory_name: '',
    description: '',
  });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (initialData.inventory_name || initialData.description) {
      setFormData({
        inventory_name: initialData.inventory_name || '',
        description: initialData.description || '',
      });
      if (initialData.photo_url) {
        setPreview(initialData.photo_url);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.inventory_name.trim()) {
      alert("Назва інвентарю є обов'язковою!");
      return;
    }

    onSubmit({
      ...formData,
      photo: photo
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Назва інвентарю <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="inventory_name"
          value={formData.inventory_name}
          onChange={handleChange}
          placeholder="Наприклад: Офісний стілець"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Опис
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          placeholder="Детальний опис предмета..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Зображення інвентарю
        </label>
        <div className="mt-1 flex items-center gap-4">
          {preview && (
            <img 
              src={preview} 
              alt="Preview" 
              className="h-20 w-20 object-cover rounded-lg border border-gray-200" 
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-all shadow-md ${
          isSubmitting 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 active:transform active:scale-95'
        }`}
      >
        {isSubmitting ? 'Збереження...' : 'Зберегти дані'}
      </button>
    </form>
  );
};

export default InventoryForm;