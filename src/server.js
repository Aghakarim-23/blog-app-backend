import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getConnectDb } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import cookieParser from "cookie-parser";
import postRoutes from "./routes/postRoutes.js"


dotenv.config()
await getConnectDb()

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(cookieParser());

app.get("/", (req, res) => res.send("Server is running 🚀"));

app.use("/api/auth/", authRoutes)
app.use("/api/posts", postRoutes)  

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on ${PORT}`)
})