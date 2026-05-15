import express from "express";
import authRouter from "./Routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import interviewRouter from "./Routes/interview.route.js";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://192.168.0.106:5173",
    credentials:true
}))

app.get("/", (req, res) => {
   res.send("Backend works");
});
//auth Router
app.use("/api/auth", authRouter);

//interview Router
app.use("/api/interview", interviewRouter);

export default app;
