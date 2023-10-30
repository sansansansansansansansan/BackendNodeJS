// controllers/userController.js

const db = require("../db/db");

const createUser = (req, res) => {
  const { username, password } = req.body;
  const query =
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *";

  db.query(query, [username, password], (error, result) => {
    if (error) {
      console.error("Error creating user", error);
      return res.status(500).json({ message: "User creation failed" });
    }

    const newUser = result.rows[0];
    res.json(newUser);
  });
};

const getAllUsers = (req, res) => {
  const query = "SELECT id, username FROM users";

  db.query(query, (error, result) => {
    if (error) {
      console.error("Error fetching users", error);
      return res.status(500).json({ message: "User retrieval failed" });
    }

    const users = result.rows;
    res.json(users);
  });
};

const updateUser = (req, res) => {
  const userId = req.params.id;
  const { username, password } = req.body;
  const query =
    "UPDATE users SET username = $1, password = $2 WHERE id = $3 RETURNING *";

  db.query(query, [username, password, userId], (error, result) => {
    if (error) {
      console.error("Error updating user", error);
      return res.status(500).json({ message: "User update failed" });
    }

    const updatedUser = result.rows[0];
    res.json(updatedUser);
  });
};

const deleteUser = (req, res) => {
  const userId = req.params.id;
  const query = "DELETE FROM users WHERE id = $1";

  db.query(query, [userId], (error) => {
    if (error) {
      console.error("Error deleting user", error);
      return res.status(500).json({ message: "User deletion failed" });
    }

    res.json({ message: "User deleted successfully" });
  });
};

module.exports = { createUser, getAllUsers, updateUser, deleteUser };
