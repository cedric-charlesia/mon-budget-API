const Category = require('../models/category');
const User = require('../models/category');

exports.addCategory = async (request, response) => {

    const category = new Category(request.body);
    const userId = request.userId;

    try {
        await category.save(userId);
        response.status(201).json(category);
    } catch (error) {
        response.status(500).json(`Impossible to save the category: ${error.message}`);
    }

};

exports.findById = async (request, response) => {

    if (request.userId) {

        const id = parseInt(request.userId, 10);
        const user = await User.findById(id);
        response.json(user);

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
        await new User({ id }).delete();

        response.status(200).json("User deleted");

    } catch (error) {
        response.status(500).json(error.message);
    }
};