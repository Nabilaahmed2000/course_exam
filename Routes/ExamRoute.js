const express = require("express");
const router = express.Router();
const controller = require("../Controllers/ExamController");


router.route("/Exam").post(controller.generateExam);
router.route("/ExamQuestions/:id").get(controller.findQuestionsInExam);

module.exports = router;