const express = require("express");
const router = express.Router();
const Auth = require('../middleware/auth');
const AdminAuth = require('../middleware/admin-auth');

const LinaccelerationController = require('../controllers/linacceleration');

router.post('/', Auth, LinaccelerationController.linacceleration_create);

router.get('/', Auth, LinaccelerationController.linacceleration_get_all);

router.get('/:linaccId', Auth, LinaccelerationController.linacceleration_get_one);

router.delete('/:linaccId', AdminAuth, LinaccelerationController.linacceleration_delete_one);

router.delete('/security/:userEmail', AdminAuth, LinaccelerationController.linacceleration_delete_many_email);

module.exports = router;