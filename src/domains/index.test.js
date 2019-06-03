const Domain = require('./')

const domain = new Domain()

describe('', () => {
  test('', async () => {
    await domain.newRequest({ ip: '10.26.4.226', action: 'getStatus' })
  }, 30000)
})
