const express = require('express');
const router = express.Router();

// CONTROLLERS
const userController = require('./controllers/userController');

// MIDDLEWARES
const jwtMW = require('./middlewares/jwtMW');

// SCHEMAS
const registerSchema = require('./schemas/registerSchema');
const loginSchema = require('./schemas/loginSchema');

const { validateBody }= require('./middlewares/validator');

// ROUTES
router.post('/signup', validateBody(registerSchema), userController.signup);
router.post('/login', validateBody(loginSchema), userController.login);

router.get('/user/:userId(\\d+)', jwtMW, userController.findByEmail);

module.exports = router;