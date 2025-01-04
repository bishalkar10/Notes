import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import { environment } from './config/environment';
import { errorHandler } from './middleware/error.middleware';
import authRoutes from './routes/auth.routes';
import notesRoutes from './routes/notes.routes';
import { logger } from './utils/logger';
import { createError } from './utils/errors';
import { connectDB } from './config/database';

const app = express();

// Security middleware
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  })
);

// Basic middleware
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser(environment.COOKIE_SECRET));
app.use(
  cors({
    origin: environment.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);


// Unhandled route handler
app.all('*', (req, res, next) => {
  next(createError(404, `Route ${req.originalUrl} not found`));
});

// Error handling
app.use(errorHandler);

// Connect to Database before starting the server
const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(environment.PORT, () => {
      logger.info(`Server running on port ${environment.PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Handle unhandled rejections
process.on('unhandledRejection', (err: Error) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
  logger.error(err.name, err.message);
  process.exit(1);
});
