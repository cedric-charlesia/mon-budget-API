const User = require('../models/user');
const jwt = require('../services/jwt');

exports.signup = async (request, response) => {

    const user = new User(request.body);

    const { email } = user;
    const validEmail = await user.findByEmail(email);
    if (validEmail) {
        return response.status(403).json('This email has already been used');
    }

    try {
        await user.save();
        response.status(201).json(user);
    } catch (error) {
        response.status(500).json(error.message);
    }

};

exports.login = async (request, response) => {
    try {
        const user = await new User(request.body).login();

        const token = jwt.makeToken(user.id);
        response.setHeader("Access-Control-Expose-Headers", [
            "Authorization"
        ]);
        response.setHeader('Authorization', token);

        response.status(200).json(user);
    } catch (error) {
        response.status(500).json(error.message);
    }
};

exports.findById = async (request, response) => {

    if (request.userId) {

        const id = parseInt(request.userId, 10);
        const user = await User.findById(id);
        response.json(user);

    }
};

exports.verifyToken = async (request, response) => {
    try {
        const idTokenAccess = parseInt(request.userId);
        const user = await User.findById(idTokenAccess);
        response.status(200).json(user);

    } catch (error) {
        console.log(error);
        response.status(500).json(error.message);
    }
};

exports.logout = async (request, response) => {

    if (request.userId) {

        const token = jwt.deleteToken(request.userId);
        response.setHeader("Access-Control-Expose-Headers", [
            "Authorization"
        ]);
        response.setHeader('Authorization', token);
        response.json('Please login');

    }
};

exports.update = async (request, response) => {
    const id = parseInt(request.params.userId, 10);

    const user = new User(request.body);
    user.id = id;
    try {
        await user.update();

        // Removing password before sending object to controller
        Reflect.deleteProperty(user, 'password');

        response.status(200).json("Profile updated");

    } catch (error) {
        response.status(500).json(error.message);
    }
};

exports.delete = async (request, response) => {

    try {
        const id = parseInt(request.params.userId, 10);
        const user = await new User({ id }).delete();

        if (user === null) {
            response.status(400).json(`No user found for this id ${id}`)
        }
        else { response.status(200).json("User deleted"); }

    } catch (error) {
        response.status(500).json(error.message);
    }
};