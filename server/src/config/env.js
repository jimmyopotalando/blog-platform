const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config({ path: "./.env" });

const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
};

if (!ENV.MONGO_URI || !ENV.JWT_SECRET) {
  throw new Error("Missing required environment variables: MONGO_URI or JWT_SECRET");
}

module.exports = ENV;
