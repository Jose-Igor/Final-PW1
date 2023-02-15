const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const favoritoController = require('./src/controllers/favoritoController');

const { loginRequired } = require('./src/middlewares/middleware');

// Rotas da home
route.get('/', homeController.index);

// Rotas de login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

// Rotas de favorito
route.get('/favorito/index', loginRequired, favoritoController.index);
route.post('/favorito/register', loginRequired, favoritoController.register);
route.get('/favorito/index/:id', loginRequired, favoritoController.editIndex);
route.post('/favorito/edit/:id', loginRequired, favoritoController.edit);
route.get('/favorito/delete/:id', loginRequired, favoritoController.delete);


// Questão 2 (50 pontos)
//Implemente uma API REST com as funções CRUD (listar todos, listar por id, criar, apagar e editar) para a entidade favorito descrita na Questão 1.
// As URLs das rotas da API devem começar por /api, ou seja, rotas diferentes das implemendas na Questão 1, e devem retornar apenas JSON como resposta. 
//Os métodos HTTP devem ser respeitados para cada uma das funções do CRUD: GET, POST, DELETE, PATCH/PUT. 
// A API deve funcionar sem erros e com persistência no mesmo BD da Questão 1, e estar acessível pelo Insomnia ou outros clientes HTTP.

route.get('/api/listall', (req, res) => {
    
})
route.post('/api/criar', (req, res) => {
    
})
route.get('/api/list/:id', (req, res) => {
    
})
route.delete('/api/apagar/:id', (req, res) => {
    
})
route.put('/api/editar/:id', (req, res) => {
    
})

module.exports = route;
