# MongoDB Schema Design

---

## 👤 User
```js
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: { type: String, enum: ["reader", "author"], default: "reader" },
  createdAt: Date,
  updatedAt: Date
}
