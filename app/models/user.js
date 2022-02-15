const client = require('../database');
const bcrypt = require('bcryptjs');

class User {

    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    };

    async save() {
        try {
            const email = await this.email.toLowerCase();
            const password = await bcrypt.hash(this.password, 10);
            const { rows } = await client.query('INSERT INTO "user"(username, email, password) VALUES($1, $2, $3) RETURNING id', [
                this.username,
                email,
                password
            ]);
            this.id = rows[0].id;
        } catch (error) {
            console.log(error);

            if (error.detail) {
                throw new Error('Something went wrong when registrering the user' + error.detail);
            }
            throw error;
        }
    };

    async login() {
        try {
            const { rows } = await client.query('SELECT * FROM "user" WHERE email=$1', [this.email.toLowerCase()]);

            if (!rows[0]) throw new Error('Identification failed');

            const isPwdValid = await bcrypt.compare(this.password, rows[0].password);

            if (!isPwdValid) throw new Error('Invalid password');

            const user = new User(rows[0]);
            Reflect.deleteProperty(user, 'password');
            return user;

        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    };

    static async findByEmail(id) {
        const { rows } = await client.query('SELECT * FROM "user" WHERE id=$1', [id]);

        if (rows[0] && (id === rows[0].id)) {
            const user = new User(rows[0]);
            Reflect.deleteProperty(user, 'password');
            return user;
        }
        else {
            return null;
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
    }

}

module.exports = User;