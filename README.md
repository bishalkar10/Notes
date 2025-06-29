# Notes API - Backend

A robust RESTful API for managing personal and public notes, built with Node.js, Express.js, TypeScript, and MongoDB.

## Features

- **User Authentication**: JWT-based authentication with secure cookie handling
- **Notes Management**: Create, read, update, and delete notes
- **Public/Private Notes**: Control note visibility (public notes are accessible to everyone)
- **Security**: Rate limiting, CORS, helmet security headers
- **Type Safety**: Full TypeScript implementation
- **Logging**: Winston-based logging system
- **Validation**: Zod schema validation
- **Error Handling**: Centralized error handling middleware

## Tech Stack

- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + bcrypt
- **Validation**: Zod
- **Security**: Helmet, express-rate-limit, CORS
- **Logging**: Winston
- **Development**: tsx, nodemon

## Prerequisites

Before running the application, ensure you have:

- [Node.js](https://nodejs.org/) (version 20 or higher)
- [MongoDB](https://www.mongodb.com/) (local installation or MongoDB Atlas)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/notes-app

# Authentication
JWT_SECRET=your_super_secure_jwt_secret_here
COOKIE_SECRET=your_cookie_secret_here

# CORS
CORS_ORIGIN=http://localhost:5173
```

## Installation & Setup

1. **Clone the repository** (if applicable)
   ```bash
   git clone <repository-url>
   cd Notes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy the environment variables above into a `.env` file
   - Replace placeholder values with your actual secrets

4. **Start MongoDB**
   - Local: `mongod` (if installed locally)
   - Or use MongoDB Atlas connection string

5. **Run the application**
   ```bash
   # Development mode with hot reload
   npm run dev
   
   # Production build and start
   npm run build
   npm start
   
   # Development with tsx
   npm run start:dev
   ```

The API will be available at `http://localhost:3000` (or your specified PORT).

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Notes
- `GET /api/notes` - Get all user's notes (authenticated)
- `GET /api/notes/:id` - Get a specific note (public notes accessible to all)
- `POST /api/notes` - Create a new note (authenticated)
- `PUT /api/notes/:id` - Update a note (authenticated, owner only)
- `PATCH /api/notes/:id/public` - Update note's public status (authenticated, owner only)
- `DELETE /api/notes/:id` - Delete a note (authenticated, owner only)

### API Response Format
```json
{
  "status": "success",
  "data": {
    "id": "unique-note-id",
    "title": "Note Title",
    "content": "Note content...",
    "public": false,
    "user": "user-id",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Project Structure

```
src/
├── config/
│   ├── database.ts          # MongoDB connection setup
│   └── environment.ts       # Environment variables configuration
├── controllers/
│   ├── auth.controller.ts   # Authentication logic
│   └── notes.controller.ts  # Notes CRUD operations
├── middleware/
│   ├── auth.middleware.ts   # JWT authentication middleware
│   └── error.middleware.ts  # Centralized error handling
├── models/
│   ├── note.model.ts        # Note schema (Mongoose)
│   └── user.model.ts        # User schema (Mongoose)
├── routes/
│   ├── auth.routes.ts       # Authentication routes
│   └── notes.routes.ts      # Notes routes
├── types/
│   └── types.ts             # TypeScript type definitions
├── utils/
│   ├── async-handler.ts     # Async error wrapper
│   ├── errors.ts            # Custom error utilities
│   └── logger.ts            # Winston logger configuration
├── validators/
│   └── auth.validator.ts    # Request validation schemas
└── index.ts                 # Application entry point
```

## Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configurable cross-origin resource sharing
- **Helmet**: Security headers protection
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Input Validation**: Zod schema validation
- **Error Handling**: Prevents information leakage

## Deployment

The application is configured for deployment on Render.com with the included `render.yaml` file.

### Environment Variables for Production
Ensure these environment variables are set in your production environment:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Strong JWT secret key
- `COOKIE_SECRET` - Cookie signing secret
- `CORS_ORIGIN` - Your frontend domain
- `NODE_ENV=production`

## Development Scripts

```bash
npm run dev        # Start with nodemon and tsx
npm run build      # Build TypeScript to JavaScript
npm start          # Start production server
npm run start:dev  # Start with tsx directly
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.
