import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import connectDb from "./config/db";
// import authRoutes from "./routes/user.route";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// connectDb();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is running");
});

// app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server started on PORT = ${PORT}`);
});
