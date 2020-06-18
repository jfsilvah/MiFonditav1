module.exports = function(sequelize, DataTypes) {
  var OrderLines = sequelize.define("OrderLines", {
    OrderPrice: {
      type: DataTypes.DECIMAL,
      defaultValue: 100,
      allowNull: false
    }
  });
  // ORDERLINES CAN'T BE CREATED WITHOUT AN order header and food
  OrderLines.associate = function(models) {
    OrderLines.belongsTo(models.OrderHeader, {
      foreignKey: {
        allowNull: false
      }
    });
    OrderLines.belongsTo(models.Foods, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return OrderLines;
};
