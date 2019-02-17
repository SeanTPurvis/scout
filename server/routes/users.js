const express = require("express");
const router = express.Router();
const Auth = require('../middleware/auth');

const UserController = require('../controllers/user');

router.post('/signup', UserController.user_signup);

router.post("/login", UserController.user_login);

router.delete("/:userId", Auth, UserController.user_delete);

module.exports = router;