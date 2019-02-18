const express = require("express");
const router = express.Router();
const Auth = require('../middleware/auth');
const AdminAuth = require('../middleware/admin-auth');

const AccelerometerController = require('../controllers/accelerometer');

router.post('/', Auth, AccelerometerController.accelerometer_create);

router.get('/', Auth, AccelerometerController.accelerometer_get_all);

router.get('/:accId', Auth, AccelerometerController.accelerometer_get_one);

router.delete('/:accId', AdminAuth, AccelerometerController.accelerometer_delete_one);

router.delete('/security/:userEmail', AdminAuth, AccelerometerController.accelerometer_delete_many_email);

module.exports = router;