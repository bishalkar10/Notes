import { Response } from 'express';
import { Note } from '../models/note.model';
import { createError } from "../utils/errors";
import { AuthenticatedRequest } from "../types/types"

export const notesController = {
    // Get a specific note (public or private) 
    async getNote(req: AuthenticatedRequest, res: Response) {
      const { id } = req.params;
      const note = await Note.findOne({ id })
        .select('id user title content public createdAt updatedAt');
      
      if (!note) {
        throw createError(404, 'Note not found');
      }

      if (!note.public && (!req.user || note.user.toString() !== req.user.id)) {
        throw createError(403, 'Not authorized to access this note');
      }
  
      res.json(note);
    },
  
    async getNotes(req: AuthenticatedRequest, res: Response) {
      const notes = await Note.find({ user: req.user!.id })
        .sort({ createdAt: -1 })
        .select('id user title content public createdAt updatedAt');
      
      res.status(200).json({
        status: "success",
        data: notes
      });
    },

    async createNote(req: AuthenticatedRequest, res: Response) {
      const { title, content, public: isPublic } = req.body;
  
      const note = await Note.create({
        title,
        content,
        public: isPublic || false,
        user: req.user!.id
      });
  
      res.status(201).json({
        status: "success",
        data: {
          id: note._id,
          user: note.user,
          title: note.title,
          content: note.content,
          public: note.public,
          createdAt: note.createdAt,
          updatedAt: note.updatedAt,
        },
      });
    },
  
    async updateNote(req: AuthenticatedRequest, res: Response) {
      const { id } = req.params; // This refers to your custom `id` field
      const { title, content } = req.body;
    
      // Find and update the note based on the custom `id` field
      const note = await Note.findOneAndUpdate(
        { id }, // Search using custom `id`
        { title, content }, // Fields to update
        { new: true, runValidators: true, select: "id user title content public createdAt updatedAt" } // Return updated document
      );
    
      if (!note) {
        throw createError(404, "Note not found");
      }
    
      // Ensure the logged-in user is the owner before sending the response
      if (note.user !== req.user!.id) {
        throw createError(403, "Not authorized to update this note");
      }
    
      res.status(200).json({
        status: "success",
        data: {
          id: note.id,
          user: note.user,
          title: note.title,
          content: note.content,
          public: note.public,
          createdAt: note.createdAt,
          updatedAt: note.updatedAt,
        },
      });
    },
    

    async updateNotePublicStatus(req: AuthenticatedRequest, res: Response) {
      const { id } = req.params;
      const { public: isPublic } = req.body;
  
      // Find and update the note in one operation
      const note = await Note.findOneAndUpdate(
        { id, user: req.user!.id }, // Search by id and user to ensure ownership
        { public: isPublic },
        { new: true, runValidators: true, select: 'id public createdAt updatedAt' }
      );
  
      if (!note) {
        throw createError(404, 'Note not found or not authorized');
      }
  
      res.status(200).json({
        status: "success",
        data: {
          id: note.id,
          public: note.public,
          createdAt: note.createdAt,
          updatedAt: note.updatedAt,
        },
      });
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