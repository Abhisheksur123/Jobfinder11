

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";

import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

import dbConnection from "./dbConfig/dbConnection.js";
import router from "./routes/index.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import mongoose from 'mongoose';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8800;
const uri = 'mongodb://localhost:27017/your-database-name';

// Connect to MongoDB
mongoose.connect(uri);

// MONGODB CONNECTION
// dbConnection(); // Choose one method for consistency

// Middlewares
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(xss());
app.use(mongoSanitize());
app.use(morgan("dev"));

// Routes
app.use(router);

// Error middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Dev Server running on port: ${PORT}`);
});
