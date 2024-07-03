const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/models/product');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Products API', () => {
    it('Debería obtener todos los productos', (done) => {
        chai.request(app)
            .get('/api/products')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('Debería crear un nuevo producto', (done) => {
        const newProduct = {
            name: 'Test Product',
            price: 100,
            category: 'Test Category'
        };

        chai.request(app)
            .post('/api/products')
            .send(newProduct)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('name').eql('Test Product');
                done();
            });
    });

    it('Debería obtener un producto por ID', (done) => {
        const productId = '60d0fe4f5311236168a109ca'; // Cambia esto a un ID válido

        chai.request(app)
            .get(`/api/products/${productId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id').eql(productId);
                done();
            });
    });
});
