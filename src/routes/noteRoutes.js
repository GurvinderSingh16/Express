const express = require("express");
const { getNotes, createNotes, deleteNotes, updateNotes } = require("../controllers/notesController");
const auth = require("../middlewares/auth");
const notesRouter= express.Router();

notesRouter.get("/getnotes", auth, getNotes)
notesRouter.post("/createnotes",auth, createNotes)
notesRouter.delete("/deletenotes:id", auth, deleteNotes)
notesRouter.put("/updatenotes:id", auth, updateNotes)


module.exports= notesRouter //for use in another component