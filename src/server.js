import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 8001


app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`)
})