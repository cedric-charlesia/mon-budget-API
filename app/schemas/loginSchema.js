const Ajv = require('ajv');

const loginSchema = {
    type: "object",
    properties: {
        email: {
            type: "string",
            format: "email"
        },
        password: { type: "string" },
    },
    required: ["email", "password"],
    additionalProperties: false
}

module.exports = loginSchema;