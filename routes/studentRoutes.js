const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentcontroller");

router.get("/", studentController.home);
router.post("/login", studentController.login);

router.get("/students", studentController.getStudents);
router.post("/students", studentController.addStudent);
router.put("/students/:id", studentController.updateStudent);
router.delete("/students/:id", studentController.deleteStudent);

module.exports = router;