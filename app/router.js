const express = require('express');
const router = express.Router();

// CONTROLLERS
const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');

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
router.get('/signup', (_, response) => { response.json('Register page!') })
router.get('/login', (_, response) => { response.json('Login page!') })

router.post('/signup', validateBody(schema.register), userController.signup);
router.post('/login', validateBody(schema.login), userController.login);

router.get('/user/:userId(\\d+)', jwtMW, userMW, userController.findById);
router.get('/tokenaccess', jwtMW, userController.verifyToken);

router.patch('/user/:userId(\\d+)', jwtMW, userMW, validateBody(schema.register), userController.update);
router.delete('/user/:userId(\\d+)', jwtMW, userMW, userController.delete);

// CATEGORIES ROUTES
router.post('/user/:userId(\\d+)/categories', jwtMW, userMW, validateBody(schema.category), categoryController.addCategory);
router.get('/user/:userId(\\d+)/categories', jwtMW, userMW, categoryController.findAllCategories);
router.get('/user/:userId(\\d+)/categories/:catId(\\d+)', jwtMW, userMW, categoryController.findCategoryById);

router.patch('/user/:userId(\\d+)/categories/:catId(\\d+)', jwtMW, userMW, validateBody(schema.category), categoryController.update);
router.delete('/user/:userId(\\d+)/categories/:catId(\\d+)', jwtMW, userMW, categoryController.delete);

module.exports = router;