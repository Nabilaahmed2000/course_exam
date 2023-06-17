require('../Models/UserModel');
const mongoose = require('mongoose');
const userSchema = mongoose.model('users');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//add user
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