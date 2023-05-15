const router = require("express").Router();
const {
  addNote,
  updateNote,
  deleteNote,
  getNotes,
  getNotesById,
} = require("./NoteController");

// NOTE ENDPOINTS
router.post("/add", addNote);
router.put("/update/:id", updateNote);
router.delete("/delete/:id", deleteNote);
router.get("/get-notes", getNotes);
router.get("/get-note/:id", getNotesById);
module.exports = router;
