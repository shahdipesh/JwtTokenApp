const Sequelize = require("sequelize");
// initialize an instance of Sequelize
const sequelize = new Sequelize({
  database: "test",
  username: "root",
  password: "root",
  dialect: "mysql",
});

module.exports=sequelize