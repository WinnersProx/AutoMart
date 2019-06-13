import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../index'
import userModel from '../models/users'

chai.use(chaiHttp)
const expect = chai.expect
describe('Orders', () => {
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
  it('user can create a new purchase order with a 201', (done) => {
      chai
        .request(app)
        .post('/api/v1/order')
        .set('Content-type', 'application/json')
        .set('Content-type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${userModel.authToken}`)
        .send({
            amount : 142000,
            car_id : 2
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
    it('user can update the price of his purchase order', (done) => {
        chai
          .request(app)
          .patch('/order/1/price')
          .set('Content-type', 'application/json')
          .set('Content-type', 'application/x-www-form-urlencoded')
          .set('Authorization', `Bearer ${userModel.authToken}`)
          .send({
              amount : 142000
          })
          .end((err, res) => {
            if (err) done(err);
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('data')
            expect(res.body.data).to.have.property('id')
            done();
          })
      })
    
})