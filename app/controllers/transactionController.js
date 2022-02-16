const Transaction = require('../models/transaction');

exports.addTransaction = async (request, response) => {

    const transaction = new Transaction(request.body);
    const catId = request.params.catId;
    try {
        await transaction.save(catId);
        response.status(201).json(transaction);
    } catch (error) {
        response.status(500).json(error.message);
    }

};

exports.findAllCategories = async (request, response) => {

    const userId = parseInt(request.userId, 10);
    const categories = await Category.findAllCategories(userId);
    response.json(categories);

};

exports.findCategoryById = async (request, response) => {

    const catId = parseInt(request.params.catId, 10);
    const userId = parseInt(request.userId, 10);

    const category = await Category.findCategoryById(catId, userId);
    response.json(category);

};

exports.update = async (request, response) => {

    try {
        const catId = parseInt(request.params.catId, 10);
        await new Category(request.body).update(catId);

        response.status(200).json("Category updated");

    } catch (error) {
        response.status(500).json(error.message);
    }
};

exports.delete = async (request, response) => {

    try {
        const catId = parseInt(request.params.catId, 10);
        await new Category().delete(catId);

        response.status(200).json("Category deleted");

    } catch (error) {
        response.status(500).json(error.message);
    }
};