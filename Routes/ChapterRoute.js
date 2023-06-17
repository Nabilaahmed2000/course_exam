const express = require("express");
const router = express.Router();
const controller = require("../Controllers/ChapterController");

router
  .route("/Chapters")
  .get(controller.getAllChapters)
  .post(controller.addChapter);

router
  .route("/Chapter/:id")
  .get(controller.getChapter)
  .put(controller.updateChapter)
  .delete(controller.deleteChapter);

router.route("/CourseChapters/:id").get(controller.getAllChaptersForCourse);

module.exports = router;
