import { useEffect, useState } from "react";
import axios from "axios";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("http://localhost:3000/transaction");
      if (res.data.success) {
        const userTransactions = res.data.payload.filter(t => t.user_id === user.id);
        setTransactions(userTransactions);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePay = async (id) => {
    try {
      const res = await axios.post(`http://localhost:3000/transaction/pay/${id}`);
      if (res.data.success) {
        alert("Pembayaran berhasil!");
        fetchTransactions();
      } else {
        alert(res.data.message || "Gagal membayar.");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat membayar.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/transaction/${id}`);
      if (res.data.success) {
        alert("Transaksi dihapus.");
        fetchTransactions();
      } else {
        alert(res.data.message || "Gagal menghapus.");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menghapus.");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Daftar Transaksi</h2>
      {transactions.length === 0 ? (
        <p>Tidak ada transaksi.</p>
      ) : (
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Item</th>
              <th className="p-2">Jumlah</th>
              <th className="p-2">Total</th>
              <th className="p-2">Status</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((trx) => (
              <tr key={trx.id} className="border-t">
                <td className="p-2">{trx.item.name}</td>
                <td className="p-2">{trx.quantity}</td>
                <td className="p-2">Rp{trx.total.toLocaleString()}</td>
                <td className="p-2">{trx.status}</td>
                <td className="p-2 space-x-2">
                  {trx.status === "pending" && (
                    <button
                      onClick={() => handlePay(trx.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                    >
                      Bayar
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(trx.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Transaction;
