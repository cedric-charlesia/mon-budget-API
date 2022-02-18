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

exports.findAllTransactions = async (request, response) => {

    const catId = parseInt(request.params.catId, 10);
    const transactions = await Transaction.findAllTransactions(catId);
    response.json(transactions);

};

exports.findTransactionById = async (request, response) => {

    const transactionId = parseInt(request.params.transactionId, 10);
    const catId = parseInt(request.params.catId, 10);

    const transaction = await Transaction.findTransactionById(transactionId, catId);
    response.json(transaction);

};

exports.update = async (request, response) => {

    try {
        const catId = parseInt(request.params.catId, 10);
        const transactionId = parseInt(request.params.transactionId, 10);
        const transaction = await new Transaction(request.body).update(catId, transactionId);

        if (transaction === null) {
            response.status(400).json(`No transaction found for this id ${transactionId}`)
        }
        else { response.status(200).json("Transaction updated"); }

    } catch (error) {
        response.status(500).json(error.message);
    }
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