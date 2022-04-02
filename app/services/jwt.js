require('dotenv').config();
const JWT = require('jsonwebtoken');

exports.makeToken = (userId) => {
    try {
        return JWT.sign(
            {
                data: userId
            },
            process.env.JWT_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: '2h'
            }
        );
    } catch (error) {
        throw error;
    }
};

exports.validateToken = (token) => {
    try {
        return JWT.verify(
            token,
            process.env.JWT_SECRET,
            {
                algorithms: ['HS256']
            }
        );
    } catch (error) {
        throw error;
    }
};

exports.deleteToken = (userId) => {
    try {
        return JWT.sign(
            {
                data: userId
            },
            process.env.JWT_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: '1'
            }
        );
    } catch (error) {
        throw error;
    }
};