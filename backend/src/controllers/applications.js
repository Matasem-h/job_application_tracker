// Handles 
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/applications ---> Retrieving all applications for the logged-in user

export const getApplications = async (req, res) => {
    try {
        const applications = await prisma.application.findMany({
            where: { userId: req.user.id }, // sss
            include: { history: true}, /// sss
            orderBy: { applied: "desc"}, //sss
        });
        res.json(applications);
    } catch (error){
        res.status(500).json({message: "Server error while fetching applications."});
    }
};

// POST /api/applications ---> Creating a new job application
export const createApplication = async (req, res) => {
    const { company, role, location, url, contract, deadline, notes, priority } = req.body;
    try {
        const application = await prisma.application.create({
            data: {
                company,
                role,
                location,
                url,
                contact,
                deadline: deadline ? new Date(deadline) : null, // sss
                notes,
                priority: priority || false,
                uderId: req.user.id, // sss
            },
        });
        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: "Server error while creating the application."})
    }
};

// GET /api/applications/:id ---> Retrieving a single application by ID
export const getApplicationById = async (req, res) => {
    try {
        const application = await prisma.application.findFirst({
            where: {
                id: parseInt(req.params.id), // sss
                userId: req.user.id, // sss
            },
            include: { history: true }, // sss
        });

        if (!application) {
            return res.status(404).json({ message: "Application not found."});
        }
        
        res.json(application);
    } catch (error) {
        res.status(500).json({ message: "Server error while fetching the application. "});
    }
};





















































