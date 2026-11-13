const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const PortfolioData = require('./models/PortfolioData');
const Message = require('./models/Message');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));

// In-Memory fallback store if MongoDB is not connected yet
let inMemoryPortfolio = null;
let inMemoryMessages = [];

// Connect to MongoDB Atlas if MONGODB_URI is provided
const MONGODB_URI = process.env.MONGODB_URI;

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000
  })
  .then(() => {
    console.log('✅ Successfully connected to MongoDB Atlas!');
  })
  .catch((err) => {
    console.warn('⚠️ MongoDB connection error:', err.message);
    console.log('ℹ️ Running in memory/offline mode until MONGODB_URI is updated.');
  });
} else {
  console.log('ℹ️ MONGODB_URI is not set. Add your connection string in server/.env to enable MongoDB Atlas persistence.');
}

// ---------------- API ROUTES ----------------

// Health Check
app.get('/api/health', (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;
  res.json({
    status: 'ok',
    database: isDbConnected ? 'connected' : 'disconnected',
    databaseType: isDbConnected ? 'MongoDB Atlas' : 'In-Memory / Local Storage',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// GET Portfolio Data
app.get('/api/portfolio', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      let doc = await PortfolioData.findOne().sort({ updatedAt: -1 });
      if (doc) {
        return res.json({ success: true, data: doc, source: 'mongodb' });
      }
    }

    if (inMemoryPortfolio) {
      return res.json({ success: true, data: inMemoryPortfolio, source: 'memory' });
    }

    res.json({ success: false, message: 'No database record found; using client defaults.' });
  } catch (err) {
    console.error('Error fetching portfolio:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT Portfolio Data (Save updates from Admin CMS)
app.put('/api/portfolio', async (req, res) => {
  try {
    const updatedData = req.body;
    inMemoryPortfolio = updatedData;

    if (mongoose.connection.readyState === 1) {
      let doc = await PortfolioData.findOne();
      if (doc) {
        Object.assign(doc, updatedData);
        await doc.save();
      } else {
        doc = await PortfolioData.create(updatedData);
      }
      return res.json({ success: true, message: 'Portfolio saved to MongoDB Atlas!', data: doc, source: 'mongodb' });
    }

    res.json({ success: true, message: 'Portfolio saved in server memory (MongoDB Atlas not configured).', data: inMemoryPortfolio, source: 'memory' });
  } catch (err) {
    console.error('Error updating portfolio:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST Contact Message (From contact form or hire modal)
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, service, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
    }

    const newMsg = {
      name,
      email,
      subject: subject || 'General Inquiry',
      service: service || 'General',
      message,
      createdAt: new Date()
    };

    if (mongoose.connection.readyState === 1) {
      const savedDoc = await Message.create(newMsg);
      console.log(`📩 New message saved to MongoDB from ${name} (${email})`);
      return res.status(201).json({ success: true, message: 'Message received and saved to MongoDB!', data: savedDoc });
    }

    inMemoryMessages.unshift({ id: Date.now().toString(), ...newMsg });
    console.log(`📩 New message received in memory from ${name} (${email})`);
    res.status(201).json({ success: true, message: 'Message received!', data: inMemoryMessages[0] });
  } catch (err) {
    console.error('Error submitting contact message:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET Messages (For Admin CMS Inbox)
app.get('/api/messages', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const messages = await Message.find().sort({ createdAt: -1 });
      return res.json({ success: true, data: messages, count: messages.length, source: 'mongodb' });
    }

    res.json({ success: true, data: inMemoryMessages, count: inMemoryMessages.length, source: 'memory' });
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE Message
app.delete('/api/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      await Message.findByIdAndDelete(id);
      return res.json({ success: true, message: 'Message deleted from MongoDB.' });
    }

    inMemoryMessages = inMemoryMessages.filter(m => m.id !== id && m._id !== id);
    res.json({ success: true, message: 'Message deleted.' });
  } catch (err) {
    console.error('Error deleting message:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST Admin Login Verification
app.post('/api/auth/login', (req, res) => {
  const { passcode } = req.body;
  const validPasscode = process.env.ADMIN_PASSCODE || 'admin123';

  if (passcode === validPasscode) {
    return res.json({ success: true, token: 'auth-session-valid-token' });
  }

  res.status(401).json({ success: false, error: 'Incorrect admin passcode.' });
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Portfolio Express backend running on http://localhost:${PORT}`);
});
