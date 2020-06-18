module.exports = function(sequelize, DataTypes) {
  var Foods = sequelize.define("Foods", {
    FoodName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    FoodType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    Category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    Price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 100
    },
    Picture: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  Foods.associate = function(models) {
    Foods.hasMany(models.OrderLines, {
      onDelete: "cascade"
    });
  };
  return Foods;
};
