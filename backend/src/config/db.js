import mongoose from 'mongoose'


const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI

    if (!mongoUri) {
        console.error('🔴 MONGO_URI is missing from environment variables.')
        process.exit(1)
    }

    // Production-grade connection pooling and resilience options
    const mongooseOptions = {
        autoIndex: true, // Build indexes natively (de-optimize in extreme load, keep on for SaaS startup)
        maxPoolSize: 10, // Maintain up to 10 open socket connections
        serverSelectionTimeoutMS: 5000, // Fail fast after 5 seconds if DB is unreachable
        socketTimeoutMS: 45000, // Close inactive sockets after 45 seconds
        family: 4 // Force IPv4 routing to prevent DNS resolution delays
    }

    try {
        const conn = await mongoose.connect(mongoUri, mongooseOptions);
        console.log(`🟢 MongoDB Connected Safely: ${conn.connection.host}`);
    } catch (error) {
        console.error(`🔴 MongoDB Connection Error: ${error.message}`);
        // Let the calling server.js handle the graceful exit process
        throw error;
    }


    // Lifecycle Connection Listeners
    mongoose.connection.on('disconnected', () => {
        console.warn('⚠️ MongoDB disconnected. Attempting to re-establish socket connection...');
    });

    mongoose.connection.on('error', (err) => {
        console.error(`🔴 MongoDB Runtime Socket Error: ${err.message}`);
    });
};

export default connectDB