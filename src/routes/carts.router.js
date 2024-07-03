const express = require('express');
const router = express.Router();
const authorize = require('../middleware/auth');
const CartController = require('../controllers/cart.controller');

router.post('/:cid/purchase', authorize('user'), CartController.purchase);
/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       required:
 *         - user
 *         - products
 *       properties:
 *         id:
 *           type: string
 *           description: ID autogenerado por MongoDB
 *         user:
 *           type: string
 *           description: ID del usuario
 *         products:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de IDs de productos
 *       example:
 *         id: 60d0fe4f5311236168a109ca
 *         user: 60d0fe4f5311236168a109cb
 *         products: [60d0fe4f5311236168a109cc, 60d0fe4f5311236168a109cd]
 */

/**
 * @swagger
 * /carts:
 *   get:
 *     summary: Retorna una lista de carritos
 *     tags: [Carts]
 *     responses:
 *       200:
 *         description: Lista de carritos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cart'
 */

router.get('/', cartController.getAllCarts);

/**
 * @swagger
 * /carts/{id}:
 *   get:
 *     summary: Obtiene un carrito por ID
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del carrito
 *     responses:
 *       200:
 *         description: Carrito obtenido por ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Carrito no encontrado
 */

router.get('/:id', cartController.getCartById);

module.exports = router;
