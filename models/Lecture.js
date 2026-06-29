const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  courseId:     { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  batchId:      { type: mongoose.Schema.Types.ObjectId, required: true },
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lectureDate:  { type: Date, required: true }
}, { timestamps: true });

// Prevent same instructor being assigned twice on same date
lectureSchema.index({ instructorId: 1, lectureDate: 1 }, { unique: true });

module.exports = mongoose.model('Lecture', lectureSchema);
