const express = require("express");
const router = express.Router();

const AccelerometerController = require('../controllers/accelerometer');

router.post('/', AccelerometerController.accelerometer_create);

router.get('/', AccelerometerController.accelerometer_get_all);

router.get('/:accId', AccelerometerController.accelerometer_get_one);

router.delete('/:accId', AccelerometerController.accelerometer_delete_one);

router.delete('/security/:userEmail', AccelerometerController.accelerometer_delete_many_email);

module.exports = router;