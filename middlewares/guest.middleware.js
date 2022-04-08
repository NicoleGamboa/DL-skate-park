const tokenService = require("../services/token.service")

const guestMiddleware = (req, res, next) => {
    const authCoockie = req.cookies.Authorization;

    try {
        if(!authCoockie) { // ir a la página de invitado
            return next();
        } else {
            const token = tokenService.getToken(authCoockie);
            const isValidToken = tokenService.validateToken(token);
    
            if(isValidToken) {
                return res.redirect('/datos');
            }

        }
    } catch (error) {
        console.log('[Guest User Middleware] Error: Token no válido.');
        return next();
    }
}

module.exports = guestMiddleware;