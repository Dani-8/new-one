import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import morgan from 'morgan';
import rateLimit from 'express-rate-limit'

import globalErrorHandler from './middleware/errorMiddleware.js'
import AppError from './utils/appError.js'

const app = express()
// ------------------------------------------------------------------------------
// -

// 1. SECURITY MIDDLEWARE LAYER
// Configure HTTP security headers
app.use(helmet())

// Configure standard rate-limiting to prevent brute force and API degradation
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15-minute window
    max: 100, // Limit each IP to 100 requests per window
    standardHeaders: true, // Expose standard rate limit headers
    legacyHeaders: false, // Disable older headers
    message: 'Too many requests from this address. Please try again after 15 minutes.'
})


app.use('/api', limiter)



// Configure CORS to safely allow requests from defined origins (frontend port 5173 / production domains)
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? false // Will configure production frontend domain in deployment
        : ['http://localhost:5173', '[http://127.0.0.1:5173](http://127.0.0.1:5173)'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}))


// 2. REQUEST PARSING LAYER
// Limit request bodies to 10kb to mitigate payload-size attack vectors
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());


// 3. LOGGING LAYER
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}


// 4. API BASELINE HELMET PATHS
// High-performance direct health endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'StayAI REST Engine is fully operational',
        timestamp: new Date().toISOString()
    });
});

// Placeholder route mount to enforce API Versioning Strategy
app.use('/api/v1', (req, res, next) => {
    next(new AppError(`No route matching '${req.originalUrl}' is currently mounted under API v1`, 404));
});

// Catch-all route handler for unmatched endpoints
app.all('*', (req, res, next) => {
    next(new AppError(`Requested path '${req.originalUrl}' does not exist on this server.`, 404));
})


// 5. GLOBAL EXCEPTION ORCHESTRATION PIPELINE
app.use(globalErrorHandler);

export default app;