module.exports = function(sequelize, DataTypes) {
  var OrderHeader = sequelize.define("OrderHeader", {
    OrderStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    OrderDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
      validate: {
        len: [1]
      }
    }
  });
  // When a customer is deleted, also the order header
  OrderHeader.associate = function(models) {
    OrderHeader.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: false
      }
    });
    OrderHeader.hasMany(models.OrderLines, {
      onDelete: "cascade"
    });
  };
  return OrderHeader;
};
