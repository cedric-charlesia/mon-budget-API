const Category = require('../models/category');

exports.addCategory = async (request, response) => {

    const category = new Category(request.body);
    const userId = request.userId;

    if (request.body.user_id === userId) {
        try {
            await category.save(userId);
            response.status(201).json(category);
        } catch (error) {
            response.status(500).json(`This category already exists. Impossible to save category: ${error.message}`);
        }
    }
    else response.status(400).json("User not found");

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
    if (category === null) {
        response.status(400).json(`This category was not found for this user id ${userId}`)
    }
    else response.json(category);

};

exports.update = async (request, response) => {

    const userId = parseInt(request.userId, 10);

    if (userId === request.body.user_id) {
        try {
            const catId = parseInt(request.params.catId, 10);
            const category = await new Category(request.body).update(catId, userId);

            if (category === null) {
                response.status(400).json(`No category found for this id ${catId}`)
            }
            else { response.status(200).json("Category updated"); }

        } catch (error) {
            response.status(500).json(error.message);
        }

    }

    else response.status(400).json("This category was not found for this user");

};

exports.delete = async (request, response) => {

    try {
        const userId = parseInt(request.userId, 10);
        const catId = parseInt(request.params.catId, 10);
        const category = await new Category().delete(catId, userId);

        if (category === null) {
            response.status(400).json(`No category found for this id ${catId}`)
        }
        else { response.status(200).json("Category deleted"); }

    } catch (error) {
        response.status(500).json(error.message);
    }
};