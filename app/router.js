const express = require('express');

const userController = require('./controllers/userController');

const router = express.Router();

const registerSchema = require('./schemas/registerSchema');
const loginSchema = require('./schemas/loginSchema');

const { validateBody }= require('./middlewares/validator');

router.post('/register', validateBody(registerSchema), userController.register);
router.post('/login', validateBody(loginSchema), userController.login);

module.exports = router;