'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ ticket, transaction, referral_code }) {
      this.hasMany(ticket, { foreignKey: 'seller_id' })
      this.hasMany(transaction, { foreignKey: 'user_id' })
      this.hasMany(referral_code, { foreignKey: 'user_id' })
    }
  }
  user.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: { msg: 'Email Not Valid' }
      }
    },
    password: DataTypes.STRING,
    point: DataTypes.INTEGER,
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
    modelName: 'user',
  });
  return user;
};