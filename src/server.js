import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getConnectDb } from "./config/db.js";

dotenv.config()
await getConnectDb()

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("Server is running 🚀"));

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on ${PORT}`)
})