import express from "express";
import authRouter from "./Routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import interviewRouter from "./Routes/interview.route.js";
import resumeRouter from "./Routes/resume.route.js"
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:["https://preplab-project.vercel.app"],
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
