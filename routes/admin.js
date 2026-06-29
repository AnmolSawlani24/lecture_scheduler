const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Course = require('../models/Course');
const Lecture = require('../models/Lecture');
const { isLoggedIn, isAdmin } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.use(isLoggedIn, isAdmin);

// ── DASHBOARD ──────────────────────────────────────
router.get('/dashboard', async (req, res) => {
  const instructorCount = await User.countDocuments({ role: 'instructor' });
  const courseCount = await Course.countDocuments();
  const lectureCount = await Lecture.countDocuments();
  const recentLectures = await Lecture.find()
    .populate('instructorId', 'name')
    .populate('courseId', 'name')
    .sort({ lectureDate: 1 })
    .limit(5);
  res.render('admin/dashboard', {
    user: req.session.user, page: 'dashboard', title: 'Dashboard',
    stats: { instructors: instructorCount, courses: courseCount, lectures: lectureCount },
    recentLectures,
    success: req.flash('success'), error: req.flash('error')
  });
});

// ── INSTRUCTORS ────────────────────────────────────
router.get('/instructors', async (req, res) => {
  const instructors = await User.find({ role: 'instructor' }).sort({ createdAt: -1 });
  res.render('admin/instructors', {
    user: req.session.user, page: 'instructors', title: 'Instructors',
    instructors, success: req.flash('success'), error: req.flash('error')
  });
});

router.post('/instructors/add', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    await User.create({ name, email, password, role: 'instructor' });
    req.flash('success', 'Instructor added successfully');
  } catch (err) {
    req.flash('error', 'Email already exists');
  }
  res.redirect('/admin/instructors');
});

router.post('/instructors/delete/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  req.flash('success', 'Instructor deleted');
  res.redirect('/admin/instructors');
});

// ── COURSES ────────────────────────────────────────
router.get('/courses', async (req, res) => {
  const courses = await Course.find().sort({ createdAt: -1 });
  res.render('admin/courses', {
    user: req.session.user, page: 'courses', title: 'Courses',
    courses, success: req.flash('success'), error: req.flash('error')
  });
});

router.post('/courses/add', upload.single('image'), async (req, res) => {
  const { name, level, description } = req.body;
  const image = req.file ? '/uploads/' + req.file.filename : null;
  await Course.create({ name, level, description, image });
  req.flash('success', 'Course added');
  res.redirect('/admin/courses');
});

router.post('/courses/delete/:id', async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  await Lecture.deleteMany({ courseId: req.params.id });
  req.flash('success', 'Course deleted');
  res.redirect('/admin/courses');
});

// ── BATCHES ────────────────────────────────────────
router.get('/courses/:id/batches', async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) return res.redirect('/admin/courses');
  res.render('admin/batches', {
    user: req.session.user, page: 'courses', title: 'Manage Batches',
    course, success: req.flash('success'), error: req.flash('error')
  });
});

router.post('/courses/:id/batches/add', async (req, res) => {
  const { batchName } = req.body;
  await Course.findByIdAndUpdate(req.params.id, { $push: { batches: { batchName } } });
  req.flash('success', 'Batch added');
  res.redirect(`/admin/courses/${req.params.id}/batches`);
});

router.post('/courses/:courseId/batches/delete/:batchId', async (req, res) => {
  await Course.findByIdAndUpdate(req.params.courseId, { $pull: { batches: { _id: req.params.batchId } } });
  req.flash('success', 'Batch deleted');
  res.redirect(`/admin/courses/${req.params.courseId}/batches`);
});

// ── LECTURES ───────────────────────────────────────
router.get('/lectures', async (req, res) => {
  const instructors = await User.find({ role: 'instructor' });
  const courses = await Course.find();
  const lectures = await Lecture.find()
    .populate('instructorId', 'name email')
    .populate('courseId', 'name')
    .sort({ lectureDate: 1 });

  // Attach batchName manually
  const lecturesWithBatch = lectures.map(l => {
    const course = courses.find(c => c._id.equals(l.courseId._id));
    const batch = course?.batches.id(l.batchId);
    return { ...l.toObject(), batchName: batch?.batchName || 'N/A', courseName: l.courseId.name };
  });

  res.render('admin/lectures', {
    user: req.session.user, page: 'lectures', title: 'Assign Lectures',
    instructors, courses, lectures: lecturesWithBatch,
    success: req.flash('success'), error: req.flash('error')
  });
});

router.post('/lectures/assign', async (req, res) => {
  const { courseId, batchId, instructorId, lectureDate } = req.body;
  try {
    // Check conflict: same instructor, same date
    const dateObj = new Date(lectureDate);
    const nextDay = new Date(dateObj);
    nextDay.setDate(nextDay.getDate() + 1);

    const conflict = await Lecture.findOne({
      instructorId,
      lectureDate: { $gte: dateObj, $lt: nextDay }
    });

    if (conflict) {
      req.flash('error', '⚠️ This instructor already has a lecture on that date! Choose another date or instructor.');
      return res.redirect('/admin/lectures');
    }

    await Lecture.create({ courseId, batchId, instructorId, lectureDate: dateObj });
    req.flash('success', '✅ Lecture assigned successfully!');
  } catch (err) {
    req.flash('error', 'Error: ' + err.message);
  }
  res.redirect('/admin/lectures');
});

router.post('/lectures/delete/:id', async (req, res) => {
  await Lecture.findByIdAndDelete(req.params.id);
  req.flash('success', 'Lecture removed');
  res.redirect('/admin/lectures');
});

module.exports = router;
