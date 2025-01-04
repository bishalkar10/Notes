import { Response } from 'express';
import { Note } from '../models/note.model';
import { createError } from "../utils/errors";
import { AuthenticatedRequest } from "../types/types"

export const notesController = {
    // Get a specific note (public or private) 
    async getNote(req: AuthenticatedRequest, res: Response) {
      const { id } = req.params;
      const note = await Note.findOne({ id });
      if (!note) {
        throw createError(404, 'Note not found');
      }
  
      // Check if note is accessible
      if (!note.public && (!req.user || note.user.toString() !== req.user.id)) {
        throw createError(403, 'Not authorized to access this note');
      }
  
      res.json(note);
    },
  
    // Get all notes for logged-in user
    async getNotes(req: AuthenticatedRequest, res: Response) {
      const notes = await Note.find({ user: req.user!.id })
        .sort({ createdAt: -1 });
      
      res.status(200).json({
        status: "success",
        data: notes
      })
    },
  
    // Create a new note
    async createNote(req: AuthenticatedRequest, res: Response) {
      const { title, content, public: isPublic } = req.body;
  
      const note = await Note.create({
        title,
        content,
        public: isPublic || false,
        user: req.user!.id
      });
  
      res.status(200).json({
        status: "success",
        data: note
      })
    },
  
    // Update a note
    async updateNote(req: AuthenticatedRequest, res: Response) {
      const { id } = req.params;
      const { title, content, public: isPublic } = req.body;
  
      const note = await Note.findOne({ id });
  
      if (!note) {
        throw createError(404, 'Note not found');
      }
  
      // Only owner can update
      if (note.user.toString() !== req.user!.id) {
        throw createError(403, 'Not authorized to update this note');
      }
  
      note.title = title || note.title;
      note.content = content || note.content;
      note.public = isPublic !== undefined ? isPublic : note.public;
      await note.save();
  
      res.status(200).json({
        status: "success",
        data: note
      })
    },
  
    // Delete a note
    async deleteNote(req: AuthenticatedRequest, res: Response) {
      const { id } = req.params;
      
      const note = await Note.findOne({ id });
  
      if (!note) {
        throw createError(404, 'Note not found');
      }
  
      // Only owner can delete
      if (note.user.toString() !== req.user!.id) {
        throw createError(403, 'Not authorized to delete this note');
      }
  
      await note.deleteOne();
      res.json({ message: 'Note deleted successfully' });
    }
  };