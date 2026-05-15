import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import { connectToDB } from "./config/database.js";




const port = process.env.PORT ;


connectToDB();

app.listen(port,"0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});