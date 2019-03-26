const express = require("express");
const router = express.Router();
const Auth = require('../middleware/auth');
const AdminAuth = require('../middleware/admin-auth');
const MicrophoneController = require('../controllers/microphone');

router.post('/', Auth, MicrophoneController.microphone_create);

router.get('/', Auth, MicrophoneController.microphone_get_all);

router.get('/:microId', Auth, MicrophoneController.microphone_get_one);

router.delete('/:microId', AdminAuth, MicrophoneController.microphone_delete_one);

router.delete('/security/:userEmail', AdminAuth, MicrophoneController.microphone_delete_many_email);

module.exports = router;