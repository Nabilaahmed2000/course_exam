const express = require("express");
const router = express.Router();
const controller = require("../Controllers/UserController");

router.route("/Users").get(controller.getAllUsers).post(controller.addUser);

router
  .route("/User/:id")
  .get(controller.getUser)
  .put(controller.updateUser)
  .delete(controller.deleteUser);

module.exports = router;
