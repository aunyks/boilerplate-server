const request = require('supertest')

const urlPrefix = '/api/v1'

describe('APIv1', () => {
  let server
  beforeEach(() => {
    server = require('../../src/server')
  })

  afterEach(() => {
    server.close()
  })

  it('responds to /api/v1/hello', (done) => {
    request(server)
      .get(urlPrefix + '/hello')
      .expect(200, 'hello from v1', done)
  })
})