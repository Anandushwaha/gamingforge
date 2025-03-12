import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import cors from "cors";

env.config();
connectDB();
app.use(
  cors({
    origin: "http://127.0.0.1:5500", // Allow your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed request methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);
dot;
const app = express();
app.use(express.json());
app.use(cors());
import router from "./routes/authRoutes.js";
app.use("/api/auth", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
