import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { error } from "console";

const app = express();

// proper __dirname when using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({ msg: "success api is running good" });
});

// ---- Serve frontend in production ----
if (ENV.NODE_ENV === "production") {
    // __dirname is backend/src -> go up one to backend, then to frontend/dist
    const frontendPath = path.join(__dirname, "../../frontend/dist");

    // serve static assets (js, css, images, etc.)
    app.use(express.static(frontendPath));

    // SPA fallback: any non-API route returns index.html
    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
}

// ---- Start server ----



const startServer = async () => {
    try {
        if (!ENV.DB_URL) {
            throw new error("DB_URL is not defined in environment variables")
        }
        await connectDB();
        app.listen(ENV.PORT, () => {
            console.log("Server is running on port", ENV.PORT);

        });
    } catch (error) {
        console.error("Error starting the server ❌", error)
    }
}
startServer()