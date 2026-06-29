const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  batchName: { type: String, required: true }
}, { timestamps: true });

const courseSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  level:       { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  description: { type: String },
  image:       { type: String },
  batches:     [batchSchema]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
