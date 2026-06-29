# 🎓 Online Lecture Scheduling Module
**Ideamagix - Test Assignment**

> A full-stack web application for managing online lecture scheduling with separate Admin and Instructor panels.

---

## 🔗 Important Links

| Resource | Link |
|---|---|
| 🌐 Live Demo | https://lecturescheduler-production.up.railway.app/login |
| 📁 GitHub Repository | https://github.com/AnmolSawlani24/lecture_scheduler |
| 🎥 Screen Recording | https://drive.google.com/file/d/1CjPZ13lU90pooknG23pqfDbsYtyftdiM/view?usp=sharing |

---

## 🔐 Login Credentials

### Admin
| Field | Value |
|---|---|
| Email | admin@ideamagix.com |
| Password | Admin@123 |
| URL | https://lecturescheduler-production.up.railway.app/login |

### Instructor
| Field | Value |
|---|---|
| Email | muskan@gmail.com |
| Password | muskan123 |
| URL | https://lecturescheduler-production.up.railway.app/login |

### Server / Hosting
| Field | Value |
|---|---|
| Platform | Railway (https://railway.app) |
| Database | MongoDB Atlas (Cloud) |
| Region | Auto (Railway) |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB Atlas (Cloud) |
| ODM | Mongoose |
| Template Engine | EJS |
| Authentication | Express Session + Bcrypt |
| File Upload | Multer |
| Hosting | Railway |

---

## ✨ Features

### Admin Panel
- ✅ Secure login / logout
- ✅ Dashboard with stats (total instructors, courses, lectures)
- ✅ Add and delete instructors
- ✅ Add courses with name, level, description, and image
- ✅ Add multiple batches per course
- ✅ Assign lectures to instructors with a specific date
- ✅ **Conflict prevention** — same instructor cannot be assigned two lectures on the same date
- ✅ View and delete all assigned lectures

### Instructor Panel
- ✅ Secure login / logout
- ✅ View all personally assigned lectures
- ✅ See course name, batch, level, description, and date for each lecture

---

## 📁 Project Structure

```
lecture-scheduler/
├── config/
│   └── db.js              # MongoDB connection
├── middleware/
│   └── auth.js            # Session auth middleware
├── models/
│   ├── User.js            # Admin & Instructor schema
│   ├── Course.js          # Course + Batch schema
│   └── Lecture.js         # Lecture assignment schema
├── routes/
│   ├── auth.js            # Login / Logout routes
│   ├── admin.js           # All admin routes
│   └── instructor.js      # Instructor routes
├── views/
│   ├── auth/
│   │   └── login.ejs
│   ├── admin/
│   │   ├── dashboard.ejs
│   │   ├── instructors.ejs
│   │   ├── courses.ejs
│   │   ├── batches.ejs
│   │   └── lectures.ejs
│   └── instructor/
│       └── dashboard.ejs
├── public/
│   ├── css/style.css
│   └── uploads/
├── seed.js                # Database seeder
├── server.js              # Entry point
├── package.json
├── .env.example
└── README.md
```

---

## 🚀 Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free) or local MongoDB

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/AnmolSawlani24/lecture_scheduler.git
cd lecture_scheduler

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env
# Edit .env and add your MongoDB URI

# 4. Seed the database
node seed.js

# 5. Start the server
npm start

# Visit http://localhost:3000
```

### Environment Variables (.env)
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/lecture_scheduler
SESSION_SECRET=ideamagix2024
PORT=3000
```

---

## 🗺️ Routes / Links

### Auth Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/login` | Login page |
| POST | `/login` | Authenticate user |
| GET | `/logout` | Logout and destroy session |

### Admin Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/admin/dashboard` | Admin dashboard with stats |
| GET | `/admin/instructors` | List all instructors |
| POST | `/admin/instructors/add` | Add new instructor |
| POST | `/admin/instructors/delete/:id` | Delete instructor |
| GET | `/admin/courses` | List all courses |
| POST | `/admin/courses/add` | Add new course |
| POST | `/admin/courses/delete/:id` | Delete course |
| GET | `/admin/courses/:id/batches` | Manage batches for a course |
| POST | `/admin/courses/:id/batches/add` | Add batch to course |
| POST | `/admin/courses/:courseId/batches/delete/:batchId` | Delete batch |
| GET | `/admin/lectures` | View & assign lectures |
| POST | `/admin/lectures/assign` | Assign lecture to instructor |
| POST | `/admin/lectures/delete/:id` | Remove lecture assignment |

### Instructor Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/instructor/dashboard` | View assigned lectures |

---

## 🔒 How Conflict Prevention Works

When assigning a lecture:
1. Admin selects course → batch → instructor → date
2. System checks if that instructor already has a lecture on that date
3. If conflict found → shows error message, blocks assignment
4. If no conflict → saves successfully

```
Same instructor + Same date = ❌ Blocked
Same instructor + Different date = ✅ Allowed
Different instructor + Same date = ✅ Allowed
```

---

## 📦 Database Dump

MongoDB data export included in `/database-dump/` folder.


```

---

by Anmol Sawlani*