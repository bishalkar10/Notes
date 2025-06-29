import { Router } from 'express';
import { notesController } from '../controllers/notes.controller';
import { isAuthenticated, optionalAuth } from '../middleware/auth.middleware';
import { asyncHandler } from "../utils/async-handler";

const router = Router();

// Route with optional authentication - can access public notes without auth, private notes with auth
router.get('/:id', optionalAuth, asyncHandler(notesController.getNote));

// Protected routes - need authentication
router.use(isAuthenticated);
router.get('/', asyncHandler(notesController.getNotes));
router.post('/', asyncHandler(notesController.createNote));
router.put('/:id', asyncHandler(notesController.updateNote));
router.delete('/:id', asyncHandler(notesController.deleteNote));
router.patch('/:id', asyncHandler(notesController.updateNotePublicStatus));

export default router; 