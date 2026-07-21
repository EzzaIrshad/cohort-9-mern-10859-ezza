import mongoose from 'mongoose'
import logger from './logger.js';

// --- Establishes MongoDB connection ---
const connectDb = async () => {
    const uri = process.env.MONGODB_URI;
    try {
        if (!uri) {
            logger.error('MONGODB_URI is not defined');
            process.exit(1);
        }

        // Connect specifically to target database
        await mongoose.connect(uri, {
            dbName: 'notes-app',
        })

        logger.info('Database connected successfully!')
    } catch (err) {
        if (err instanceof Error) {
            logger.error(`Database connection crash: ${err.message}`);
        } else {
            logger.error("Database connection crash: Unknown error");
        }

        // --- kill the process since the app can't function without DB access ---
        process.exit(1);
    }
}

export default connectDb;