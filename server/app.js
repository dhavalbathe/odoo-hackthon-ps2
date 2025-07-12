const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Allow CORS from Vite frontend (localhost:5173)
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// Sample route
app.get('/', (req, res) => {
  res.json({message: "Server is running at 3000"})
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
