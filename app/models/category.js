const client = require('../database');

class Category {

    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    };

    async save(userId) {
        try {
            const { rows } = await client.query('INSERT INTO "category"(tag, type, user_id) VALUES($1, $2, $3) RETURNING id', [
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

    static async findById(id) {
        try {
            const { rows } = await client.query('SELECT * FROM "user" WHERE id=$1', [id]);

            if (rows[0] && (id === rows[0].id)) {
                const user = new User(rows[0]);
                Reflect.deleteProperty(user, 'password');
                return user;
            }
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw (error);
        }
        
    };

    async update() {
        try {
            const email = await this.email.toLowerCase();
            const password = await bcrypt.hash(this.password, 10);

            const { rows } = await client.query(`UPDATE "user" SET username=$1, email=$2, password=$3 WHERE id=$4 RETURNING *`, [
                this.username,
                email,
                password,
                this.id
            ]);
            return rows[0];
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    };

    async delete() {
        try {
            await client.query(`DELETE FROM "user" WHERE id=$1`, [this.id]);
        } catch (error) {
            if (error.detail) {
                throw new Error('Something went wrong when deleting the user' + error.detail);
            }
            throw error;
        }
    }

}

module.exports = Category;