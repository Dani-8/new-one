import AppError from '../utils/appError.js'


// Handler for invalid MongoDB ObjectIDs
const handleCastErrorDB = (err) => {
    const message = `Invalid path format: ${err.path} is defined as '${err.value}'.`
    return new AppError(message, 400)
}


// Handler for duplicate key violations (MongoDB Code 11000)
const handleDuplicateFieldsDB = (err) => {
    const value = Object.keys(err.keyValue || err.keyPattern)[0]
    const message = `The resource already contains a conflicting value for: '${value}'. Please use another value.`
    return new AppError(message, 409)
}


// Handler for Mongoose Schema Validation failures
const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Validation parameters failed: ${errors.join('. ')}`
    return new AppError(message, 400)
}


// Standard response payload during development
const sendErrorDev = (err, req, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
}


// Standard response payload during production (no internal stack leakage)
const sendErrorProd = (err, req, res) => {
    // 1. Known Operational Error: Expose details securely to the client
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }

    // 2. Unpredictable Bug/Programmer Error: Log locally and send a generic alert
    console.error('🔴 CRITICAL SYSTEM ERROR:', err)

    res.status(500).json({
        status: 'error',
        message: 'An internal transmission error occurred. Our engineering team has been notified.'
    })
}



const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res)
    } else {
        let error = { ...err }
        error.message = err.message
        error.name = err.name
        error.code = err.code

        // Standardize common MongoDB exceptions
        if (error.name === 'CastError') error = handleCastErrorDB(error)
        if (error.code === 11000) error = handleDuplicateFieldsDB(error)
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error)

        sendErrorProd(error, req, res)
    }
}


export default globalErrorHandler