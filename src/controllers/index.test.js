const request = require('../helpers/request')

describe('', () => {
  test('', async () => {
    await request().post('/api/modRp', { ip: '10.26.4.226', action: 'getStatus' })
  }, 30000)
})
