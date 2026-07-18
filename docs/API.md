# API Endpoints

Base URL: `/api`

---

## 🔑 Authentication
- **POST** `/api/auth/register` → Register a new user
- **POST** `/api/auth/login` → Login and receive JWT
- **POST** `/api/auth/logout` → Logout (invalidate token)

---

## 👤 Users
- **GET** `/api/users/profile` → Get logged-in user profile
- **PUT** `/api/users/profile` → Update profile
- **GET** `/api/users/:id` → Get user by ID

---

## 📝 Posts
- **GET** `/api/posts` → Get all posts
- **GET** `/api/posts/:id` → Get single post
- **POST** `/api/posts` → Create new post (author only)
- **PUT** `/api/posts/:id` → Update post (author only)
- **DELETE** `/api/posts/:id` → Delete post (author only)

---

## 💬 Comments
- **GET** `/api/comments/:postId` → Get comments for a post
- **POST** `/api/comments/:postId` → Add comment to a post
- **DELETE** `/api/comments/:id` → Delete comment

---

## 📌 Bookmarks
- **POST** `/api/bookmarks` → Add bookmark
- **GET** `/api/bookmarks` → Get all bookmarks for user
- **DELETE** `/api/bookmarks/:id` → Remove bookmark
