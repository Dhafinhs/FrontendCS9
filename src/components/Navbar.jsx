import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = ({ user, setUser, onSelectStore }) => {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/store/getAll")
      .then((res) => setStores(res.data.payload))
      .catch((err) => console.error("Error ambil store:", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="bg-blue-700 text-blue-50 shadow p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        {/* Dropdown toko */}
        <div className="relative group">
          <button className="hover:text-blue-200">Toko ▼</button>
          <div className="absolute mt-1 bg-white text-blue-700 rounded shadow z-10 w-40 hidden group-hover:block">
            <button
              onClick={() => onSelectStore(null)}
              className="block w-full text-left px-4 py-2 hover:bg-blue-100"
            >
              Semua Toko
            </button>
            {stores.map((store) => (
              <button
                key={store.id}
                onClick={() => onSelectStore(store.id)}
                className="block w-full text-left px-4 py-2 hover:bg-blue-100"
              >
                {store.name}
              </button>
            ))}
          </div>
        </div>

        <Link to="/" className="text-2xl font-bold">
          Tokoku
        </Link>
      </div>

      <input
        type="text"
        placeholder="Cari produk..."
        className="w-1/3 px-4 py-2 rounded-full text-sm text-blue-700 focus:outline-none"
      />

      <div className="flex items-center space-x-4 text-sm">
        <Link to="/my-products" className="hover:text-blue-200">
          Produk Saya
        </Link>
        {user ? (
          <>
            <span className="hidden sm:inline">
              👤 {user.name} | 💰 Rp{user.balance?.toLocaleString() || 0}
            </span>
            <Link to="/topup" className="hover:text-blue-200">
              Top Up
            </Link>
            <button onClick={handleLogout} className="hover:text-blue-200">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-200">
              Masuk
            </Link>
            <Link to="/register" className="hover:text-blue-200">
              Daftar
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
