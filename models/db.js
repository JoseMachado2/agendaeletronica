
//Conexao com o BANCO DE DADOS(MYSQL) por sequelize
const Sequelize = require('sequelize')

const sequelize = new Sequelize('registroapp', 'root', '1234', {
    host: "localhost",
    dialect: 'mysql'
})

module.exports = {

    Sequelize: Sequelize,
    sequelize: sequelize
}