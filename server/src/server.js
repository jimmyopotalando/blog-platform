const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorHandler");

// Load environment variables
dotenv.config({ path: "./.env" });

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" })); // Allow frontend origin
app.use(morgan("dev")); // Logging

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api", require("./routes/commentRoutes")); // mergedParams handles /posts/:id/comments

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Blog Platform API is running..." });
});

// Error handling middleware
app.use(errorHandler);

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
