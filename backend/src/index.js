import express from "express";
import cors from "cors";
import dotnev from "dotenv";
import authRoutes from "authRoutes";
import applicationRoutes from "applicationRoutes";

// Loading environmental variables from the .env file
dotnev.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware that executes during the request-response cycle
app.use(cors()); // Allow requests from the frontend
app.use(express.json()); // Parse (convert) raw json text into an object

// Routing that defines application response to client requests
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);

// Checking health status to see if the application is running correctly
app.get("/api/health", (req, res) => {
    res.json({ status: "Server is running" });
});

// Starting the server
app.lisen(PORT, () => {
    console.log("Server is running on port ${PORT}");
});




