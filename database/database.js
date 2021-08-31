const Sequelize = require("sequelize");

const connection = new Sequelize("primeiroprojeto", "root", "info1325", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = connection