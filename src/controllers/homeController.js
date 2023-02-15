const Favorito = require('../models/FavoritoModel');

exports.index = async(req, res) => {
  const favoritos = await Favorito.buscaFavoritos();
  res.render('index', { favoritos });
};

