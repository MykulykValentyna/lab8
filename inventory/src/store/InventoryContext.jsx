import { createContext, useState, useContext, useCallback } from 'react';
import { inventoryService } from '../services/inventoryApi';

const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await inventoryService.getAll();
      setItems(response.data);
    } catch (err) {
      setError('Не вдалося завантажити список товарів');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const removeItem = async (id) => {
    try {
      await inventoryService.delete(id);
      setItems((prev) => prev.filter(item => item.id !== id));
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: err.message };
    }
  };

  return (
    <InventoryContext.Provider value={{ 
      items, 
      loading, 
      error, 
      fetchItems, 
      removeItem,
      setItems 
    }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => useContext(InventoryContext);