
module.exports = {
  up: (queryInterface, Sequelize) => {
    const ping = queryInterface.createTable('ping', {
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

    return ping
  },

  down: queryInterface => queryInterface.dropTable('ping'),
}

// npx sequelize-cli db:migrate src/database/migrations/20190614114600-ping.js
