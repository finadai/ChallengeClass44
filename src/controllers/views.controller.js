
exports.showRegisterPage = async (req, res) => {
    res.render('register');
};

exports.showLoginPage = async (req, res) => {
    res.render('login');
};

exports.showProductsPage = async (req, res) => {
    try {
        const user = req.session.user;

        if (!user) {
            return res.redirect('/login'); // Redireccionar a la página de inicio de sesión si no hay usuario autenticado
        }

        res.render('products', { user });
    } catch (error) {
        console.error('Error al renderizar la página de productos:', error);
        res.status(500).send('Error en el servidor');
    }
};
