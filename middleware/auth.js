function isLoggedIn(req, res, next) {
  if (req.session && req.session.user) return next();
  req.flash('error', 'Please login first');
  res.redirect('/login');
}

function isAdmin(req, res, next) {
  if (req.session?.user?.role === 'admin') return next();
  res.redirect('/instructor/dashboard');
}

function isInstructor(req, res, next) {
  if (req.session?.user?.role === 'instructor') return next();
  res.redirect('/admin/dashboard');
}

module.exports = { isLoggedIn, isAdmin, isInstructor };
