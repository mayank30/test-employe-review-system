module.exports = (sequelize, type) => {
  return sequelize.define("review", {
    id: {
      type: type.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    period: {
      type: type.STRING,
      allowNull: false,
    },
    reviewFor: {
      type: type.JSON,
      allowNull: false,
    },
    reviewById: {
      type: type.STRING,
      allowNull: false,
    },
    comment: {
      type: type.STRING,
      allowNull: true,
    },
    rating: {
      type: type.DECIMAL,
      allowNull: true,
      defaultValue: 1,
    },
    meta: {
      type: type.JSON,
      allowNull: true,
    },
    status: {
      type: type.STRING,
      allowNull: false,
      default: "PENDING", // PENDING SUBMITED APPROVED REJECTED
    },
    byEmployee: {
      type: type.JSON,
      allowNull: false,
    },
  });
};
