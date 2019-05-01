const express = require("express");
const router = express.Router();
const AdminAuth = require('../middleware/admin-auth');

const UserController = require('../controllers/user');

router.post('/signup', UserController.user_signup);

router.post("/login", UserController.user_login);

router.delete("/:userId", AdminAuth, UserController.user_delete);

module.exports = router;