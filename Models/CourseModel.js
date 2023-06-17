const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const courseSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  courseName: {
    type: String,
    required: [true, 'Course name is required'],
    trim: true
  },
  numberOfChapters: {
    type: Number,
    required: [true, 'Number of chapters is required'],
  }
});

courseSchema.plugin(autoIncrement, { id: 'course_id', inc_field: '_id' });
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;