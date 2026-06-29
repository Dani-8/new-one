/**
 * AppError: Custom operational error class.
 * Designed to separate predictable client/server failures from unknown syntax or runtime crashes.
 */

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

        // Mark this error as operational so we can securely expose it to clients in production
        this.isOperational = true;

        // Capture clean Stack Trace excluding the instantiation helper call
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError