import { createContext, useContext, useState, useCallback } from 'react';
import { inventoryService } from '../services/inventoryApi';

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await inventoryService.getAll();
      setItems(response.data);
      setError(null);
    } catch (err) {
      setError('Не вдалося завантажити дані зі складу.');
    } finally {
      setLoading(false);
    }
  }, []);

  const removeItem = async (id) => {
    try {
      await inventoryService.delete(id);
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      alert("Помилка при видаленні");
    }
  };

  return (
    <InventoryContext.Provider value={{ items, loading, error, fetchItems, removeItem }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);