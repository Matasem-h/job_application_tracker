// This is middleware to protect routes by verifying tokens
import jwt from "jsonwebtoken"

const authenticateToken = (req, res, next) => {
    // Obtaining the token from the authorization header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Example format: "Bearer TOKEN"

    // Denying access if no token is found
    if (!token) {
        return res.status(401).json({ message: "No token provided, access denied" });
    }
    // Verifying that the token is valid and not expired
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token is invalid or expired" });
        }
        req.user = user; // Attaching decoded user data to the request
        next(); // Moving on to the next function
    });
};

export default authenticateToken;