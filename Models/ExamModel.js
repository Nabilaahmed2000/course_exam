const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const examSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  questions: [{
    type: Number,
    ref: 'Question',
    required: [true, 'Question ID is required']
    }],
});

examSchema.plugin(autoIncrement, { id: 'exam_id', inc_field: '_id' });
const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;