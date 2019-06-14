

module.exports = {
  up: (queryInterface, Sequelize) => {
    const request = queryInterface.createTable('request', {
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

      statusId: {
        type: Sequelize.UUID,
        references: {
          model: 'status',
          key: 'id',
        },
      },

      pingId: {
        type: Sequelize.UUID,
        references: {
          model: 'ping',
          key: 'id',
        },
      },
    })
    request.associate = (models) => {
      // request.belongsTo(models.ping)
      request.belongsTo(models.status)
      request.belongsTo(models.ping)
    }
    return request
  },

  down: queryInterface => queryInterface.dropTable('request'),
}
// npx sequelize-cli db:migrate src/database/migrations/20190614114600-requests.js
