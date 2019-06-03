

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('request', {
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

    ping: {
      type: Sequelize.STRING,
    },

    firmwareVersion: {
      type: Sequelize.STRING,
    },

    percent: {
      type: Sequelize.STRING,
    },
  }),

  down: queryInterface => queryInterface.dropTable('request'),
}
