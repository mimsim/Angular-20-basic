import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectDB } from './config/db';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();
        console.log('MongoDB connected');

        const server = app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });

        // 🔹 Graceful shutdown
        const shutdown = async (signal: string) => {
            console.log(`\n Received ${signal}. Closing server...`);

            server.close(async () => {
                console.log(' HTTP server closed.');

                try {
                    await mongoose.connection.close();
                    console.log(' MongoDB connection closed.');
                } catch (err) {
                    console.error('Error closing MongoDB:', err);
                }

                process.exit(0);
            });
        };

        process.on('SIGINT', () => shutdown('SIGINT'));   // Ctrl+C
        process.on('SIGTERM', () => shutdown('SIGTERM')); // system stop
        process.on('SIGQUIT', () => shutdown('SIGQUIT'));

    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
};

startServer();
