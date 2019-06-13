const Domain = require('../domains')

const domain = new Domain()

const database = require('../database')

const newRequest = async (req, res, next) => {
  const transaction = await database.transaction()
  try {
    const response = await domain.newRequest(req.body, { transaction })

    await transaction.commit()
    res.json(response)
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
}

module.exports = {
  newRequest,
}
