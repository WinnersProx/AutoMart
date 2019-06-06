import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../index'

chai.use(chaiHttp)
let expect = chai.expect
describe('Auth', () => {
    
    it('should create a new user', (done) => {
        chai.request(app)
        .post('/api/v1/auth/signup')
        .set('Content-type', 'application/json')
        .send({
            email : 'test@gmail.com',
            first_name : 'FUserTest',
            last_name : 'LUserTest',
            password : 'secret',
            address : 'Kigali'  
        })
        .end((err, res) => {
            if (err) done(err);
            expect(res.body).to.have.status(200)
        });
    })
})