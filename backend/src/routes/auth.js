// Defining authentication routes for registering and logging
import express from "express";
import { register, login } from "../controllers/auth.js";

const router = express.Router();

// POST /api/auth/register ---> Creating a new user
router.post("/register", register);

// POST /api/auth/login ---> Logging in and getting a JWT token
router.post("/login", login);

export default router;


