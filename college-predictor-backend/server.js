const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

require("dotenv").config();

const userRoutes = require("./routes/users");
const collegeRoutes = require("./routes/colleges");
const collegeListRoutes = require("./routes/collegeList");
const counsellingRoutes = require("./routes/counselling");
const contactRoutes = require("./routes/contact");

const app = express();

// CORS Configuration for production
const corsOptions = {
  origin: process.env.FRONTEND_URL || "*",
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "College Predictor API is running",
    version: "1.0.0",
    status: "healthy"
  });
});

app.get("/health", (req, res) => {
  res.json({ 
    status: "healthy",
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

// Rate Limiting Middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP. Please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/colleges", collegeRoutes);
app.use("/api/college-list", collegeListRoutes);
app.use("/api/counselling", counsellingRoutes);
app.use("/api/contact", contactRoutes);

// Backward compatibility route
app.use("/users", userRoutes);
// DB Connection with better error handling
let isDbConnected = false; // Cache connection state for serverless instances

const connectDB = async () => {
  try {
    if (isDbConnected && mongoose.connection.readyState === 1) {
      return;
    }
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    isDbConnected = mongoose.connection.readyState === 1;
    console.log("✅ Connected to MongoDB successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    console.log("\n🔧 SOLUTIONS:");
    console.log("1. Check your internet connection");
    console.log("2. Whitelist your IP address in MongoDB Atlas:");
    console.log("   - Go to: https://cloud.mongodb.com/");
    console.log("   - Navigate to Network Access");
    console.log("   - Add your current IP address or use 0.0.0.0/0 for all IPs");
    console.log("3. Verify your MONGO_URI environment variable");

    // In serverless (Vercel), do NOT exit the process
    if (process.env.NODE_ENV === 'production' && !process.env.VERCEL) {
      console.error('Failed to connect to MongoDB in production. Exiting...');
      process.exit(1);
    }

    // Retry connection after 5 seconds in development
    if (process.env.NODE_ENV !== 'production') {
      console.log("\n🔄 Retrying connection in 5 seconds...");
      setTimeout(() => {
        connectDB();
      }, 5000);
    }
  }
};


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    if (process.env.NODE_ENV !== 'production') {
      console.log(`📱 Frontend should be running on: http://localhost:5173`);
    }
  });
};

// Connect to database and start server
connectDB();
// Only start a local server if not running on Vercel serverless
if (!process.env.VERCEL) {
  startServer();
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  mongoose.connection.close();
  process.exit(0);
});

// Export for serverless platforms (Vercel)
module.exports = app;
