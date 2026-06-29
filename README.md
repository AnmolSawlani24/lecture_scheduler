# 🎓 Online Lecture Scheduling Module
**Ideamagix - Test Assignment**

## Tech Stack
- **Backend:** Node.js + Express.js
- **Database:** MongoDB Atlas (Cloud)
- **Frontend:** EJS Templates + Vanilla CSS/JS
- **Auth:** Session-based with bcrypt password hashing

## Features

### Admin Panel
- ✅ View dashboard with stats (instructors, courses, lectures)
- ✅ Add/delete instructors
- ✅ Add/delete courses (with name, level, description, image)
- ✅ Add/delete batches per course
- ✅ Assign lectures to instructors with date
- ✅ **Conflict prevention** — same instructor cannot be assigned two lectures on the same date

### Instructor Panel
- ✅ View all assigned lectures with course details, batch name, and date

---

## Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free)

### Steps

```bash
# 1. Clone / unzip project
cd lecture-scheduler

# 2. Install dependencies
npm install

# 3. Set up .env
cp .env.example .env
# Edit .env and add your MongoDB Atlas URI

# 4. Seed the database
node seed.js

# 5. Start server
npm start
# Visit http://localhost:3000
```

---

## Environment Variables (.env)
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/lecture_scheduler
SESSION_SECRET=your_secret_here
PORT=3000
```

---

## Login Credentials

| Role       | Email                    | Password  |
|------------|--------------------------|-----------|
| Admin      | admin@ideamagix.com      | Admin@123 |
| Instructor | rahul@ideamagix.com      | password  |
| Instructor | priya@ideamagix.com      | password  |

---

## Routes

| Method | Route                                      | Description               |
|--------|--------------------------------------------|---------------------------|
| GET    | /login                                     | Login page                |
| POST   | /login                                     | Authenticate user         |
| GET    | /logout                                    | Logout                    |
| GET    | /admin/dashboard                           | Admin dashboard           |
| GET    | /admin/instructors                         | List instructors          |
| POST   | /admin/instructors/add                     | Add instructor            |
| POST   | /admin/instructors/delete/:id              | Delete instructor         |
| GET    | /admin/courses                             | List courses              |
| POST   | /admin/courses/add                         | Add course                |
| POST   | /admin/courses/delete/:id                  | Delete course             |
| GET    | /admin/courses/:id/batches                 | Manage batches            |
| POST   | /admin/courses/:id/batches/add             | Add batch                 |
| POST   | /admin/courses/:cId/batches/delete/:bId    | Delete batch              |
| GET    | /admin/lectures                            | Assign lectures page      |
| POST   | /admin/lectures/assign                     | Assign lecture            |
| POST   | /admin/lectures/delete/:id                 | Remove lecture            |
| GET    | /instructor/dashboard                      | Instructor's lectures     |

---

## Deployment (Railway)
1. Push code to GitHub (exclude `.env`)
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Add environment variables in Railway dashboard
4. Done! Railway auto-detects Node.js
