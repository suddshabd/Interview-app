// import express from "express"
// import path from "path"
// import { ENV } from "./lib/env.js";


// const app = express();

// const __dirname = path.resolve();

// app.get("/health", (req, res) => {
//     res.status(200).json({ msg: "success api is running good " })
// })
// //make our app ready for production
// if (ENV.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../frontend/dist")));
//     app.get("/{*any}", (req, res) => {
//         res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
//     });
// }
// app.listen(3000, () => console.log(`Server is running on port ${ENV.PORT}`))
// backend/src/server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { ENV } from "./lib/env.js";

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
const PORT = ENV.PORT || process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});