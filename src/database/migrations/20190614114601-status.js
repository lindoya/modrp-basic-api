
module.exports = {
  up: (queryInterface, Sequelize) => {
    const status = queryInterface.createTable('status', {
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
      createdAt: {
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE,
      },

      updatedAt: {
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE,
      },

      deletedAt: {
        defaultValue: null,
        type: Sequelize.DATE,
      },
    })

    return status
  },

  down: queryInterface => queryInterface.dropTable('status'),
}

// npx sequelize-cli db:migrate src/database/migrations/20190614114601-status.js
