const jwt = require('jsonwebtoken');

class TokenService {

    constructor () {
        this.secretKey = 'shhhht!';
    }

    createToken = (payload) => {
        const token = jwt.sign(payload, this.secretKey);
        return token;
    }


}

module.exports = new TokenService();