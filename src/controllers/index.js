const Domain = require('../domains')

const domain = new Domain()

const newRequest = async (req, res, next) => {
  try {
    console.log(req.body)
    const response = await domain.newRequest(req.body)

    res.json(response)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  newRequest,
}
