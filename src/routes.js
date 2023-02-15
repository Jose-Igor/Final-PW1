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


// Questão 2 


route.get('/api/listall', (req, res) => {
    res.json(req.session.favoritoController.index);
})
route.post('/api/criar', (req, res) => {
    const fav = res.json(req.session.favoritoController.index)
    req.favoritoController.register(fav);
})
route.get('/api/list/:id', (req, res) => {
    res.json(req.session.favoritoController.index);
})
route.delete('/api/apagar/:id', (req, res) => {
    const fav = res.json(req.session.favoritoController.index)
    req.favoritoController.delete(fav);
})
route.put('/api/editar/:id', (req, res) => {
    const fav = res.json(req.session.favoritoController.index)
    req.favoritoController.editIndex(fav);
})

module.exports = route;
