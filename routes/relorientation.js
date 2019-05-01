const express = require("express");
const router = express.Router();
const Auth = require('../middleware/auth');
const AdminAuth = require('../middleware/admin-auth');

const RelorientationController = require('../controllers/relorientation');

router.post('/', Auth, RelorientationController.relorientation_create);

router.get('/', Auth, RelorientationController.relorientation_get_all);

router.get('/:relId', Auth, RelorientationController.relorientation_get_one);

router.delete('/:relId', AdminAuth, RelorientationController.relorientation_delete_one);

router.delete('/security/:userEmail', AdminAuth, RelorientationController.relorientation_delete_many_email);

module.exports = router;