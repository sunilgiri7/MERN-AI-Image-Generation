import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import diffusionRoutes from "./routes/diffusionRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/diffusion", diffusionRoutes);

app.get("/", async (req, res) => {
  res.send("Hello from Stabel-diffusion!");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URL);
    app.listen(8080, () =>
      console.log("Server listening on port  http://localhost:8080")
    );
  } catch (error) {
    console.log(error);
  }
};
startServer();
