import express from "express";
import "dotenv/config";
import cors from "cors";
import authRouter from "./routes/auth.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRouter);

export default app;
