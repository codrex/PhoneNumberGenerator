const request = require('supertest');
const app = require('../app');

describe('App', () => {
  describe('GET / ', () => {
    it('respond with html string', (done) => {
      request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(200)
        .end((err, res) => {
          expect(res.text).toMatchSnapshot();
          done();
        });
    });
  });

  describe('GET /sort/:order ', () => {
    it('respond with html string', (done) => {
      request(app)
        .get('/sort/ASC')
        .set('Accept', 'application/json')
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(200, done);
    });
  });

  describe('POST /generate/:number ', () => {
    it('respond with html string', (done) => {
      request(app)
        .post('/generate/100')
        .set('Accept', 'application/json')
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(200, done);
    });
  });

  describe('404 route ', () => {
    it('respond with html string', (done) => {
      request(app)
        .post('/unknown')
        .set('Accept', 'application/json')
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(200)
        .end((err, res) => {
          expect(res.text).toMatchSnapshot();
          done();
        });
    });
  });
});
