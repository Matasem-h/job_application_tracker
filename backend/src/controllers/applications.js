// This file handles all CRUD operations for job applications
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET Operation ---> Retrieves all applications for the current user
export const getApplications = async (req, res) => {
    try {
        const applications = await prisma.application.findMany({
            where: { userId: req.user.id }, // Ensures that only the user's applications are returned
            include: { history: true}, /// Include the status history of each application 
            orderBy: { appliedAt: "desc"}, // Display newest application first
        });
        res.json(applications);
    } catch (error){
        res.status(500).json({message: "Server error while fetching applications."});
    }
};

// POST operation ---> Creates a new job application
export const createApplication = async (req, res) => {
    const { company, role, location, url, contact, deadline, notes, priority } = req.body;
    try {
        const application = await prisma.application.create({
            data: {
                company,
                role,
                location,
                url,
                contact,
                deadline: deadline ? new Date(deadline) : null,
                notes,
                priority: priority || false,
                userId: req.user.id,
            },
        });
        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: "Server error while creating the application."});
    }
};

// GET operation ---> Retrieves a single application by its ID
export const getApplicationById = async (req, res) => {
    try {
        const application = await prisma.application.findFirst({
            where: {
                id: parseInt(req.params.id),
                userId: req.user.id,
            },
            include: { history: true },
        });

        if (!application) {
            return res.status(404).json({ message: "Application not found." });
        }
        
        res.json(application);
    } catch (error) {
        res.status(500).json({ message: "Server error while fetching the application." });
    }
};

// PUT Operation ---> Updates an existing application
export const updateApplication = async (req, res) => {
    const { company, role, location, url, contact, deadline, notes, priority, stage } = req.body;
    try {
        // Confirming the existence of the application and that it belongs to the user
        const existing = await prisma.application.findFirst({
            where: {id: parseInt(req.params.id), userId: req.user.id },
        });
        
        if (!existing) {
            return res.status(404).json({ message: "Application not found." });
        }

        // Logging status history if the application stage changed
        if (stage && stage !== existing.stage) {
            await prisma.statusHistory.create({
                    data: {
                        stage,
                        applicationId: existing.id,
                    },
                });
            }

        // Updating the application using new data
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
        res.status(500).json({ message: "Server error while updating application." });
    }
};

// DELETE Operation ---> Deletes an application
export const deleteApplication = async (req, res) => {
    try {
        // Confirming the existence of the application and that it belongs to the user
        const existing = await prisma.application.findFirst({
            where: { id: parseInt(req.params.id), userId: req.user.id },
        });

        if (!existing) {
            return res.status(404).json({ message: "Application not found." });
        }

        // Deleting status history
        await prisma.statusHistory.deleteMany({
            where: { applicationId: existing.id },
        });

        // Deleting the application
        await prisma.application.delete({
            where: { id: existing.id },
        });

        res.json({ message: "Application deleted successfully."});
    } catch (error) {
        res.status(500).json({ message: "Server error while deleting the application"});
    }
};

// GET Operation ---> Retrieves several dashboard statistics 
export const getStats = async (req, res) => {
    try {
        const applications = await prisma.application.findMany({
            where: { userId: req.user.id },
        });

        // Calculating statistics from the application data
        const total = applications.length;
        const applied = applications.filter(a => a.stage === "APPLIED").length;
        const interview = applications.filter(a => a.stage === "INTERVIEW").length;
        const offer = applications.filter(a => a.stage === "OFFER").length;
        const rejected = applications.filter(a => a.stage === "REJECTED").length;
        const responseRate = total > 0 ? Math.round((interview + offer) / total * 100) : 0;

        res.json({ total, applied, interview, offer, rejected, responseRate });
    } catch (error) {
        res.status(500).json({ message: "Server error while fetching stats." })
    }
};


