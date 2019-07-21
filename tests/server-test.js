const request = require('supertest')

describe('Root Interface', () => {
  let server
  beforeEach(() => {
    server = require('../src/server')
  })

  afterEach(() => {
    server.close()
  })

  it('responds to /', (done) => {
    request(server)
      .get('/')
      .expect(200, done)
  })
})