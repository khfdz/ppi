const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
require("express-async-errors");
const createError = require("http-errors");

const pool = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const momentRoutes = require('./routes/momentRoutes');
const monitoringCleaningRoutes = require('./routes/monitoringCleaningRoutes');
const monitoringGiziRoutes = require('./routes/monitoringGiziRoutes');
const { notFound, errorHandler } = require("./middlewares/handleError");

dotenv.config();
const app = express();

/* ======================================================
   ✅ CORS Configuration
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
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

/* ======================================================
   ✅ Body Parser
====================================================== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ======================================================
   ✅ Routes
====================================================== */
app.use('/api/auth', authRoutes);
app.use('/api/moment', momentRoutes);
app.use('/api/monitoring/cleaning', monitoringCleaningRoutes);
app.use('/api/monitoring/gizi', monitoringGiziRoutes);

/* ======================================================
   ❗ Route tidak ditemukan
====================================================== */
app.use(notFound);

/* ======================================================
   ❗ Error Handler Global
====================================================== */
app.use(errorHandler);

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
