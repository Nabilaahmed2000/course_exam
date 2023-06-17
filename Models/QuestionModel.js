const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const questionSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  chapterID: {
    type: Number,
    ref: 'Chapter',
    required: [true, 'Chapter ID is required']
  },
  difficultyLevel: {
    type: String,
    enum: ['Easy', 'difficult'],
    required: [true, 'Difficulty level is required']
  },
  objective: {
    type: String,
    enum:['reminding', 'understanding','creativity'],
    required: [true, 'Objective is required'],
    trim: true
  },
  questionText: {
    type: String,
    required: [true, 'Question text is required'],
    trim: true
  },
  choice1: {
    type: String,
    required: [true, 'Choice 1 is required'],
    trim: true
  },
  choice2: {
    type: String,
    required: [true, 'Choice 2 is required'],
    trim: true
  },
  choice3: {
    type: String,
    required: [true, 'Choice 3 is required'],
    trim: true
  },
  correctAnswer: {
    type: String,
    required: [true, 'Correct answer is required'],
    trim: true
  }
});

questionSchema.plugin(autoIncrement, { id: 'question_id', inc_field: '_id' });
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;