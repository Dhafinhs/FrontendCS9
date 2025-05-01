import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/user/register", form, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data.success) {
        alert(res.data.message || "Registrasi berhasil!");
        navigate("/login");
      } else {
        alert(res.data.message || "Registrasi gagal.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat registrasi.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow"
      >
        <h2 className="text-2xl font-bold text-blue700 mb-6 text-center">Daftar Akun</h2>

        <input
          type="text"
          name="name"
          placeholder="Nama"
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 rounded border border-blue300 focus:outline-none focus:ring-2 focus:ring-blue500"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 rounded border border-blue300 focus:outline-none focus:ring-2 focus:ring-blue500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-6 px-4 py-2 rounded border border-blue300 focus:outline-none focus:ring-2 focus:ring-blue500"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue600 hover:bg-blue700 text-white px-4 py-2 rounded font-semibold transition"
        >
          Register
        </button>

        <p className="text-sm text-gray-600 text-center mt-4">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-blue600 hover:underline">
            Login di sini
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
