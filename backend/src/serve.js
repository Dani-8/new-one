import app from './app.js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const PORT = process.env.PORT || 5000
// --------------------------------------

const startServer = async () => {
  try {
    // Database connection hook will go here in Phase 1.4
    console.log('🔄 Connecting to databases...');
    
    app.listen(PORT, () => {
      console.log(`🟢 StayAI Server successfully running in ${process.env.NODE_ENV || 'development'} mode directly on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(`🔴 Server startup failure: ${error.message}`);
    process.exit(1);
  }
}


// Handle unhandled rejections globally
process.on('unhandledRejection', (err) => {
  console.error(`🔴 Unhandled Promise Rejection: ${err.message}`);
  process.exit(1);
})

startServer()