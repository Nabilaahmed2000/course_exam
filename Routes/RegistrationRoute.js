const express = require("express");
const router = express.Router();
const controller = require("../Controllers/RegisterController");

router.post("/SignUp", controller.addUser);
module.exports = router;
