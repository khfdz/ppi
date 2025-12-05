import React, { useEffect, useState } from "react";
import { getUser, logout } from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

export default function Home() {
  const user = getUser();
  const navigate = useNavigate();

  const [monitoring, setMonitoring] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  axiosInstance.get("/monitoring")
    .then(res => {
      setMonitoring(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error(err.response?.data || err);
      setLoading(false);
    });
}, []);




  return (
    <div className="p-6">
      <h1 className="text-2xl mb-2">🏠 Halaman Utama</h1>

      {user ? (
        <div>
          <p>
            Selamat datang, <b>{user.nama_unit}</b> ({user.role})
          </p>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded mt-2"
          >
            Logout
          </button>

          {/* SECTION: Monitoring Dashboard */}
          <h2 className="text-xl font-semibold mt-6 mb-3">📊 Monitoring</h2>

          {loading ? (
            <p>Loading data...</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {monitoring.map(item => (
                <div
                  key={item.id}

                onClick={() => navigate(`/user/monitoring/${item.kode}`)}

 
                  className="p-4 border rounded shadow hover:shadow-lg cursor-pointer transition"
                >
                  <h3 className="text-lg font-bold">{item.judul}</h3>
                  <p className="text-gray-600">{item.keterangan}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <Link to="/" className="text-blue-600">Login</Link>
      )}
    </div>
  );
}
