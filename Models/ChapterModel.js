const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const chapterSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  courseID: {
    type: Number,
    ref: 'Course',
    required: true
  },
  chapterNumber: {
    type: Number,
    required: true
  }
});

chapterSchema.plugin(autoIncrement, { id: 'chapter_id', inc_field: '_id' });
const Chapter = mongoose.model('Chapter', chapterSchema);


module.exports = Chapter;