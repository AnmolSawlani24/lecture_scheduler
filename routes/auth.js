const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/login', (req, res) => {
  if (req.session.user) {
    return res.redirect(req.session.user.role === 'admin' ? '/admin/dashboard' : '/instructor/dashboard');
  }
  res.render('auth/login', { error: req.flash('error'), success: req.flash('success') });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/login');
    }
    req.session.user = { id: user._id, name: user.name, email: user.email, role: user.role };
    res.redirect(user.role === 'admin' ? '/admin/dashboard' : '/instructor/dashboard');
  } catch (err) {
    req.flash('error', 'Server error');
    res.redirect('/login');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

module.exports = router;
