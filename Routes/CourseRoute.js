const express = require("express");
const router = express.Router();
const controller = require("../Controllers/CourseController");

router
  .route("/Courses")
  .get(controller.getAllCourses)
  .post(controller.addCourse);

router
  .route("/Course/:id")
  .get(controller.getCourse)
  .put(controller.updateCourse)
  .delete(controller.deleteCourse);

module.exports = router;