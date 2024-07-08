function verifyAuth(req, res, next) {
    if (req.session.userId) {
        req.email = req.session.email;
        next();
    } else {
        res.status(401).send('No autenticado');
    }
};

module.exports = verifyAuth;
// module.exports = verifyAuth; (PROBAR EN CASO DE ERRORES) 