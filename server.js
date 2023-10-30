// server.js

const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const { login, protectedResource } = require("./controllers/authController");
const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("./controllers/userController");

app.post("/login", login);
app.get("/protected", protectedResource);

app.post("/users", createUser);
app.get("/users", getAllUsers);
app.put("/users/:id", updateUser);
app.delete("/users/:id", deleteUser);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
