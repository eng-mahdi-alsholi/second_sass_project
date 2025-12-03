import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { clerkMiddleware } from "@clerk/express";
import { clerkClient, requireAuth, getAuth } from "@clerk/express";
import cors from "cors";
import aiRouter from "./routes/aiRoutes.js";
import connectCloudinary from "./configs/Cloudinary.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
await connectCloudinary();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.get("/", async (_, res) => {
  res.json({ message: "OK" });
});

app.use(requireAuth());

app.use("/api/ai", aiRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
