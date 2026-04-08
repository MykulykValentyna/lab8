import { Link } from 'react-router-dom';

const InventoryTable = ({ items = [], onDeleteClick }) => {
  if (!Array.isArray(items)) {
    return (
      <div className="p-10 text-center text-gray-500 italic">
        Очікування даних...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Фото
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Назва інвентарю
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Опис
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Дії
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex-shrink-0 h-12 w-12">
                  <img 
                    className="h-12 w-12 rounded-md object-cover border border-gray-200" 
                    src={item.photo_url || 'https://via.placeholder.com/150'} 
                    alt={item.inventory_name} 
                  />
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.inventory_name}
              </td>

              <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                {item.description || <span className="italic text-gray-400">Немає опису</span>}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                <Link 
                  to={`/admin/details/${item.id}`} 
                  className="text-blue-600 hover:text-blue-900 bg-blue-50 px-2 py-1 rounded transition-colors"
                  title="Переглянути"
                >
                  👁️
                </Link>
                <Link 
                  to={`/admin/edit/${item.id}`} 
                  className="text-yellow-600 hover:text-yellow-900 bg-yellow-50 px-2 py-1 rounded transition-colors"
                  title="Редагувати"
                >
                  ✏️
                </Link>
                <button 
                  onClick={() => onDeleteClick(item.id)}
                  className="text-red-600 hover:text-red-900 bg-red-50 px-2 py-1 rounded transition-colors"
                  title="Видалити"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;