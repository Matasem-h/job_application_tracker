// This file defines all routes for the job application CRUD operations
import express from "express";
import authenticateToken from "../middleware/auth.js";
import {
    getApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication,
    getStats,
} from "../controllers/applications.js";

const router = express.Router();

// All routes below require a valid JWT token
router.use(authenticateToken);

// GET Operation ---> Retrieves dashboard statistics
router.get("/stats", getStats);

// GET Operation ---> Retrieves all applications
router.get("/", getApplications);

// GET Operation ---> Retrieves a single application
router.get("/:id", getApplicationById);

// POST Operation ---> Creates a new application
router.post("/", createApplication);

// PUT Operation ---> Updates an application
router.put("/:id", updateApplication);

// Delete Operation ---> Deletes an application
router.delete("/:id", deleteApplication);

export default router;


