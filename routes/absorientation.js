const express = require("express");
const router = express.Router();
const Auth = require('../middleware/auth');
const AdminAuth = require('../middleware/admin-auth');

const AbsorientationController = require('../controllers/absorientation');

router.post('/', Auth, AbsorientationController.absorientation_create);

router.get('/', Auth, AbsorientationController.absorientation_get_all);

router.get('/:absId', Auth, AbsorientationController.absorientation_get_one);

router.delete('/:absId', AdminAuth, AbsorientationController.absorientation_delete_one);

router.delete('/security/:userEmail', AdminAuth, AbsorientationController.absorientation_delete_many_email);

module.exports = router;