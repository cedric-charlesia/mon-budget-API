const Ajv = require('ajv');
const ajv = new Ajv();
const addFormats = require("ajv-formats");
addFormats(ajv);

exports.validateBody = (schema) => (request, response, next) => {
    const validate = ajv.compile(schema);
    const body = request.body;

    const valid = validate(body);

    if (!valid) return response.status(400).json(validate.errors);
    next();
};

exports.validateQuery = (schema) => (request, response, next) => {
    const validate = ajv.compile(schema);
    const query = request.query;

    const valid = validate(query);

    if (!valid) return response.status(400).json(validate.errors);
    next();
};

exports.validateParams = (schema) => (request, response, next) => {
    const validate = ajv.compile(schema);
    const params = request.params;

    const valid = validate(params);

    if (!valid) return response.status(400).json(validate.errors);
    next();
};