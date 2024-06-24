import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

export default app;
