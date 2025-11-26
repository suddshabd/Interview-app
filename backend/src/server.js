import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import cors from "cors"
import { serve } from "inngest/express"
import { inngest, functions } from "./lib/inngest.js";
import { clerkMiddleware } from "@clerk/express"
import { protectRoute } from "./middleware/protectRoute.js";
import chatRoutes from "./routes/chatRoutes.js"
import sessionRoutes from "./routes/sessionRoutes.js"

const app = express();

// proper __dirname when using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//  middleware
app.use(express.json())
//credentials ture=>server allows browser to include cookies 
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }))

app.use(clerkMiddleware());//this add auth to request :req.auth()

app.use("/api/inngest", serve({ client: inngest, functions }))
app.use("/api/chat", chatRoutes)
app.use("/api/sessions", sessionRoutes)

// Health check
app.get("/health", (req, res) => {
    req.auth();
    res.status(200).json({ msg: "success api is running good" });
});

// when you pass an array of middleware to Express ,it automatically flattens and executes them sequentially, one by one.
app.get("/video-calls", protectRoute, (req, res) => {
    res.status(200).json({ msg: "this is a protected route " });
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