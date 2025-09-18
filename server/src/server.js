// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import morgan from 'morgan';

// import authRoutes from './routes/authRoutes.js';
// import notesRoutes from './routes/notesRoutes.js';
// import adminRoutes from './routes/adminRoutes.js';

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(morgan('dev'));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/notes', notesRoutes);
// app.use('/api/admin', adminRoutes);

// app.get("/", (req, res) => {
//   res.send("✅ Server is running");
// });

// // 404 handler
// app.use((req, res, next) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(res.statusCode || 500).json({
//     message: err.message || 'Server Error',
//   });
// });

// // Connect to MongoDB & start server
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('MongoDB connected');
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch((err) => console.error('MongoDB connection error:', err));

// src/server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/authRoutes.js';
import notesRoutes from './routes/notesRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/admin', adminRoutes);

app.get("/", (req, res) => {
  res.send("✅ Server is running");
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(res.statusCode || 500).json({
    message: err.message || 'Server Error',
  });
});

// MongoDB connection (reuse for serverless)
let conn = null;
async function connectDB() {
  if (conn) return conn;
  conn = await mongoose.connect(process.env.MONGO_URI);
  return conn;
}

// Export as serverless function
export default async function handler(req, res) {
  await connectDB(); // ensure MongoDB is connected
  return app(req, res);
}
