import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateItem = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    image: null,
    store_id: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.store_id) {
      return alert("Nama, harga, dan ID toko wajib diisi.");
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("stock", form.stock || 0);
    formData.append("store_id", form.store_id);
    if (form.image) formData.append("image", form.image);

    try {
      const res = await axios.post("http://localhost:3000/item/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success || res.status === 201) {
        alert("Produk berhasil ditambahkan!");
        navigate("/");
      } else {
        alert("Gagal menambahkan produk.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-xl shadow-md p-8 space-y-5"
      >
        <h2 className="text-2xl font-bold text-gray-800">Tambah Produk</h2>

        <input
          type="text"
          name="store_id"
          placeholder="ID Toko (store_id)"
          className="input-clean"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="name"
          placeholder="Nama produk"
          className="input-clean"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Harga"
          className="input-clean"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stok"
          className="input-clean"
          onChange={handleChange}
          required
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          className="input-clean"
          onChange={handleChange}
        />

        <button type="submit" className="btn-green w-full">
          Simpan Produk
        </button>
      </form>
    </div>
  );
};

export default CreateItem;
