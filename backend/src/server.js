import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { ENV } from "./lib/env.js";

const app = express();

// Correct __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({ msg: "API is running properly" });
});

// Serve frontend in production
if (ENV.NODE_ENV === "production") {
    const frontendPath = path.join(__dirname, "../frontend/dist");

    app.use(express.static(frontendPath));

    // Correct wildcard route
    app.get("*", (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
}



app.listen(
    console.log(`Server running on port ${ENV.PORT}`)
);
