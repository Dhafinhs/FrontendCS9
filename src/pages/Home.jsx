import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import HeroSlider from "../pages/HeroSlider";
import logo from "../assets/logo-tulis.png";

const Home = () => {
  const [items, setItems] = useState([]);
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const fetchItems = (storeId = null) => {
    const url = storeId
      ? `https://backend-4vhu.vercel.app/item/byStoreId/${storeId}`
      : "hhttps://backend-4vhu.vercel.app/item";

    axios
      .get(url)
      .then((res) => {
        if (res.data.success) setItems(res.data.payload);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    axios
      .get("https://backend-production-5264.up.railway.app//store/getAll")
      .then((res) => setStores(res.data.payload || []))
      .catch((err) => console.error(err));

    fetchItems();
  }, []);

  const handleSelectStore = (storeId) => {
    setSelectedStore(storeId);
    fetchItems(storeId);
    setShowSidebar(false);
  };

  return (
    <div className="font-sans bg-blue-50 min-h-screen relative overflow-hidden">
      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-500 ease-in-out z-50`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="font-bold text-blue-700 text-lg">Daftar Toko</h2>
          <button
            onClick={() => setShowSidebar(false)}
            className="text-red-500 font-bold hover:scale-110 transition"
          >
            ✕
          </button>
        </div>
        <div className="p-4 space-y-2">
          <button
            onClick={() => handleSelectStore(null)}
            className={`block w-full text-left px-2 py-1 rounded transition hover:bg-blue-100 ${
              selectedStore === null ? "bg-blue-100 font-semibold" : ""
            }`}
          >
            Semua Toko
          </button>
          {stores.map((store) => (
            <button
              key={store.id}
              onClick={() => handleSelectStore(store.id)}
              className={`block w-full text-left px-2 py-1 rounded transition hover:bg-blue-100 ${
                selectedStore === store.id ? "bg-blue-100 font-semibold" : ""
              }`}
            >
              {store.name}
            </button>
          ))}
        </div>
      </div>

      {/* Navbar */}
      <header className="bg-blue-700 text-blue-50 shadow p-4 flex justify-between items-center fixed w-full z-40">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowSidebar(true)}
            className="hover:text-blue-200 hover:scale-110 transition"
          >
            ☰
          </button>
          <img src={logo} alt="TokoPaEdi Logo" className="w-12 h-12" />
          <div className="text-2xl font-bold">TokoPaEdi</div>
        </div>

        <input
          type="text"
          placeholder="Cari produk..."
          className="w-1/3 px-4 py-2 rounded-full text-sm text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
        />

        <div className="flex items-center space-x-4 text-sm">
          <Link to="/transactions" className="hover:text-blue-200">
            Transaksi Saya
          </Link>

          <Link to="/my-products" className="hover:text-blue-200 hover:underline transition">
            Produk Saya
          </Link>
          {user ? (
            <>
              <span className="hidden sm:inline">
                👤 {user.name} | 💰 Rp{user.balance?.toLocaleString() || 0}
              </span>
              <Link to="/topup" className="hover:text-blue-200 hover:underline transition">
                Top Up
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-blue-200 hover:underline transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200 hover:underline transition">
                Masuk
              </Link>
              <Link to="/register" className="hover:text-blue-200 hover:underline transition">
                Daftar
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>

      {/* Hero Section */}
      <section className="bg-blue-50">
        <HeroSlider />
      </section>

      {/* Product Grid */}
      <main className="p-6 max-w-7xl mx-auto">
        {items.length === 0 ? (
          <p className="text-center text-blue-600 animate-pulse">Belum ada produk.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow hover:shadow-xl transition transform hover:scale-105 p-2 flex flex-col animate-fadeIn"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <img
                  src={
                    item.image_url || "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={item.name}
                  className="w-full h-32 object-cover rounded"
                />
                <h3 className="mt-2 font-semibold text-sm text-blue-700 truncate">
                  {item.name}
                </h3>
                <p className="text-blue-600 text-sm">
                  Rp{item.price.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-blue-700 text-blue-50 text-center text-sm py-4 mt-8">
        &copy; 2025 TokoPaEdi — inspired by Tokopedia 💙
      </footer>
    </div>
  );
};

export default Home;
