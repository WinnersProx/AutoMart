import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../index'
import userModel from '../models/users'

chai.use(chaiHttp)
const expect = chai.expect
describe('Cars ', () => {
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
  it('should create a new post sale ad with a 201 status', (done) => {
      chai
        .request(app)
        .post('/api/v1/car')
        .set('Content-type', 'application/json')
        .set('Content-type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${userModel.authToken}`)
        .send({
            manufacturer : "Toyota" ,
            model : "Mercedess Benz" ,
            price : 80000.00 ,
            state : "new" ,
            status : "available" ,
            body_type : "Car"
        })
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('status')
          expect(res.body.data).to.have.property('id')
          done();
        })
    })
    it('user can change the status of a car', (done) => {
        chai
          .request(app)
          .patch('/api/v1/car/1/status')
          .set('Content-type', 'application/json')
          .set('Content-type', 'application/x-www-form-urlencoded')
          .set('Authorization', `Bearer ${userModel.authToken}`)
          .send()
          .end((err, res) => {
            if (err) done(err);
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('data')
            expect(res.body.data).to.have.property('id')
            done();
          })
    })
    it('user can update the price of a his posted car ad', (done) => {
        chai
          .request(app)
          .patch('/api/v1/car/1/price')
          .set('Content-type', 'application/json')
          .set('Content-type', 'application/x-www-form-urlencoded')
          .set('Authorization', `Bearer ${userModel.authToken}`)
          .send({ amount : 152220})
          .end((err, res) => {
            if (err) done(err);
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('data')
            expect(res.body.data).to.have.property('id')
            done();
          })
    })
    it('user can view a specific car given its id', (done) => {
        chai
          .request(app)
          .get('/api/v1/car/1')
          .set('Content-type', 'application/json')
          .end((err, res) => {
            if (err) done(err);
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('data')
            expect(res.body.data).to.have.property('id')
            done();
          })
    })
    it('will return status 404 once the user accesses not existing pages', (done) => {
        chai
          .request(app)
          .get('/api/v1/car/120')
          .set('Content-type', 'application/json')
          .end((err, res) => {
            if (err) done(err);
            expect(res).to.have.status(404)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('error')
            done();
          })
    })
    it('user can view all cars', (done) => {
        chai
          .request(app)
          .get('/api/v1/car')
          .set('Content-type', 'application/json')
          .end((err, res) => {
            if (err) done(err);
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('data')
            done();
          })
    })
    it('user can view all cars given their status', (done) => { // sold, available, etc...
        chai
          .request(app)
          .get('/api/v1/car')
          .set('Content-type', 'application/json')
          .query({ status : 'available'})
          .end((err, res) => {
            if (err) done(err);
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('data')
            done();
          })
    })
    it('user can view all available cars within a price range', (done) => { 
        chai
          .request(app)
          .get('/api/v1/car')
          .set('Content-type', 'application/json')
          .query({ status : 'available', min_price : 70000, max_price : 140000})
          .end((err, res) => {
            if (err) done(err);
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('data')
            done();
          })
    })
    it('user can view cars given their status and state', (done) => { // state may be either new or used
        chai
          .request(app)
          .get('/api/v1/car')
          .set('Content-type', 'application/json')
          .query({ status : 'available', state : 'new'})
          .end((err, res) => {
            if (err) done(err);
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('data')
            done();
          })
    })
    it('user can view cars based on their manufacturer and status', (done) => { 
        chai
          .request(app)
          .get('/api/v1/car')
          .set('Content-type', 'application/json')
          .query({ status : 'available', manufacturer : 'Toyota'})
          .end((err, res) => {
            if (err) done(err);
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('data')
            done();
          })
    })
    it('user can view all posted ads of a specific body type', (done) => { 
        chai
          .request(app)
          .get('/api/v1/car')
          .set('Content-type', 'application/json')
          .query({body_type : 'Car'})
          .end((err, res) => {
            if (err) done(err);
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('data')
            done();
          })
    })
    it('user can view all posted ads of a specific body type', (done) => { 
        chai
          .request(app)
          .get('/api/v1/car')
          .set('Content-type', 'application/json')
          .query({body_type : 'Car'})
          .end((err, res) => {
            if (err) done(err);
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('data')
            done();
          })
    })
    it('user can delete his posted car ad', (done) => { 
        chai
          .request(app)
          .delete('/api/v1/car/1')
          .set('Content-type', 'application/json')
          .set('Authorization', `Bearer ${userModel.authToken}`)
          .end((err, res) => {
            if (err) done(err);
            expect(res).to.have.status(201)
            expect(res.body).to.have.property('message')
            done();
          })
    })
})