const mongoose = require('mongoose');

const FlashcardSchema = mongoose.Schema({
  frontSide: {
    type: String,
    required: true
  },
  backSide: {
    type: String,
    required: true
  },
  isRemember: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    enum: ['code', 'vocal', 'other'],
    default: 'other'
  }
});

module.exports = mongoose.model('flashcard', FlashcardSchema);
