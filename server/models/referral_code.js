"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class referral_code extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user }) {
      this.belongsTo(user, { foreignKey: "user_id" });
    }
  }
  referral_code.init(
    {
      code: DataTypes.INTEGER,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      sequelize,
      modelName: "referral_code",
    }
  );
  return referral_code;
};
