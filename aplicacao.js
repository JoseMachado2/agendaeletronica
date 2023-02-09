const express = require("express");
const app = express();
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Post = require('./models/Post')

/* var http = require('http');

http.createServer(function(req,res){
  res.end("Testando")
}) */



//config /conexao com o handlebars 
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')



//Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//ROTAS
app.get("/cadastrar", function (req, res) {

  res.render('formulario')
});

app.get('/', function (req, res) {
  Post.findAll().then(function (posts) {
    res.render('home', { posts: posts })
  })

})


app.post("/registrar", function (req, res) {


  Post.create({  //inserindo os dados
    titulo: req.body.usuario,
    conteudo: req.body.atividade,
    estatus: req.body.status.toUpperCase()
  }).then(function () {

    res.redirect('/')
  }).catch(function (erro) {
    console.log("deu ruim alguma coisa" + erro)
  })

});

app.get('/deletar/:id', function (req, res) {
  Post.destroy({ where: { 'id': req.params.id } }).then(function () {

    res.render('excluir')

  }).catch(function (erro) {
    res.send('Esta postagem nao existe')
  })
});

app.get('/edit/:id', function (req, res) {
  Post.findByPk(req.params.id)
    .then(post => {
      res.render('form-edit', {
        id: req.params.id,
        titulo: post.usuario,
        conteudo: post.atividade,
        estatus: post.status
      })
    })
    .catch(err => {
      res.send('Post não encontrado!')
    })
});

app.post('/editado/:id', function (req, res) {
  Post.update({
    titulo: req.body.usuario,
    conteudo: req.body.atividade,
    estatus: req.body.status.toUpperCase()
  },
    {
      where: { id: req.params.id }
    }).then(function () {
      res.redirect('/')
    }).catch(function (erro) {
      console.log(erro);
    });
});

// LINHA QUE FAZ A CONEXAO 
app.listen(7070, function () {
  console.log("Servidor operando!")

});