const express = require("express");
const router = express.Router();
const Auth = require('../middleware/auth');
const AdminAuth = require('../middleware/admin-auth');

const AmbientlightController = require('../controllers/ambientlight');

router.post('/', Auth, AmbientlightController.ambientlight_create);

router.get('/', Auth, AmbientlightController.ambientlight_get_all);

router.get('/:ambId', Auth, AmbientlightController.ambientlight_get_one);

router.delete('/:ambId', AdminAuth, AmbientlightController.ambientlight_delete_one);

router.delete('/security/:userEmail', AdminAuth, AmbientlightController.ambientlight_delete_many_email);

module.exports = router;