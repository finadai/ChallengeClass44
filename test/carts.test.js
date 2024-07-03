const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/models/cart');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Carts API', () => {
    it('Debería obtener todos los carritos', (done) => {
        chai.request(app)
            .get('/api/carts')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('Debería crear un nuevo carrito', (done) => {
        const newCart = {
            user: '60d0fe4f5311236168a109cb', 
            products: ['60d0fe4f5311236168a109cc'] 
        };

        chai.request(app)
            .post('/api/carts')
            .send(newCart)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('user').eql(newCart.user);
                done();
            });
    });

    it('Debería obtener un carrito por ID', (done) => {
        const cartId = '60d0fe4f5311236168a109cd';

        chai.request(app)
            .get(`/api/carts/${cartId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id').eql(cartId);
                done();
            });
    });
});
