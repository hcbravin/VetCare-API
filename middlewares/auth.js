const { passport } = require('../config/passport');

// Middleware de autenticação (qualquer usuário logado)
exports.ehAutenticado = passport.authenticate('jwt', { session: false });

// Middleware de autorização por perfil
exports.autorizar = (perfisPermitidos) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Usuário não autenticado' });
        }
        if (perfisPermitidos.includes(req.user.perfil)) {
            return next();
        }
        return res.status(403).json({ error: 'Acesso negado: perfil não autorizado' });
    };
};