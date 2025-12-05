import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { setAuth } from "../utils/auth";

export default function Login() {
  const [nama_unit, setNamaUnit] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post("/auth/login", {
        nama_unit,
        password,
      });

      setAuth(res.data.data);
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Login gagal: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow-md w-80 flex flex-col gap-3"
      >
        <h2 className="text-lg font-semibold text-center mb-2">Login</h2>
        <input
          type="text"
          placeholder="Nama Unit"
          value={nama_unit}
          onChange={(e) => setNamaUnit(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
