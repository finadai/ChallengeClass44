const authorize = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        if (!req.session.user) {
            return res.status(401).json({ message: 'No autenticado' });
        }

        if (roles.length && !roles.includes(req.session.user.role)) {
            return res.status(403).json({ message: 'No autorizado' });
        }

        next();
    };
};

module.exports = authorize;
