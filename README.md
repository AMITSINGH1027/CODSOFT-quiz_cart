# 🚀 QuizCart – Full Stack Quiz Platform

QuizCart is a production-ready full-stack quiz application with role-based authentication, admin dashboard, analytics, and secure password system.

🌐 Live Demo  
Frontend: https://quizcart-frontend.onrender.com  
Backend API: https://quizcart-backend.onrender.com  

---

## 🛠 Tech Stack

Frontend:
- React (Vite)
- Tailwind CSS
- Axios
- React Router

Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt (Password hashing)

Deployment:
- Render (Frontend + Backend)
- MongoDB Atlas

---

## 🔐 Features

### 👤 User Features
- Register & Login
- JWT Authentication
- Take quizzes
- View quiz results
- Password reset
- Role-based access

### 👑 Admin Features
- Admin Dashboard
- Manage Users (Change role / Delete user)
- Manage Quizzes
- Result Analytics
- Settings panel

---

## 📊 Admin Dashboard Includes
- Total Users
- Total Quizzes
- Total Attempts
- Average Score
- User management table

---

## 🔐 Security Features
- Password hashing using bcrypt
- JWT-based authentication
- Role-based route protection
- Protected admin routes

---

## 📸 Screenshots

### 🔐 Login Page
![Login](./screenshots/login.png)

### 📊 Admin Dashboard
![Admin](./screenshots/admin.png)

### 👥 Manage Users
![Users](./screenshots/manage-users.png)

### 📈 Analytics
![Analytics](./screenshots/analytics.png)

---

## ⚙ Installation (Local Setup)

```bash
# Clone repo
git clone https://github.com/YOUR_USERNAME/quizcart.git

# Install backend
cd backend
npm install

# Install frontend
cd ../frontend
npm install
