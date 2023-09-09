'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user, category, location, ticket_image }) {
      this.belongsTo(user, { foreignKey: 'seller_id' })
      this.belongsTo(category, { foreignKey: 'category_id' })
      this.belongsTo(location, { foreignKey: 'location_id' })
      this.hasMany(ticket_image, { foreignKey: 'ticket_id' })
    }
  }
  ticket.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    details: DataTypes.STRING,
    date: DataTypes.STRING,
    time: DataTypes.STRING,
    address: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    modelName: 'ticket',
  });
  return ticket;
};