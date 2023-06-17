const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('./../Models/UserModel');
const userSchema = mongoose.model('users');
const SECRET_KEY="SK";
const bcrypt = require("bcrypt");

const checkMailAndPassword = async (model, request, response, next) => {
	try {
		let data = await model.findOne({ email: request.body.email });
		if (data == null) {
			throw new Error('either mail or password is wrong');
		} else {
			let matched = await bcrypt.compare(request.body.password, data.password);
			if (!matched) throw new Error('either mail or password is wrongooo');
		}
		return data;
	} catch (error) { next(error); }
};
//response generator general function
function authResponse(id, role, response) {
  let token = jwt.sign({ id: id, role: role }, SECRET_KEY, { expiresIn: '24h' });
  response.status(200).json({
    message: 'Authenticated',
    token,
  });
}

//different users login
// exports.login = async (request, response, next) => {
//   let user = await checkMailAndPassword(userSchema, request, response, next);

//   if (user && user.role == 'Teacher') {
//     response.redirect('/teacher');
//   } else if (user && user.role == 'Student') {
//     authResponse(user._id, 'Student', response);
//   } else {
//     let error = new Error('Not Authenticated');
//     error.status = 401;
//     response.redirect('/login');
//     next(error);
//   }
// };

exports.login = async (request, response, next) => {
  let user = await checkMailAndPassword(userSchema, request, response, next);

  if (user && user.role === 'Teacher') {
    const authData = { userId: user._id, role: 'Teacher' };
    response.cookie('authData', JSON.stringify(authData));
    response.redirect('/teacher');
  } else if (user && user.role === 'Student') {
    authResponse(user._id, 'Student', response);
  } else {
    let error = new Error('Not Authenticated');
    error.status = 401;
    response.redirect('/login');
    next(error);
  }
};

function authResponse(userId, role, response) {
  const authData = { userId, role };
  response.cookie('authData', JSON.stringify(authData));
  response.redirect('/authenticated');
}


