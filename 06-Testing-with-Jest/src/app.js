const express = require("express");
const app = express();
const {
  registerUserValidationRules,
} = require("./middlewares/validation.middleware.js");

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "Hello, World!" });
// });

app.use(express.json({ limit: "16kb" }));

app.post("/register", registerUserValidationRules, (req, res) => {
  const { username, email, password } = req.body;
  res.status(201).json({
    message: "User registered successfully",
    user: {
      username,
      email,
    },
  });
});

module.exports = app;
