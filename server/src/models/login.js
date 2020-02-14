// define the Login model with its content
const logins = (sequelize, DataTypes) => {
  const Login = sequelize.define("login", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true
    },
    userId: DataTypes.INTEGER,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [4, 420]
      }
    },
    lastLogin: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  });

  Login.associate = models => {
    Login.belongsTo(models.User, {
      foreignKey: "id",
      onDelete: "CASCADE"
    });
  };

  return Login;
};

export default logins;
