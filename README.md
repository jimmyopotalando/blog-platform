# Blog Platform

A full-stack blogging platform built with **React + Vite** on the frontend and **Node.js + Express + MongoDB** on the backend.  
It supports user authentication, role-based access (authors vs readers), post creation/editing, comments, bookmarks, and profile management.

---

## 🚀 Features
- User authentication (JWT-based)
- Role-based access (author vs reader)
- Create, edit, delete posts
- Comment threads with nested replies
- Bookmark posts for later
- Responsive UI with TailwindCSS
- RESTful API with Express + Mongoose

---
---
## 📂 Project Structure
```text
blog-platform/
├── client/          # React frontend
│   ├── src/         # Components, pages, routes, services, utils
│   └── vite.config.js
├── server/          # Node.js backend
│   ├── src/         # Config, middleware, models, controllers, routes, utils
│   └── server.js
├── docs/            # Documentation
│   ├── API.md
│   ├── DB_SCHEMA.md
│   └── README.md
├── .gitignore
├── README.md
└── package.json
```
Code

---

## ⚙️ Setup

### 1. Clone the repository
```bash
git clone https://github.com/jimmyopotalando/blog-platform.git
cd blog-platform
2. Install dependencies
Frontend:

bash
cd client
npm install
Backend:

bash
cd server
npm install
3. Configure environment variables
Create a .env file in server/:

Code
PORT=5000
MONGO_URI=mongodb://localhost:27017/blog-platform
JWT_SECRET=your_jwt_secret
4. Run the app
Frontend:

bash
npm run dev
Backend:

bash
npm run dev
📖 Documentation
API endpoints → docs/API.md

Database schema → docs/DB_SCHEMA.md

🛠 Tech Stack
Frontend: React, Vite, TailwindCSS, Axios, React Router

Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt

Dev Tools: ESLint, Nodemon, Postman

👨‍💻 Author
Developed by Jimmy Opot Alando
Mentor, developer, and community change maker.

