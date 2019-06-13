const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  const status = sequelize.define('status', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },

    ip: {
      type: Sequelize.STRING,
    },

    actionStatusSucess: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },

    tempoLigado: {
      type: Sequelize.STRING,
    },

    tempoConectado: {
      type: Sequelize.STRING,
    },

    tempoDesconectado: {
      type: Sequelize.STRING,
    },

    quantasVezesTPLinkReiniciou: {
      type: Sequelize.STRING,
    },

    latencia: {
      type: Sequelize.STRING,
    },

    firmwareVersion: {
      type: Sequelize.STRING,
    },

    percent: {
      type: Sequelize.STRING,
    },

  })
  return status
}
