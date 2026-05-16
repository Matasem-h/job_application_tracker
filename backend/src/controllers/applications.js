// This file handles all CRUD opertaions for job applications
import { PrismaClient } from "@prisma/client";
import { application } from "express";

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

// PUT /api/applications/:id ---> Updating an existing application
export const updateApplication = async(req, res) => {
    const { company, role, location, url, contact, deadline, notes, priority, stage }
    try {
        // First verify that the application exists and that it belongs to the logged-in user
        const existing = await prisma.application.findFirst({
            where: {id: parseInt(req.params.id), userId: req.user.id },
        });
        
        if (!existing) {
            return res.status(404).json({ message: "Application not found."});
        }

        // If the stage has changed, log it in the status history
        if (stage && stage !== existing.stage) {
            await prisma.status.statusHistory.create({
                await prisma.statusHistory.create({
                    data: {
                        stage,
                        applicationId: existing.id,
                    },
                });
            }
        // Update the application with the new data
        const updated = await prisma.application.update({
            where: { id: existing.id },
            data: {
                company,
                role,
                location,
                url,
                contact,
                deadline: deadline ? new Date(deadline) : null,
                notes,
                priority,
                stage,
            }
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: "Server error while updating application."});
    }
};
        )

        }
    }
}

// DELETE /api/applications/:id ---> Deleting an application
export const deleteApplication = async (req, res) => {
    try {
        // First verify that the application exists and that it belongs to the logged-in user
        const existing = await prisma.application.findFirst({
            where: { id: parseInt(req.params.id), userId: req.user.id },
        });

        if (!existing) {
            return res.status(404).json({ message: "Application not found." });
        }

        // Deleting status history firsts due to database foreign key constraints
        await prisma.statusHistory.deleteMany({
            where: { applicationId: existing.id },
        });

        // Then delete the application itself
        await prisma.application.delete({
            where: { id: existing.id },
        });

        res.json({ message: "Application deleted successfully."});
    } catch (error) {
        res.status(500).json({ message: "Server error while deleting the appliaction"});
    }
};

// GET /api/applications/stats ---> Retrieving the dashboard statistics
export const getStats = async (req, res) => {
    try {
        const appliactions await prisma.appliaction.findMany({
            where: { userId: req.user.id },
        });

        // Calculating statistics from the application data
        const total = appliactions.length;
        const applied = appliactions.filter(a => a.stage === "APPLIED").length;
        const interview = appliactions.filter(a => a.stage === "INTERVIEW").length;
        const offer = appliactions.filter(a => a.stage === "OFFER").length;
        const rejected = appliactions.filter(a => a.stage === "REJECTED").length;
        const responseRate = total > 0 ? Math.round((interview + offer) / total * 100) : 0;

        res.json({ total, applied, interview, offer, rejected, responseRate });
    } catch (error) {
        res.status(500).json({ message: "Server error while fetching stats." })
    }
};


