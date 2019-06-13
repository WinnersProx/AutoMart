import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../index'
import userModel from '../models/users'

chai.use(chaiHttp)
const expect = chai.expect
describe('Auth ', () => {
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
  it('should return an object with status 201 when a user signs up', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .set('Content-type', 'application/json')
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send({
            email : "test@gmail.com",
            first_name : "Test",
            last_name : "Test",
            password : "secret",
            password_confirm : "secret",
            address : "Kigali KK309"
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('data')
          done();
        })
  })
  it('should return an object with status 403 when a creates an existing account', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .set('Content-type', 'application/json')
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send({
            email : "test@gmail.com",
            first_name : "Test",
            last_name : "Test",
            password : "secret",
            password_confirm : "secret",
            address : "Kigali KK309"
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(403)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error')
          done();
        })
  })
  
  it('should return an object with status 200 when a user signs in', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .set('content-type', 'application/json')
        .set('Content-type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${userModel.authToken}`)
        .send()
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body.data).to.have.property('token')
          done();
        })
    })
    it('should have a status 200 and a message when the user signs out', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signout')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${userModel.authToken}`)
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200)
          expect(res.body).to.have.property('message')
          done();
        })
    })
    it('should initialize password reset process and send a reset link url', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/reset-password')
        .set('content-type', 'application/json')
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send({ email : "bihames4vainqueur@gmail.com"})
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(200)
          expect(res.body.data).to.have.property('url')
          done();
        })
    })
    it('Should return a 404 status for not found pages', (done) => {
      chai
        .request(app)
        .get('**')
        .set('content-type', 'application/json')
        .set('Content-type', 'application/x-www-form-urlencoded')
        .send()
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(403)
          done();
        })
    })
})