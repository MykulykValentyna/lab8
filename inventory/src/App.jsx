import { BrowserRouter, Routes, Route, Navigate, Link, NavLink } from 'react-router-dom';
import AdminInventory from './pages/AdminInventory';
import AdminInventoryCreate from './pages/AdminInventoryCreate';
import AdminInventoryEdit from './pages/AdminInventoryEdit';
import AdminInventoryDetails from './pages/AdminInventoryDetails';
import Gallery from './pages/Gallery';
import Favorites from './pages/Favorites';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white border-b sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="text-xl font-black text-blue-600 tracking-tighter">STOCK.MODERN</Link>
            <div className="flex gap-6">
              <NavLink to="/" className={({isActive}) => isActive ? "text-blue-600 font-bold" : "text-gray-500 hover:text-gray-900"}>Галерея</NavLink>
              <NavLink to="/favorites" className={({isActive}) => isActive ? "text-red-500 font-bold" : "text-gray-500 hover:text-red-500"}>❤️ Обране</NavLink>
              <NavLink to="/admin" className="ml-4 px-4 py-1.5 bg-gray-900 text-white rounded-full text-sm">Адмінка</NavLink>
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto p-4 md:p-8">
          <Routes>
            <Route path="/" element={<Gallery />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/admin" element={<AdminInventory />} />
            <Route path="/admin/create" element={<AdminInventoryCreate />} />
            <Route path="/admin/edit/:id" element={<AdminInventoryEdit />} />
            <Route path="/admin/details/:id" element={<AdminInventoryDetails />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;