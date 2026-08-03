import { Request, Response } from 'express';
import User from '../models/user.model.js';
import { LoginInput, loginSchema, RegisterInput, registerSchema } from '../validations/auth.validation.js'
import { hashPassword, matchPassword } from '../utils/hash.js';
import { generateToken } from '../utils/jwt.js';
import logger from '../config/logger.js';
import z, { ZodError } from 'zod';
import { clearAuthCookie, setAuthCookie } from '../utils/cookies.js';

// --- Register User Controller ---
export const registerUser = async (req: Request, res: Response) => {
    try {
        // Validate request payload against Zod schema
        const data: RegisterInput = registerSchema.parse(req.body);

        const userExists = await User.findOne({ email: data.email });

        if (userExists) {
            return res.status(400).json({ message: "That email is already in use!" });
        }

        // create new user
        const newUser = new User({
            fullName: data.fullName,
            email: data.email,
            password: await hashPassword(data.password), // Hash sensitive credentials
        })

        await newUser.save();

        // Generate JWT token
        const token = generateToken({ userId: newUser._id.toString(), email: newUser.email });

        // Set HttpOnly Cookie
        setAuthCookie(res, token);

        return res.status(201).json({
            success: true,
            message: "Registered successfully.",
            data: {
                user: {
                    id: newUser._id,
                    fullName: newUser.fullName,
                    email: newUser.email
                }
            },
        });

    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: z.treeifyError(error),
            });
        }

        logger.error(error);

        return res.status(500).json({ message: "Internal server error" });
    }
}

// --- Login User Controller ---
export const loginUser = async (req: Request, res: Response) => {
    try {
        const data: LoginInput = loginSchema.parse(req.body);

        // Fetch target account
        const user = await User.findOne({ email: data.email });

        if (!user) {
            logger.warn("Login failed: invalid credentials");
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Verify provided password against hashed database password
        const isMatch = await matchPassword(data.password, user.password);

        if (!isMatch) {
            logger.warn("Login failed: invalid credentials");
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Issue session token on successful verification
        const token = generateToken({ userId: user._id.toString(), email: user.email });

        logger.info({ userId: user._id }, "User authenticated successfully");

        // Set HttpOnly Cookie
        setAuthCookie(res, token);

        return res.json({
            success: true,
            message: "Logged in successfully.",
            data: {
                user: {
                    id: user._id.toString(),
                    fullName: user.fullName,
                    email: user.email
                }
            }
        })

    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: z.treeifyError(error),
            });
        }

        logger.error(error);

        return res.status(500).json({ message: "Internal server error" });
    }
}

// --- Get Current Profile Controller ---
export const getCurrentUser = async (req: Request, res: Response) => {
    // Return payload attached by authentication middleware
    res.status(200).json(req.user);
}

// --- User logout Controller ---
export const logoutUser = async (req: Request, res: Response) => {
    clearAuthCookie(res);

    return res.status(200).json({
        success: true,
        message: "Logged out successfully."
    });
};