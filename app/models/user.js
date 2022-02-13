const client = require('../database');
const bcrypt = require('bcryptjs');

class User {

    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    async save() {
        try {
            const password = await bcrypt.hash(this.password, 10);
            const { rows } = await client.query('INSERT INTO "user"(username, email, password) VALUES($1, $2, $3) RETURNING id', [
                this.username,
                this.email,
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
    }

}

module.exports = User;