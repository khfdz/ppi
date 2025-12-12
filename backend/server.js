const { notFound, errorHandler } = require("./middlewares/handleError");


const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./config/db'); // koneksi MySQL
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();

/* ======================================================
   ✅ CORS Configuration — HARUS SEBELUM ROUTES
====================================================== */
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:6789',
      'http://localhost:6969',
      'http://192.168.10.184:6969',
      'http://192.168.10.184:6789',
      'http://192.168.1.114',
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('❌ Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

/* ======================================================
   ✅ Middleware utama
====================================================== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ======================================================
   ✅ Routes
====================================================== */
app.use('/api/auth', authRoutes);


/* ======================================================
   ✅ Health Check & Root
====================================================== */
app.get('/api/health', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT NOW() AS server_time');
    res.json({
      status: 'OK',
      database: 'Connected',
      time: rows[0].server_time,
      message: 'Server & Database aktif 🚀',
    });
  } catch (err) {
    res.json({
      status: 'OK',
      database: 'Disconnected ⚠️',
      message: 'Server aktif tapi database gagal terkoneksi',
    });
  }
});

app.get('/', (req, res) => {
  res.send(`
    <h2>🚀 API Server is Running</h2>
    <p>Environment: <b>${process.env.NODE_ENV || 'development'}</b></p>
    <p>Database: <b>${process.env.DB_NAME || 'Not set'}</b></p>
    <hr/>
    <p>Routes aktif:</p>
    <ul>
      <li>✅ /api/auth</li>
      <li>✅ /api/monitoring</li>
      <li>✅ /api/tipe</li>
      <li>✅ /api/monitoring-indikator</li>
      <li>✅ /api/health</li>
    </ul>
  `);
});

/* ======================================================
   ✅ Error Handler & 404
====================================================== */
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong on the server.' });
});

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

/* ======================================================
   ✅ Jalankan Server
====================================================== */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('----------------------------------------');
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🗄️  Database: ${process.env.DB_NAME || 'db_ppi'}`);
  console.log('----------------------------------------');
});

const createError = require("http-errors");


app.use(notFound);
app.use(errorHandler);