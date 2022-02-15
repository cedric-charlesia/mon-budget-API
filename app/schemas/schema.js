const Ajv = require('ajv');

const register = {
    type: "object",
    properties: {
        username: { type: "string" },
        email: {
            type: "string",
            format: "email"
        },
        password: { type: "string", minLength: 8 },
    },
    required: ["username", "email", "password"],
    additionalProperties: false
}

const login = {
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

exports.register = register;
exports.login = login;