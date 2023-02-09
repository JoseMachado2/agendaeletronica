const db = require('./db')

const Post = db.sequelize.define('postagens', {
    titulo: {
        type: db.Sequelize.STRING
    },
    conteudo: {
        type: db.Sequelize.TEXT
    },
    estatus: {
        type: db.Sequelize.STRING
    }

})

// Post.sync({force:true})

module.exports = Post
