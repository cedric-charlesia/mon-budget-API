const client = require('../database');

class Transaction {

    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    };

    async save(catId) {
        try {
            const { rows } = await client.query(`
            INSERT INTO "transaction"("date", description, amount, category_id) 
                SELECT $1, $2, $3, $4 WHERE NOT EXISTS (
                    SELECT * FROM "transaction" WHERE "date"=$1 AND "description"=$2 AND amount=$3 AND category_id=$4) RETURNING id`, [
                this.date,
                this.description,
                this.amount,
                catId
            ]);
            this.id = rows[0].id;
        } catch (error) {
            if (error.detail) {
                throw new Error('Something went wrong when registrering the transaction' + error.detail);
            }
            throw error;
        }
    };

    static async findAllTransactions(userId) {
        try {
            const { rows } = await client.query('SELECT * FROM "user_transactions" WHERE user_id=$1', [userId]);

            if (rows) return rows.map(row => new Transaction(row));
            else return null;

        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw (error);
        }

    };

    static async findAllTransactionsByCategories(catId, userId) {
        try {
            const { rows } = await client.query('SELECT * FROM "user_transactions" WHERE category_id=$1 AND user_id=$2', [catId, userId]);

            if (rows) return rows.map(row => new Transaction(row));
            else return null;

        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw (error);
        }

    };

    static async findTransactionById(transactionId, catId, userId) {
        try {
            const { rows } = await client.query('SELECT * FROM "user_transactions" WHERE id=$1 AND category_id=$2 AND user_id=$3', [transactionId, catId, userId]);

            if (rows[0]) {
                const transaction = new Transaction(rows[0]);
                return transaction;
            }
            else return null;

        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw (error);
        }

    };

    async update(catId, transactionId) {
        try {
            const description = await this.description.toLowerCase();
            const { rows } = await client.query(`UPDATE "transaction" SET date=$1, description=$2, amount=$3, category_id=$4 WHERE id=$5 RETURNING *`, [
                this.date,
                description,
                this.amount,
                catId,
                transactionId
            ]);
            if (rows[0] !== undefined) return rows[0];
            else return null

        } catch (error) {
            if (error.detail) {
                throw new Error('Something went wrong when updating the category' + error.detail);
            }
            throw error;
        }
    };

    async delete(transactionId, catId) {
        try {
            const { rows } = await client.query(`SELECT * FROM "transaction" WHERE id=$1 AND category_id=$2`, [transactionId, catId]);
            if (rows[0]) {
                await client.query(`DELETE FROM "transaction" WHERE id=$1 AND category_id=$2`, [transactionId, catId]);
            }
            else return null;

        } catch (error) {
            if (error.detail) {
                throw new Error('Something went wrong when deleting the transaction' + error.detail);
            }
            throw error;
        }
    };

}

module.exports = Transaction;