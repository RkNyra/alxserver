const jwt = require('express-jwt');
require('dotenv').config();


const getTokenFromHeaders = (req) => {
    const { headers: { authorization } } = req;

    if(authorization && authorization.split(' ')[0] === 'Token') {
        return authorization.split(' ')[1];
    }
    return null;
};

const auth = {
    required: jwt({
        secret: process.env.JWT_TOKEN_KEY,
        algorithms: ['HS256'],
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
    })
};

module.exports = auth;
