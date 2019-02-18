const express = require("express");
const router = express.Router();

const GyroscopeController = require('../controllers/gyroscope');

router.post('/', GyroscopeController.gyroscope_create);

router.get('/', GyroscopeController.gyroscope_get_all);

router.get('/:gyroId', GyroscopeController.gyroscope_get_one);

router.delete('/:gyroId', GyroscopeController.gyroscope_delete_one);

router.delete('/security/:userEmail', GyroscopeController.gyroscope_delete_many_email);

module.exports = router;