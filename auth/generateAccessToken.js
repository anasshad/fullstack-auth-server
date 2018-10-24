const jwt = require('jsonwebtoken');

function generateAccessToken(userId) {
    const expiresIn = '1 hour';
    const issuer = 'fullStackAuthApp';
    const audience = 'fullStackAuthApp';
    const secret = 'superSecretKey';

    const token = jwt.sign({}, secret, {
        expiresIn,
        audience,
        issuer,
        subject: userId.toString()
    })

    return token;
}

module.exports = generateAccessToken;