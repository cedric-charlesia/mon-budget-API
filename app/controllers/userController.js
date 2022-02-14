const { request, response } = require('express');
const User = require('../models/user');

exports.register = async (request, response) => {

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
        response.status(200).json(user);
    } catch (error) {
        response.status(500).json(error.message);
    }
}