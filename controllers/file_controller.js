const addFile = asyncHandler(async (req, res) => {
  const { cardId } = req.body;
  // get card by id
  await Card_Model.findByIdAndUpdate(cardId, {
    $push: {
      files: {
        name: req.file.filename,
        size: req.file.size,
        type: req.file.mimetype,
      },
    },
  });
  res.status(200).json({ message: "File has been attached to card" });
});
const getFile = asyncHandler(async (req, res) => {
  const { fileId } = req.body;
  // // get card by id
  // await Card_Model.findByIdAndUpdate(cardId, {
  //   $push: {
  //     activities: {
  //       ...data,
  //     },
  //   },
  // });
  console.log("ehlasdfas");
  res.status(200).json({ message: "Activity has been added to card" });
});
const deleteFile = asyncHandler(async (req, res) => {
  const { cardId, fileId, filename } = req.body;
  await Card_Model.findByIdAndUpdate(cardId, {
    $pull: {
      files: {
        _id: fileId,
      },
    },
  });
  await fs.unlink("public/uploads/" + filename);
  res.status(200).json({ message: "File has been deleted" });
});
