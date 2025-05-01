import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    image: null,
  });

  useEffect(() => {
    axios.get(`https://backend-4vhu.vercel.app/item/byId/${id}`)
      .then((res) => {
        const item = res.data.payload;
        setForm({
          name: item.name,
          price: item.price,
          stock: item.stock,
          image: null,
        });
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    if (form.image) formData.append("image", form.image);

    try {
      const res = await axios.put("https://backend-4vhu.vercel.app/item", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        alert("Berhasil update produk");
        navigate("/my-products");
      } else {
        alert("Gagal update");
      }
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan perubahan.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-xl shadow-md p-8 space-y-5"
      >
        <h2 className="text-2xl font-bold text-gray-800">Edit Produk</h2>

        <input
          type="text"
          name="name"
          placeholder="Nama produk"
          className="input-clean"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Harga"
          className="input-clean"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stok"
          className="input-clean"
          value={form.stock}
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

        <button type="submit" className="btn-green w-full">Simpan Perubahan</button>
      </form>
    </div>
  );
};

export default UpdateItem;
