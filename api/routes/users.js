const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');

const UserController = require('../controllers/users');

router.post('/signup', UserController.user_signup);

router.post('/login', UserController.user_login);

router.get('/:username', checkAuth, UserController.user_get_by_username);

router.delete('/:username', checkAuth, UserController.user_delete);

module.exports = router;
