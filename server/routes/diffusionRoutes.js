import express from "express";
import dotenv from "dotenv"; // Corrected import statement
import Replicate from "replicate";

dotenv.config();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Hello from stable diffusion");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Convert prompt string to object format
    const input = { prompt };

    const output = await replicate.run(
      "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
      { input }
    );

    res.status(200).send(output);
    console.log(output);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating image");
  }
});

export default router;
