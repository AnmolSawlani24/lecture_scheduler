const express = require('express');
const router = express.Router();
const Lecture = require('../models/Lecture');
const Course = require('../models/Course');
const { isLoggedIn, isInstructor } = require('../middleware/auth');

router.use(isLoggedIn, isInstructor);

router.get('/dashboard', async (req, res) => {
  const lectures = await Lecture.find({ instructorId: req.session.user.id })
    .populate('courseId', 'name level description image')
    .sort({ lectureDate: 1 });

  const courses = await Course.find();
  const lecturesWithBatch = lectures.map(l => {
    const course = courses.find(c => c._id.equals(l.courseId._id));
    const batch = course?.batches.id(l.batchId);
    return { ...l.toObject(), batchName: batch?.batchName || 'N/A' };
  });

  res.render('instructor/dashboard', {
    user: req.session.user, title: 'My Lectures',
    lectures: lecturesWithBatch,
    success: req.flash('success'), error: req.flash('error')
  });
});

module.exports = router;
