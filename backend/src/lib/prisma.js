// Creates and exports a single shared Prisma client instance
import "dotenv/config";
import { PrismaClient } from "../../generated/prisma/index.js";
import { PrismaPg } from "@prisma/adapter-pg";

// Create PostgreSQL adapter using the connection URL from .env
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

// Create and export the Prisma client using the adapter
const prisma = new PrismaClient({ adapter });

export default prisma;