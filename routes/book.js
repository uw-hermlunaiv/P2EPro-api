const express = require("express");
const router = express.Router();
const fs = require("fs");
const uuid = require("uuid");
const path = require("path");
const filePath = path.join(__dirname, "../data.json");

const getBooks = () => {
  return JSON.parse(fs.readFileSync(filePath, { encoding: "utf-8" }));
};

router.get("/", function (req, res) {
  const data = getBooks();

  res.send({
    data,
    totalCount: data.length,
  });
});

router.post("/", function (req, res) {
  const newBook = {
    ...req?.body,
    id: uuid.v4(),
  };

  const newSetOfBooks = [...getBooks(), newBook];

  fs.writeFileSync(filePath, JSON.stringify(newSetOfBooks));

  res.send({
    data: newBook,
  });
});

router.delete("/:id", function (req, res) {
  const newSetOfBooks = getBooks().filter(({ id }) => {
    return id !== req.params.id;
  });

  fs.writeFileSync(filePath, JSON.stringify(newSetOfBooks));

  res.send({
    data: true,
    message: "Book deleted",
  });
});

module.exports = router;
