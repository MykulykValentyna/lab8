import { createPortal } from 'react-dom'; // Додали імпорт порталу

const InventoryQuickView = ({ item, onClose }) => {
  if (!item) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6">
      
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-20 bg-gray-100/90 backdrop-blur hover:bg-gray-200 text-gray-800 w-8 h-8 flex items-center justify-center rounded-full transition-colors shadow-sm"
        >
          ✕
        </button>
        
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-50 flex-shrink-0 relative">
          <img 
            src={item.photo_url} 
            className="absolute inset-0 w-full h-full object-contain p-4" 
            alt={item.inventory_name} 
          />
        </div>
        
        <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col">
          <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">Деталі складу</span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2 mb-4 leading-tight">
            {item.inventory_name}
          </h2>
          
          <p className="text-gray-600 leading-relaxed mb-6">
            {item.description || 'Опис відсутній'}
          </p>
          
          <div className="mt-auto pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              ID Позиції: <span className="font-mono text-gray-600">#{item.id}</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default InventoryQuickView;