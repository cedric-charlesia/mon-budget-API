const client = require('../database');
const { category } = require('../schemas/schema');

class Category {

    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    };

    async save(userId) {
        try {
            const { rows } = await client.query(`
            INSERT INTO "category"(tag, type, user_id) 
                SELECT $1, $2, $3 WHERE NOT EXISTS (
                    SELECT * FROM "category" WHERE tag=$1 AND type=$2 AND user_id=$3) RETURNING id`, [
                this.tag,
                this.type,
                userId
            ]);
            this.id = rows[0].id;
        } catch (error) {
            if (error.detail) {
                throw new Error('Something went wrong when registrering the category' + error.detail);
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
            const { rows } = await client.query(`UPDATE "category" SET tag=$1, type=$2, user_id=$3 WHERE id=$4 RETURNING *`, [
                this.tag,
                this.type,
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

module.exports = Category;