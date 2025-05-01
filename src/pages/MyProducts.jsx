import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../assets/logo-tulis.png";

const MyProducts = () => {
  const [storeId, setStoreId] = useState("");
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    if (!storeId) return alert("Masukkan Store ID terlebih dahulu.");

    try {
      const res = await axios.get(`https://backend-production-5264.up.railway.app/item/byStoreId/${storeId}`);
      setProducts(res.data.payload || []);
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil produk toko.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin hapus produk ini?")) return;
    try {
      await axios.delete(`https://backend-production-5264.up.railway.app/item/${id}`);
      setProducts(products.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus produk.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Navbar */}
      <header className="bg-blue-700 text-white p-4 flex justify-between items-center shadow">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="TokoPaEdi" className="w-8 h-8 rounded" />
          <span className="text-xl font-bold">TokoPaEdi</span>
        </div>
        <nav>
          <Link
            to="/"
            className="bg-white text-blue-700 px-4 py-2 rounded hover:bg-blue-100 transition"
          >
            Kembali ke Home
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <div className="px-6 py-10">
        <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">
          🎯 Daftar Produk Toko
        </h2>

        <div className="flex justify-center items-center space-x-4 mb-8">
          <input
            type="text"
            className="w-64 px-4 py-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan store_id"
            value={storeId}
            onChange={(e) => setStoreId(e.target.value)}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            onClick={fetchProducts}
          >
            Cari
          </button>
        </div>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada produk yang ditemukan.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 animate-fadeIn"
              >
                <img
                  src={item.image_url || "https://via.placeholder.com/400x300?text=No+Image"}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <h4 className="font-bold text-lg truncate mb-1">{item.name}</h4>
                  <p className="text-green-600 font-semibold">Rp{item.price.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Stok: {item.stock}</p>
                  <div className="flex gap-2 mt-4">
                    <Link
                      to={`/edit/${item.id}`}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProducts;
