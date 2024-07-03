const faker = require('faker');
const Product = require('../models/product');

exports.mockProducts = (req, res) => {
    const products = [];
    for (let i = 0; i < 100; i++) {
        const product = new Product({
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            category: faker.commerce.department(),
        });
        products.push(product);
    }

    res.json(products);
};
