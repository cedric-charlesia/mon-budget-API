const User = require('../models/user');
const jwt = require('../services/jwt');

exports.signup = async (request, response) => {

    const user = new User(request.body);

    try {
        await user.save();
        response.status(201).json(user);
    } catch (error) {

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
}

exports.findByEmail = async (request, response) => {

    if (request.userId) {

        const id = parseInt(request.userId, 10);
        const user = await User.findByEmail(id);
        response.json(user);

    }
}