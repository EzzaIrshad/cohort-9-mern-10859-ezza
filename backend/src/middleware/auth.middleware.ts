import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt.js';
import logger from '../config/logger.js';

// --- Express middleware to guard protected routes via JWT validation ---
export const protect = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        try {
            // grab the raw JWT string
            const token = authHeader.split(' ')[1];
            const decoded = verifyToken(token);

            // Attach user payload to the request
            req.user = decoded;
            next();
        } catch (error) {
            logger.error(`Token Verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
            return res.status(401).json({ message: "Invalid or expired token." });
        }
    } else {
        logger.warn('Authorization header missing or malformed');
        return res.status(401).json({
            message: "Authorization token is missing.",
        });
    }

}