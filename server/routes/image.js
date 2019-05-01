const express = require("express");
const router = express.Router();
const Auth = require('../middleware/auth');
const AdminAuth = require('../middleware/admin-auth');
const ImageController = require('../controllers/image');

router.post('/', Auth, ImageController.image_create);

router.get('/', Auth, ImageController.image_get_all);

router.get('/:imageId', Auth, ImageController.image_get_one);

router.delete('/:imageId', AdminAuth, ImageController.image_delete_one);

router.delete('/security/:userEmail', AdminAuth, ImageController.image_delete_many_email);

module.exports = router;