require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/User');
const Course = require('./models/Course');
const Lecture = require('./models/Lecture');

async function seed() {
  await connectDB();

  // Clear existing
  await User.deleteMany({});
  await Course.deleteMany({});
  await Lecture.deleteMany({});

  // Create admin
  await User.create({
    name: 'Admin',
    email: 'admin@ideamagix.com',
    password: 'Admin@123',
    role: 'admin'
  });

  // Create instructors
  await User.create([
    { name: 'Rahul Sharma', email: 'rahul@ideamagix.com', password: 'password', role: 'instructor' },
    { name: 'Priya Mehta',  email: 'priya@ideamagix.com',  password: 'password', role: 'instructor' }
  ]);

  // Create courses with batches
  await Course.create([
    {
      name: 'Web Development Bootcamp',
      level: 'Beginner',
      description: 'Learn HTML, CSS, JavaScript from scratch',
      batches: [{ batchName: 'Batch A - Morning' }, { batchName: 'Batch B - Evening' }]
    },
    {
      name: 'React Masterclass',
      level: 'Intermediate',
      description: 'Deep dive into React and its ecosystem',
      batches: [{ batchName: 'Batch A - Weekend' }]
    },
    {
      name: 'Node.js Advanced',
      level: 'Advanced',
      description: 'Backend development with Node.js and MongoDB',
      batches: [{ batchName: 'Batch A - Weekday' }]
    }
  ]);

  console.log('✅ Seed data inserted!');
  console.log('Admin: admin@ideamagix.com / Admin@123');
  console.log('Instructor: rahul@ideamagix.com / password');
  console.log('Instructor: priya@ideamagix.com / password');
  process.exit();
}

seed().catch(err => { console.error(err); process.exit(1); });
