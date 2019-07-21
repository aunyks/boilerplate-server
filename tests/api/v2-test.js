const request = require('supertest')

const urlPrefix = '/api/v2'

describe('APIv2', () => {
  let server
  beforeEach(() => {
    server = require('../../src/server')
  })

  afterEach(() => {
    server.close()
  })

  it('responds to /api/v2/hello', (done) => {
    request(server)
      .get(urlPrefix + '/hello')
      .expect(200, 'hello from v2', done)
  })
})