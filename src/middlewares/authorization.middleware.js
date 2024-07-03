const Product = require('../models/product');
const logger = require('../utils/logger');

exports.canDeleteProduct = async (req, res, next) => {
    const productId = req.params.productId;
    const userId = req.user._id;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        if (req.user.role === 'admin' || product.owner.equals(userId)) {
            return next();
        } else {
            logger.warn(`El usuario ${userId} no está autorizado para eliminar el producto ${productId}`);
            return res.status(403).json({ message: 'No estás autorizado para realizar esta acción' });
        }
    } catch (error) {
        logger.error('Error al verificar la autorización para eliminar el producto:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
