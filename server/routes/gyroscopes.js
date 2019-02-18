const express = require("express");
const router = express.Router();
const Auth = require('../middleware/auth');
const AdminAuth = require('../middleware/admin-auth');
const GyroscopeController = require('../controllers/gyroscope');

router.post('/', Auth, GyroscopeController.gyroscope_create);

router.get('/', Auth, GyroscopeController.gyroscope_get_all);

router.get('/:gyroId', Auth, GyroscopeController.gyroscope_get_one);

router.delete('/:gyroId', AdminAuth, GyroscopeController.gyroscope_delete_one);

router.delete('/security/:userEmail', AdminAuth, GyroscopeController.gyroscope_delete_many_email);

module.exports = router;