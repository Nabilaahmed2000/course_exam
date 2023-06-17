const mongoose = require("mongoose");
const courseSchema = mongoose.model("Course");


//get all courses

exports.getAllCourses = async (request, response, next) => {
    const courses = await courseSchema
        .find({})
        .then((data) => {
        response.status(200).json({ data });
        })
        .catch((error) => next(error));
    };



//get course using param
// exports.getCourse = (request, response, next) => {
//     courseSchema
//       .findOne({ _id: request.params.id })
//       .then((data) => {
//         if (data) {
//           // Redirect to course.html with the course data
//           response.redirect(`/course?id=${data._id}`);
//         } else {
//           throw new Error("Course not found");
//         }
//       })
//       .catch((error) => next(error));
//   };
  
exports.getCourse = (request, response, next) => {
    courseSchema
        .findOne({ _id: request.params.id })
        .then((data) => {
        if (data) response.status(200).json({ data });
        else throw new Error("course not found");
        })
        .catch((error) => next(error));
    };


//add course 
exports.addCourse = (request, response, next) => {
    const course = new courseSchema(request.body);
    course.save().then((data) => {  
        response.status(200).json({ data });
    }
    ).catch((error) => next(error));
};

//update course using param
exports.updateCourse = (request, response, next) => {
    courseSchema.findByIdAndUpdate({_id:request.params.id})
    .then((data) => {
        if(data) response.status(200).json({data});
        else throw new Error("course not found");

    })
    .catch((error) => next(error));
};

//delete course using param
exports.deleteCourse = (request, response, next) => {
    courseSchema
        .findOneAndDelete({ _id: request.params.id })
        .then((data) => {
        if (data) response.status(200).json({ data });
        else throw new Error("course not found");
        })
        .catch((error) => next(error));
    };




