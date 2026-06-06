import express from "express";
import authRouter from "./Routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import interviewRouter from "./Routes/interview.route.js";
import resumeRouter from "./Routes/resume.route.js"

const app = express();

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = process.env.NODE_ENV === "production" ? ["https://preplab-ai.vercel.app"] : "http://192.168.0.100:5173";

app.use(cors({
    origin:allowedOrigins,
    credentials:true
}))

app.get("/", (req, res) => {
   res.send("Backend works");
});
//auth Router
app.use("/api/auth", authRouter);

//interview Router
app.use("/api/interview", interviewRouter);

//resume router
app.use("/api/resume", resumeRouter)


export default app;
