const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  const ping = sequelize.define('ping', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },

    address: {
      type: Sequelize.STRING,
    },

    port: {
      type: Sequelize.STRING,
    },

    avg: {
      type: Sequelize.STRING,
    },

    max: {
      type: Sequelize.STRING,
    },

    min: {
      type: Sequelize.STRING,
    },

    results: {
      type: Sequelize.STRING,
    },
  })

  return ping
}
