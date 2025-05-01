import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo-tulis.png";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return alert("Email dan password wajib diisi.");
    }

    try {
      const res = await axios.post(
        `http://localhost:3000/user/login?email=${form.email}&password=${form.password}`
      );

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.payload));
        alert("Login berhasil!");
        navigate("/");
      } else {
        alert(res.data.message || "Login gagal.");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat login.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-md"
      >
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="TokoPaEdi Logo" className="w-32 h-32 mb-2" />
          <h1 className="text-2xl font-bold text-blue-700">Masuk Akun</h1>
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-6 px-4 py-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition"
        >
          Login
        </button>

        <p className="text-sm text-gray-600 text-center mt-4">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Daftar di sini
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
