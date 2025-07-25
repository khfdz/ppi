const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

const register = async (req, res) => {
  try {
    const { nama_unit, role, password } = req.body;

    // Validation
    if (!nama_unit || !role || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Validate role
    const validRoles = ['admin', 'user', 'supervisor'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Must be: admin, user, or supervisor'
      });
    }

    // Check if user already exists
    const [existingUser] = await pool.execute(
      'SELECT user_id FROM user WHERE nama_unit = ?',
      [nama_unit]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user
    const [result] = await pool.execute(
      'INSERT INTO user (nama_unit, role, password) VALUES (?, ?, ?)',
      [nama_unit, role, hashedPassword]
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user_id: result.insertId,
        nama_unit,
        role
      }
    });

  } catch (error) {
    console.error('Register error:', error);
    
    // Handle specific MySQL errors
    if (error.code === 'ER_NO_SUCH_TABLE') {
      return res.status(500).json({
        success: false,
        message: 'Database table "user" not found. Please create the table first.'
      });
    }
    
    if (error.code === 'ER_BAD_FIELD_ERROR') {
      return res.status(500).json({
        success: false,
        message: 'Database column error. Please check table structure.'
      });
    }
    
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({
        success: false,
        message: 'Database connection refused. Please check database server.'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const { nama_unit, password } = req.body;

    // Validation
    if (!nama_unit || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    // Find user
    const [rows] = await pool.execute(
      'SELECT * FROM user WHERE nama_unit = ?',
      [nama_unit]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const user = rows[0];

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        user_id: user.user_id, 
        nama_unit: user.nama_unit, 
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          user_id: user.user_id,
          nama_unit: user.nama_unit,
          role: user.role
        }
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT user_id, nama_unit, role FROM user WHERE user_id = ?',
      [req.user.user_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    });
  }
};

module.exports = {
  register,
  login,
  getProfile
};
