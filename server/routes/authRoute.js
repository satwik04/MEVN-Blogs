const express = require("express");

const {body}  = require('express-validator');

const router = express.Router();

const authController = require("../controller/authControlller");

// Signup route
router.post("/signup", body('email').isEmail(), authController.postSignUp);

// Login Route
router.post("/login", authController.postLogIn);

// Reset Route
router.post("/reset", authController.postResetPassword);

// Verify Reset Token
router.get("/reset/:token", authController.getVerifyToken);

// Set New Password after Reset
router.post("/new-password", authController.postResetNewPassword);

module.exports = router;
