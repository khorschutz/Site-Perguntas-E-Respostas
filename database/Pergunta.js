const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define("questions", {
    titulo:{
        type: Sequelize.STRING,
        allowNull: false //campo nunca estará vazio
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
},{});

Pergunta.sync({force:false}).then(() => {
    console.log("Tabela criada!")
});

module.exports = Pergunta;
