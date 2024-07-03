const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - category
 *       properties:
 *         id:
 *           type: string
 *           description: ID autogenerado por MongoDB
 *         name:
 *           type: string
 *           description: Nombre del producto
 *         price:
 *           type: string
 *           description: Precio del producto
 *         category:
 *           type: string
 *           description: Categoría del producto
 *       example:
 *         id: 60d0fe4f5311236168a109ca
 *         name: Producto 1
 *         price: 100
 *         category: Categoría 1
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retorna una lista de productos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

router.get('/', productsController.getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtiene un producto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto obtenido por ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 */

router.get('/:id', productsController.getProductById);

// Agrega más endpoints de productos aquí...

module.exports = router;
