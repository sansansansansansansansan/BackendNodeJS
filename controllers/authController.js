const jwt = require("jsonwebtoken");
const db = require("../db/db");
const { secretKey } = require("../config/config");
const { generateToken } = require("../services/authService");

const login = (req, res) => {
  const { username, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE username = $1 AND password = $2",
    [username, password],
    (error, result) => {
      if (error) {
        console.error("Error executing query", error);
        return res.status(500).json({ message: "Database error" });
      }

      if (result.rows.length === 1) {
        const user = result.rows[0];
        const token = generateToken(user);
        res.json({ token });
      } else {
        res.status(401).json({ message: "Authentication failed" });
      }
    }
  );
};

const protectedResource = (req, res) => {
  // Verify and decode the JWT
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      } else {
        return res
          .status(401)
          .json({ message: `Token invalid [${secretKey}] [${token}]` });
      }
    }

    res.json({ message: "Protected resource", user: decoded });
  });
};

module.exports = { login, protectedResource };
