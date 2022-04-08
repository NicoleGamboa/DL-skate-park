const tokenService = require("../services/token.service");

const authMiddleware = (req, res, next) => {
    try {
        const token = tokenService.getToken(req.cookies.Authorization);
        const tokenIsValid = tokenService.validateToken(token);
        if(tokenIsValid) return next();
        return res.redirect('/login');
    } catch (error) {
        return res.redirect('/login');
    }

};

module.exports = authMiddleware;