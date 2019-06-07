import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../index'
import userModel from '../models/users'

chai.use(chaiHttp)
const expect = chai.expect
describe('Flags', () => {
  before((done) => {
    chai.request(app)
    .post('/api/v1/auth/signin')
    .set('Content-type', 'application/json')
    .set('Content-type', 'application/x-www-form-urlencoded')
    .send({ email : "bihames4vainqueur@gmail.com", password : "secret"})
    .then((res) => {
      done()
    })
    
  })
  it('user can flag or report a posted ad', (done) => {
      chai
        .request(app)
        .post('/api/v1/flag/0')
        .set('Content-type', 'application/json')
        .set('Content-type', 'application/x-www-form-urlencoded')
        .set('Authorization', userModel.getAuth())
        .send({
            reason : 'Price',
            description : 'Highest price along the market'
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('data')
          expect(res.body.data).to.have.property('id')
          done();
        })
    })
    
})