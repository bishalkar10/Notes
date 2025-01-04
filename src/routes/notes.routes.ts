import { Router } from 'express';
import { notesController } from '../controllers/notes.controller';
import { isAuthenticated } from '../middleware/auth.middleware';
import { asyncHandler } from "../utils/async-handler";

const router = Router();

// Protected routes - need authentication
router.use(isAuthenticated);
router.get('/', asyncHandler(notesController.getNotes));
router.post('/', asyncHandler(notesController.createNote));
router.put('/:id', asyncHandler(notesController.updateNote));
router.delete('/:id', asyncHandler(notesController.deleteNote));

// Public route - can access public notes without authentication
router.get('/:id', asyncHandler(notesController.getNote));

export default router; 