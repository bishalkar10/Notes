# Application Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (version 20 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (installed and running locally)

## Environment Variables

You will need to set up two environment variables for the application to run correctly. Create a `.env` file in the root of your project and add the following:

```.env
JWT_SECRET=your_jwt_secret_here
COOKIE_SECRET=your_cookie_secret_here
```
Replace `your_jwt_secret_here` and `your_cookie_secret_here` with your actual secret values.

## Setting Up MongoDB

1. **Install MongoDB**: Follow the instructions on the [MongoDB installation page](https://docs.mongodb.com/manual/installation/) to install MongoDB on your local machine.
2. **Start MongoDB**: Once installed, start the MongoDB server by running the following command in your terminal:
   ```bash
   mongod
   ```

## Running the Application

1. **Install Dependencies**: Navigate to your project directory and install the required dependencies:
   ```bash
   npm install
   ```

2. **Start the Application**: After installing the dependencies, you can start the application with:
   ```bash
   npm start
   ```

Your application should now be running locally. You can access it at `http://localhost:3000` (or the port specified in your application).

## Directory Structure

The `src` directory contains the main application code, organized into several subdirectories:

- **`config/`**: Contains configuration files for the application.
  - `database.ts`: Handles the MongoDB connection.
  - `environment.ts`: Loads environment variables and exports them for use throughout the application.

- **`controllers/`**: Contains the logic for handling requests and responses.
  - `auth.controller.ts`: Manages user authentication (login, registration, logout).
  - `notes.controller.ts`: Manages note-related operations (CRUD).

- **`middleware/`**: Contains middleware functions for request processing.
  - `auth.middleware.ts`: Checks if a user is authenticated.
  - `error.middleware.ts`: Handles errors that occur during request processing.

- **`models/`**: Contains Mongoose models for the application.
  - `note.model.ts`: Defines the schema for notes.
  - `user.model.ts`: Defines the schema for users.

- **`routes/`**: Contains route definitions for the application.
  - `auth.routes.ts`: Defines routes for authentication-related actions.
  - `notes.routes.ts`: Defines routes for note-related actions.

- **`types/`**: Contains TypeScript type definitions used throughout the application.
  - `types.ts`: Defines interfaces for environment variables and authenticated requests.

- **`utils/`**: Contains utility functions and helpers.
  - `async-handler.ts`: Wraps async route handlers to catch errors.
  - `errors.ts`: Utility for creating custom error objects.
  - `logger.ts`: Provides logging functionality.

- **`validators/`**: Contains validation logic for incoming requests.
  - `auth.validator.ts`: Validates user login and registration data.

## Additional Information

For further details on the application, please refer to the documentation or the code comments.
