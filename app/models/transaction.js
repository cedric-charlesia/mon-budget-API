const client = require('../database');

class Transaction {

    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    };

    async save(catId) {
        try {
            const { rows } = await client.query('INSERT INTO "transaction"(date, description, amount, category_id) VALUES($1, $2, $3, $4) RETURNING id', [
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

    static async findAllCategories(userId) {
        try {
            const { rows } = await client.query('SELECT * FROM "category" WHERE user_id=$1', [userId]);

            if (rows) return rows.map(row => new Category(row));
            else return null;

        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw (error);
        }
        
    };

    static async findCategoryById(catId, userId) {
        try {
            const { rows } = await client.query('SELECT * FROM "category" WHERE id=$1 AND user_id=$2', [catId, userId]);

            if (rows[0]) {
                const category = new Category(rows[0]);
                return category;
            }
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw (error);
        }
        
    };

    async update(catId) {
        try {
            const tag = await this.tag.toLowerCase();
            const type = await this.type.toLowerCase();
            const { rows } = await client.query(`UPDATE "category" SET tag=$1, type=$2, user_id=$3 WHERE id=$4 RETURNING *`, [
                tag,
                type,
                this.userId,
                catId
            ]);
            return rows[0];

        } catch (error) {
            if (error.detail) {
                throw new Error('Something went wrong when updating the category' + error.detail);
            }
            throw error;
        }
    };

    async delete(catId) {
        try {
            await client.query(`DELETE FROM "category" WHERE id=$1`, [catId]);

        } catch (error) {
            if (error.detail) {
                throw new Error('Something went wrong when deleting the category' + error.detail);
            }
            throw error;
        }
    };

}

module.exports = Transaction;