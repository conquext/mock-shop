// define the Reset model with its content
const resets = (sequelize, DataTypes) => {
  const Reset = sequelize.define("reset", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      unique: true
    },
    email: {
      type: DataTypes.INTEGER,
      unique: true
    },
    resetToken: {
      type: DataTypes.STRING,
      unique: true
    },
    expireTime: {
      type: DataTypes.DATE
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  });

  Reset.associate = models => {
    Reset.belongsTo(models.User, {
      foreignKey: "id",
      onDelete: "CASCADE"
    });
  };

  return Reset;
};

export default resets;
