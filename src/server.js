import app from "./app.js";
import dotenv from "dotenv";
import { connectToDB } from "./config/database.js";

dotenv.config();

const port = process.env.PORT ;

connectToDB();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});