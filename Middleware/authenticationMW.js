// const jwt = require("jsonwebtoken");
// const SECRET_KEY="SK";

// module.exports = (request, response, next) => {
//     //search for authorization
//     try {
//         let token = request.get("authorization").split(" ")[1];
//         let decodedToken = jwt.verify(token, SECRET_KEY);
//         request.id = decodedToken.id;
//         request.role = decodedToken.role;
//         //to go to the next layers(end point) with id ,role
//         next();
//     }
//     catch (error) {
//         error.status = 401;
//         error.message = "NOT authenticated";
//         next(error);
//     }
// }

const { request, response } = require("express");

const jwt = require("jsonwebtoken");


// Modified auth function
 auth = (request, response, next) => {
  try {
    const authCookie = request.cookies.authData;
    if (authCookie) {
      const authData = JSON.parse(authCookie);
      request.id = authData.userId;
      request.role = authData.role;
      next();
    } else {
      throw new Error('Not Authenticated');
    }
  } catch (error) {
    error.status = 401;
    error.message = 'Not Authenticated';
    next(error);
  }
};

// auth = (request, response, next) => {
//   try {
//     let token = request.get("authorization").split(" ")[1];
//     let decodedToken = jwt.verify(token, "SK");
//     request.id = decodedToken._id;
//     request.role = decodedToken.role;
//     next();
//   } catch (error) {
//     error.status = 401;
//     error.message = "not authenticated";
//     next(error);
//   }
// };
checkTeacher = (request, response, next) => {
  if (request.role == "Teacher") {
    //go to next layer  (controller)
    next();
  } else {
    let error = new Error("Not authorized ");
    error.status = 403;
    next(error);
  }
};

checkStudent = (request, response, next) => {
  if (request.role == "Student") {
    //go to next layer  (controller)
    next();
  } else {
    let error = new Error("Not authorized");
    error.status = 403;
    next(error);
  }
};

checkStudentORTeacher = (request, response, next) => {
  if (request.role == "Student" || request.role == "Teacher") {
    //go to next layer  (controller)
    next();
  } else {
    let error = new Error("Not authorized");
    error.status = 403;
    next(error);
  }
};

module.exports = {
  auth,
  checkTeacher,
  checkStudent,
  checkStudentORTeacher,
};
