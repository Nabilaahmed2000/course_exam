// packeges

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');



// routes
const registrationRoute = require('./Routes/RegistrationRoute');
const loginRoute = require('./Routes/LoginRoute');
const { auth, checkTeacher, checkStudent, checkStudentORTeacher } = require('./Middleware/authenticationMW');
const chapterRoute = require('./Routes/ChapterRoute');
const questionRoute = require('./Routes/QuestionRoute');
const userRoute = require('./Routes/UserRoute');
const examRoute = require('./Routes/ExamRoute');
const courseRoute = require('./Routes/CourseRoute');





//  open server using express
const server = express();
const PORT = process.env.PORT || 8080;
mongoose.set('strictQuery', true);

mongoose
.connect("mongodb://127.0.0.1:27017/course_exam")
  .then(() => {
    console.log('DB connected');
    // listen port
    server.listen(PORT, () => {
      console.log('server is listening....', PORT);
    });
  })
  .catch((error) => {
    console.log('Db Problem ' + error);
  });

server.use(
  cors({
    origin: '*',
  })
);

server.use(morgan(function (tokens, request, res) {
  return [
    tokens.method(request, res),
    tokens.url(request, res),
    tokens.status(request, res),
    tokens.res(request, res, 'content-length'),
    '-',
    tokens['response-time'](request, res),
    'ms',
  ].join(' ');
}));
morgan('dev');
server.use(express.json());
server.use(express.urlencoded({ extended: false }));


server.use(express.static(path.join(__dirname, 'Views')));

// Route for the login page
server.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'Views', 'login.html'));
});
server.get('/teacher', (req, res) => {
  res.sendFile(path.join(__dirname, 'Views', 'teacherHome.html'));
});
server.get('/course', (req, res) => {
  res.sendFile(path.join(__dirname, 'Views', 'course.html'));
});
server.get('/addQuestion', (req, res) => {
  res.sendFile(path.join(__dirname, 'Views', 'addQuestion.html'));
});
server.get('/viewQuestions', (req, res) => {
  res.sendFile(path.join(__dirname, 'Views', 'viewQuestions.html'));
});
server.get('/generateExam', (req, res) => {
  res.sendFile(path.join(__dirname, 'Views', 'generateExam.html'));
});
server.get('/exam', (req, res) => {
  res.sendFile(path.join(__dirname, 'Views', 'exam.html'));
});

// login Route
server.use(registrationRoute);
server.use(loginRoute);
server.use(cookieParser());

// auth middleware
server.use(auth);
// Routes
server.use(courseRoute);
server.use(chapterRoute);
server.use(questionRoute);
server.use(userRoute);
server.use(examRoute);



// not found middleware
server.use((request, response, next) => {
  response.status(404).json({ message: 'page not found' });
});

// error middleware
server.use((error, request, response, next) => {
  if (request.file) fs.unlinkSync(request.file.path);
  let status = error.status || 500;
  response.status(status).json({ message: error + '' });
});
