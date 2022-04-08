const jwt = require('jsonwebtoken');

class TokenService {

    constructor () {
        this.secretKey = 'shhhht!';
    }

    createToken = (payload) => {
        const token = jwt.sign(payload, this.secretKey);
        return token;
    }

    validateToken = (token) => {

        let isValid = false;

        jwt.verify(token, this.secretKey, (error, decoded) => {
            if(error) throw new Error(error);
            isValid = true;
        });

        return isValid;
    }

    getTokenPayload = (token) => {

        let payload;

        jwt.verify(token, this.secretKey, (error, decoded) => {
            if(error) throw new Error(error);
            payload = decoded;
        });

        return payload;
    }

    getToken = (cookie) => {
        const token = cookie.split(' ')[1] || '';
        return token;
    }
}

module.exports = new TokenService();