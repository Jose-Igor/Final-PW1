const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const favoritoController = require('./src/controllers/favoritoController');

const { loginRequired } = require('./src/middlewares/middleware');
const { json } = require('express');

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


route.get('/api/listall', (req, res) => {
    res.send(json.favoritoController.index)
})
route.post('/api/criar', (req, res) => {
    req.get(json.favoritoController.register)
})
route.get('/api/list/:id', (req, res) => {
    res.send(json.favoritoController.editindex)
})
route.delete('/api/apagar/:id', (req, res) => {
    req.destroy(favoritoController.delete)
})
route.put('/api/editar/:id', (req, res) => {
    res.send(json.favoritoController.editindex)
})

module.exports = route;
