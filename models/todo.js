'use strict';
module.exports = (sequelize, DataTypes) => {
  // 定義資料規格
  const Todo = sequelize.define(
    "Todo",
    {
      name: DataTypes.STRING,
      isDone: DataTypes.BOOLEAN,
    },
    {}
  );
  Todo.associate = function (models) {
    // 定義資料關聯
    Todo.belongsTo(models.User);
  };
  return Todo;
};