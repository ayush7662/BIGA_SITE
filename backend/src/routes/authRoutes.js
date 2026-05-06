const express = require("express");
const { login, signup, forgotPassword, resetPassword } = require("../controllers/authController");

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot", forgotPassword);
router.post("/reset/:token", resetPassword);

module.exports = router;
