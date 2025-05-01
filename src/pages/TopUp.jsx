import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TopUp = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Nominal harus angka lebih dari 0.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "https://backend-production-5264.up.railway.app/user/topUp",
        {
          id: user.id,
          amount: Number(amount),
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success) {
        alert("Top up berhasil!");
        const updatedUser = res.data.payload;
        localStorage.setItem("user", JSON.stringify(updatedUser));
        navigate("/");
      } else {
        alert(res.data.message || "Top up gagal.");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat top up.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          Top Up Saldo
        </h2>

        <input
          type="number"
          placeholder="Masukkan nominal (Rp)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition"
        >
          {loading ? "Memproses..." : "Top Up Sekarang"}
        </button>

        <p
          className="text-sm text-center text-blue-500 mt-4 cursor-pointer hover:underline"
          onClick={() => navigate("/")}
        >
          Kembali ke Beranda
        </p>
      </form>
    </div>
  );
};

export default TopUp;
