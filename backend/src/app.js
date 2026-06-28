import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import globalErrorHandler from './middleware/errorMiddleware.js';

const app = express();
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
// Set security HTTP headers
app.use(helmet());

// Enable CORS with default credentials configuration
app.use(cors({
    origin: true, // Will customize based on frontend URI in production
    credentials: true
}));

// Development logging
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

// Body parsers
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Base Health Check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'StayAI API Engine is healthy',
        timestamp: new Date().toISOString()
    });
});

// Mounting API routes (Placeholder)
app.use('/api/v1', (req, res) => {
    res.status(404).json({
        status: 'fail',
        message: 'API Endpoint not found in this version'
    });
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;