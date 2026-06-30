import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';

// Inject environment credentials immediately upon execution
dotenv.config()

const PORT = process.env.PORT || 5000;
// ------------------------------------------------
// ------------------------------------------------

// Connect to MongoDB Database Pool
const runServer = async () => {
    try {
        await connectDB();

        const server = app.listen(PORT, () => {
            console.log(`🟢 StayAI Server successfully running in [${process.env.NODE_ENV || 'development'}] mode on port ${PORT}`);
        })

        // Graceful Shutdown on System Termination signals (e.g., Vercel container recycling)
        process.on('SIGTERM', () => {
            console.log('⚠️ SIGTERM received. Shutting down database sockets and active processes gracefully...')

            server.close(() => {
                console.log('🏁 Server process cleanly terminated.');
            })
        })

    } catch (error) {
        console.error(`🔴 Server run terminated due to structural connection failures: ${error.message}`);
        process.exit(1);
    }
}


// Catch completely unhandled code anomalies without leaving zombie thread processes open
process.on('uncaughtException', (err) => {
    console.error(`🔴 CRITICAL UNCAUGHT EXCEPTION: ${err.message}`);
    console.error(err.stack);
    process.exit(1);
})


process.on('unhandledRejection', (err) => {
    console.error(`🔴 UNHANDLED PROMISE REJECTION: ${err.message}`);
    process.exit(1);
})


runServer()
