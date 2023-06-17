const mongoose = require("mongoose");
require("../Models/ChapterModel");
const chapterSchema = mongoose.model("Chapter");

//get all chapters
exports.getAllChapters = async (request, response, next) => {
  const chapters = await chapterSchema
    .find({})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => next(error));
};

//get chapter using param
exports.getChapter = (request, response, next) => {
  chapterSchema
    .findOne({ _id: request.params.id })
    .then((data) => {
      if (data) response.status(200).json({ data });
      else throw new Error("chapter not found");
    })
    .catch((error) => next(error));
};

//   add chapter
exports.addChapter = (request, response, next) => {
  new chapterSchema({
    _id: request.body.id,
    courseID: request.body.courseID,
    chapterNumber: request.body.chapterNumber,
  })
    .save()
    .then((data) => {
      response.status(201).json({ data });
    })
    .catch((error) => next(error));
};

//delete chapter using param
exports.deleteChapter = (request, response, next) => {
  chapterSchema
    .findOneAndDelete({ _id: request.params.id })
    .then((data) => {
      if (data) response.status(200).json({ data });
      else throw new Error("chapter not found");
    })
    .catch((error) => next(error));
};

//update chapter using param
exports.updateChapter = (request, response, next) => {
  chapterSchema
    .findOneAndUpdate({ _id: request.params.id })
    .then((data) => {
      if (data) response.status(200).json({ data });
      else throw new Error("chapter not found");
    })
    .catch((error) => next(error));
};

//get all chapters for a course
exports.getAllChaptersForCourse = async (request, response, next) => {
  const chapters = await chapterSchema
    .find({ courseID: request.params.id })
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => next(error));
};
