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
router.get('/signup', (_, response) => {
    response.json('Register page!')
})
router.get('/login', (_, response) => {
    response.json('Login page!')
})

router.post('/signup', validateBody(schema.register), userController.signup);
router.post('/login', validateBody(schema.login), userController.login);

router.get('/user/:userId(\\d+)', jwtMW, userMW, userController.findById);
router.get('/tokenaccess', jwtMW, userController.verifyToken);

router.patch('/user/:userId(\\d+)', jwtMW, userMW, validateBody(schema.register), userController.update);
router.delete('/user/:userId(\\d+)', jwtMW, userMW, userController.delete);

module.exports = router;