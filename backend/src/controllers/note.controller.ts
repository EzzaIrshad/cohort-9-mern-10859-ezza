import { Request, Response } from "express";
import Note from "../models/note.model.js";
import z, { ZodError } from "zod";
import logger from "../config/logger.js";
import { buildNoteQuery } from "../utils/buildNoteQuery.js";

import {
    CreateNoteInput,
    createNoteSchema,
    getNotesQuerySchema,
    UpdateNoteInput,
    updateNoteSchema
} from "../validations/note.validation.js";


export const getAllNotes = async (req: Request, res: Response) => {
    try {
        const { search, isPinned, sort } = getNotesQuerySchema.parse(req.query);

        const { filter, sortOption } = buildNoteQuery({
            userId: req.user?.userId,
            search,
            isPinned,
            sort,
        });

        const notes = await Note.find(filter).sort(sortOption);

        res.status(200).json({
            success: true,
            message: "Notes retrieved successfully.",
            data: notes,
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                message: "Invalid query parameters.",
                errors: z.treeifyError(error),
            });
        }

        logger.error({ err: error }, "Failed to retrieve notes." );

        return res.status(500).json({ message: "Internal server error." });
    }
}

export const getNote = async (req: Request, res: Response) => {
    try {

        const note = await Note.findOne({
            _id: req.params.id,
            userId: req.user?.userId,
        });

        if (!note) return res.status(404).json({ message: "Note not found.", });

        res.status(200).json({
            success: true,
            message: "Note retrieved successfully.",
            data: note,
        });
    } catch (error) {
        logger.error(
            { err: error },
            "Failed to retrieve note."
        );

        return res.status(500).json({ message: "Internal server error." });
    }
}

export const createNote = async (req: Request, res: Response) => {
    try {
        const data: CreateNoteInput = createNoteSchema.parse(req.body);

        const newNote = new Note({
            ...data,
            userId: req.user?.userId,
        })

        const savedNote = await newNote.save();

        logger.info({
                noteId: savedNote._id,
                userId: req.user?.userId,
            }, "Note created successfully." );

        return res.status(201).json({
            success: true,
            message: "Note created successfully.",
            data: savedNote,
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                message: "Failed to create note",
                errors: z.treeifyError(error),
            });
        }

        logger.error(error);

        return res.status(500).json({ message: "Internal server error" });
    }
}

export const updateNote = async (req: Request, res: Response) => {
    try {
        const data: UpdateNoteInput = updateNoteSchema.parse(req.body);

        const updatedNote = await Note.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user?.userId
            },
            data,
            { returnDocument: "after" }
        )
        if (!updatedNote) return res.status(404).json({ message: "Note not found." });

        return res.status(200).json({
            success: true,
            message: "Note updated successfully.",
            data: updatedNote,
        });
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                message: "Failed to update note.",
                errors: z.treeifyError(error),
            });
        }

        logger.error({ err: error }, "Failed to update note.");

        return res.status(500).json({ message: "Internal server error." });
    }
}

export const deleteNote = async (req: Request, res: Response) => {
    try {

        const deletedNote = await Note.findOneAndDelete({
            _id: req.params.id,
            userId: req.user?.userId
        });

        if (!deletedNote) return res.status(404).json({ message: "Note not found." });

        logger.info({
                noteId: deletedNote._id,
                userId: req.user?.userId,
            }, "Note deleted successfully." );

        return res.status(200).json({
            success: true,
            message: "Note deleted successfully."
        });
    } catch (error) {

        logger.error({ err: error }, "Failed to delete note.");

        return res.status(500).json({ message: "Internal server error." });
    }
}