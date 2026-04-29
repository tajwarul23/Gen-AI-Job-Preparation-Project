import express from "express";
import authRouter from "./Routes/auth.route.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());

//auth Router
app.use("/api/auth", authRouter);

export default app;
