const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/routes/sessions.router');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Sessions API', () => {
    it('Debería iniciar sesión con credenciales válidas', (done) => {
        const loginDetails = {
            email: 'test@example.com', // Cambia esto a un email válido
            password: 'password' // Cambia esto a una contraseña válida
        };

        chai.request(app)
            .post('/api/sessions/login')
            .send(loginDetails)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message').eql('Inicio de sesión exitoso');
                done();
            });
    });

    it('Debería fallar el inicio de sesión con credenciales inválidas', (done) => {
        const loginDetails = {
            email: 'invalid@example.com',
            password: 'wrongpassword'
        };

        chai.request(app)
            .post('/api/sessions/login')
            .send(loginDetails)
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message').eql('Credenciales inválidas');
                done();
            });
    });

    it('Debería cerrar sesión correctamente', (done) => {
        chai.request(app)
            .get('/api/sessions/logout')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message').eql('Sesión cerrada correctamente');
                done();
            });
    });
});
