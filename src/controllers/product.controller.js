const Product = require('../models/product');
const logger = require('../utils/logger');

exports.deleteProduct = async (req, res, next) => {
    const { pid } = req.params;

    try {
        const product = await Product.findById(pid);

        if (!product) {
            logger.warn(`Product with id ${pid} not found`);
            return res.status(404).json({ message: 'Product not found' });
        }

        if (req.user.role === 'admin' || (req.user.role === 'premium' && product.owner.equals(req.user._id))) {
            await product.remove();
            logger.info(`Product ${pid} deleted`);
            return res.status(200).json({ message: 'Product deleted successfully' });
        } else {
            logger.warn(`User ${req.user.email} does not have permission to delete product ${pid}`);
            return res.status(403).json({ message: 'Permission denied' });
        }
    } catch (error) {
        logger.error(`Error deleting product ${pid}:`, error);
        next(error);
    }
};
