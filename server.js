require('dotenv').config();
const express = require('express');
const session = require('express-session');
//flash is used to show one time messages to user like if admin has already assigned the lecture to a particular instructor then he cannot assign any other lecture to the same instructor on the same date if he does so then he gets a one time message of 'error: already assigned the lecture to this instructor
const flash = require('connect-flash');
const path = require('path');
const connectDB = require('./config/db');

const app = express();
connectDB();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'ideamagix_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// Flash
app.use(flash());

// Routes
app.use('/', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));
app.use('/instructor', require('./routes/instructor'));

// Root redirect
app.get('/', (req, res) => {
  if (req.session.user) {
    return res.redirect(req.session.user.role === 'admin' ? '/admin/dashboard' : '/instructor/dashboard');
  }
  res.redirect('/login');
});

// 404
app.use((req, res) => {
  res.status(404).send('<h2>404 - Page Not Found</h2><a href="/">Go Home</a>');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
