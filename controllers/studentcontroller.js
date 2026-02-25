const db = require("../db/connection");

// Home check
exports.home = (req, res) => {
  res.send("server is running mahadev");
};

// Login
exports.login = (req, res) => {
  console.log(req.body);
  res.send("login data received");
};

// GET students
exports.getStudents = (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) {
      res.status(500).send("Database error");
    } else {
      res.json(result);
    }
  });
};

// ADD student
exports.addStudent = (req, res) => {
  const { name, age } = req.body;

  const sql = "INSERT INTO students (name, age) VALUES (?, ?)";

  db.query(sql, [name, age], (err) => {
    if (err) {
      res.status(500).send("Error inserting data");
    } else {
      res.send("Student added successfully");
    }
  });
};

// UPDATE student
exports.updateStudent = (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  const sql = "UPDATE students SET name = ?, age = ? WHERE id = ?";

  db.query(sql, [name, age, id], (err) => {
    if (err) {
      res.status(500).send("Error updating student");
    } else {
      res.send("Student updated successfully");
    }
  });
};

// DELETE student
exports.deleteStudent = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM students WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      res.status(500).send("Error deleting student");
    } else {
      res.send("Student deleted successfully");
    }
  });
};