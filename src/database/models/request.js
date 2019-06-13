const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  const request = sequelize.define('request', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },

    ip: {
      type: Sequelize.STRING,
    },

    actionReset: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },

    actionResetSucess: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },

    actionStatus: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },

    actionStatusSucess: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },

    actionPing: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },

    actionPingSucess: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },

    actionPort: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },

    actionPortSucess: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },

    offLine: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },


    notV4: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },

  })
  request.associate = (models) => {
    // request.belongsTo(models.ping)
    request.belongsTo(models.status)
    request.belongsTo(models.ping)
  }
  return request
}
