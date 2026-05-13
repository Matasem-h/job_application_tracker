// This file is responsible for registration and login logic

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Registering a new user
export const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Checking if the user's email already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered." });
        }

        // Hashing the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user in the database
        const user = await prisma.user.create({
            data: { email, password: hashedPassword },
        });

        res.status(201).json({ message: "Account successfully created." });
    } catch (error) {
        res.status(500).json({ message: "Server encountered an error during registration." })
    }
};

// Logging as an existing user
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verifying that the user exists
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        // Comparing the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password." })
        }

        // Generate JWT token that is valid for 7 days
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" },
        );

        res.json({ token, user: { id: user.id, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: "Server error during login." })
    }
};


