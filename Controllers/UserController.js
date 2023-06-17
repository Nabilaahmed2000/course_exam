const mongoose = require("mongoose");
const userSchema = mongoose.model("users");
// const fs = require("fs");
// const bcrypt = require("bcrypt");

//get all users
exports.getAllUsers = async (request, response, next) => {
  const users = await userSchema
    .find({})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => next(error));
};

//get user using param
exports.getUser = (request, response, next) => {
  userSchema
    .findOne({ _id: request.params.id })
    .then((data) => {
      if (data) response.status(200).json({ data });
      else throw new Error("user not found");
    })
    .catch((error) => next(error));
};

//   add user
exports.addUser = (request, response, next) => {
  new userSchema({
      _id: request.body.id,
      name: request.body.name,
      email: request.body.email,
      password: bcrypt.hashSync(
          request.body.password,
          bcrypt.genSaltSync(saltRounds)
      ),
      image: request.body.image ,
      role: request.body.role,
  })
      .save()
      .then((data) => {
          response.status(201).json({ data });
      })
      .catch((error) => next(error));
};

//delete user using param

exports.deleteUser = (request, response, next) => {
  userSchema
    .findOneAndDelete({ _id: request.params.id })
    .then((data) => {
      if (data) response.status(200).json({ data });
      else throw new Error("user not found");
    })
    .catch((error) => next(error));
};

//update user using param
exports.updateUser = (request, response, next) => {
  userSchema
    .findOneAndUpdate({ _id: request.params.id }, request.body, {
      new: true,
    })
    .then((data) => {
      if (data) response.status(200).json({ data });
      else throw new Error("user not found");
    })
    .catch((error) => next(error));
};
