const express = require('express');
const router = express.Router();

// CONTROLLERS
const userController = require('./controllers/userController');

// MIDDLEWARES
const jwtMW = require('./middlewares/jwtMW');
const userMW = require('./middlewares/userMW');

// SCHEMAS
const schema = require('./schemas/schema');

const { validateBody }= require('./middlewares/validator');

// ROUTES
router.get('/', (request, response) => {
    response.json('Welcome to "Mon budget" API!')
})

// USER ROUTES
router.post('/signup', validateBody(schema.register), userController.signup);
router.post('/login', validateBody(schema.login), userController.login);

router.get('/user/:userId(\\d+)', jwtMW, userMW, userController.findByEmail);
router.patch('/user/:userId(\\d+)', jwtMW, userMW, validateBody(schema.register), userController.update);

module.exports = router;