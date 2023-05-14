const Note_Model = require("../models/Note_Model");
const Deal_Model = require("../models/Deal_Model");
const asyncHandler = require("express-async-handler");

// NOTES CONTROLLERS

const getNotes = asyncHandler(async (req, res) => {
  const { filters, search, sort, limit, select, count, start, data, populate } =
    req.query;

  const filtersObj = filters
    ? JSON.parse(filters).reduce(
        (obj, item) => ({ ...obj, [item.id]: item.value }),
        {}
      )
    : {};
  const sortObj = sort
    ? JSON.parse(sort).reduce(
        (obj, item) => ({ ...obj, [item.id]: item.desc ? "desc" : "asc" }),
        {}
      )
    : {};

  const buildQuery = (model, filtersObj, limit, select, sortObj, start) => {
    return model
      .find(filtersObj)
      .limit(limit || 25)
      .select(select)
      .sort(sortObj)
      .skip(start || 0)
      .populate(populate);
  };

  let notes;
  let total = 0;

  const queries = [];

  if (data) {
    queries.push(
      buildQuery(Note_Model, filtersObj, limit, select, sortObj, start)
    );
  }

  if (count) {
    queries.push(
      Note_Model.countDocuments(filtersObj)
        .limit(limit || 25)
        .select(select)
        .sort(sortObj)
        .skip(start || 0)
        .then((count) => {
          total = count;
        })
    );
  }

  if (search) {
    queries.push(
      buildQuery(
        Deal_Model,
        { $text: { $search: search } },
        limit,
        select,
        sortObj,
        start,
        populate
      )
    );
  }

  await Promise.all(queries)
    .then((results) => {
      if (data) {
        [notes] = results;
      }
    })
    .catch((error) => {
      console.log(error);
    });
  res.status(200).json({ data: notes, meta: { total } });
});

const getNotesById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { select, populate } = req.query;

  if (!id) {
    return res.status(400).json({ success: false, message: "Missing note ID" });
  }

  const note = await Note_Model.findById(id).populate(populate).select(select);

  if (!note) {
    return res
      .status(404)
      .json({ success: false, message: "Activity not found" });
  }

  res.status(200).json({ success: true, data: note });
});
const addNote = asyncHandler(async (req, res) => {
  const newNote = new Note_Model(req.body);
  const note = await newNote.save();

  const updateDealPromises = note.deals.map(async (deal) => {
    await Deal_Model.findByIdAndUpdate(deal.toHexString(), {
      $push: { notes: note.id },
    });
  });
  await Promise.all(updateDealPromises);
  res.status(200).json({ message: "Note has been added to deal", data: note });
});
const updateNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { noteBody } = req.body;
  await Note_Model.findByIdAndUpdate(id, {
    body: noteBody,
  });
  res.status(200).json({ message: "Note has been updated" });
});
const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const note = await Note_Model.findById(id);
  const updateDealPromises = note.deals.map(async (deal) => {
    await Deal_Model.findByIdAndUpdate(deal.toHexString(), {
      $pull: { notes: note.id },
    });
  });
  await Promise.all(updateDealPromises).then(
    async () => await note.deleteOne()
  );
  res.status(200).json({ message: "Note has been deleted" });
});

module.exports = {
  addNote,
  updateNote,
  deleteNote,
  getNotes,
  getNotesById,
};
