const express = require("express");
const router = express.Router();
const controller = require("../Controllers/QuestionController");

router
  .route("/Question")
  .get(controller.getAllQuestions)
  .post(controller.addQuestion);
router
  .route("/Question/:id")
  .get(controller.getQuestion)
  .put(controller.updateQuestion)
  .delete(controller.deleteQuestion);
router.route("/ChapterQuestions/:id").get(controller.getQuestionInChapter);
router.route("/QuestionNum/:id").get(controller.getQuestionNum);

module.exports = router;
