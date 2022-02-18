const Transaction = require('../models/transaction');

exports.addTransaction = async (request, response) => {

    const transaction = new Transaction(request.body);
    const catId = parseInt(request.params.catId, 10);

    if (request.body.category_id === catId) {
        try {
            await transaction.save(catId);
            response.status(201).json(transaction);
        } catch (error) {
            response.status(500).json(error.message);
        }
    }
    else response.status(400).json("Category not found");

};

exports.findAllTransactions = async (request, response) => {

    const userId = parseInt(request.userId, 10);

    if (userId) {
        const transactions = await Transaction.findAllTransactions(userId);
        if (transactions.length === 0) {
            response.status(400).json(`No transactions found for this user id ${userId}`)
        }
        else response.json(transactions);
    }

};

exports.findAllTransactionsByCategories = async (request, response) => {

    const catId = parseInt(request.params.catId, 10);
    const userId = parseInt(request.userId, 10);

    if (userId) {
        const transactions = await Transaction.findAllTransactionsByCategories(catId, userId);
        if (transactions.length === 0) {
            response.status(400).json(`No transactions found for this id ${catId}`)
        }
        else response.json(transactions);
    }
};

exports.findTransactionById = async (request, response) => {

    const transactionId = parseInt(request.params.transactionId, 10);
    const catId = parseInt(request.params.catId, 10);
    const userId = parseInt(request.userId, 10);

    const transaction = await Transaction.findTransactionById(transactionId, catId, userId);
    response.json(transaction);

};

exports.update = async (request, response) => {

    const transactionId = parseInt(request.params.transactionId, 10);
    const catId = parseInt(request.params.catId, 10);

    if (request.body.category_id === catId) {
        try {
            const transaction = await new Transaction(request.body).update(catId, transactionId);

            if (transaction === null) {
                response.status(400).json(`No transaction found for this id ${transactionId}`)
            }
            else { response.status(200).json("Transaction updated"); }

        } catch (error) {
            response.status(500).json(error.message);
        }
    }

    else return response.status(400).json("This transaction was not found for this category");

};

exports.delete = async (request, response) => {

    try {
        const transactionId = parseInt(request.params.transactionId, 10);
        const catId = parseInt(request.params.catId, 10);
        const transaction = await new Transaction().delete(transactionId, catId);

        if (transaction === null) {
            response.status(400).json(`No transaction found for this id ${transactionId}`)
        }
        else { response.status(200).json("Transaction deleted"); }

    } catch (error) {
        response.status(500).json(error.message);
    }
};