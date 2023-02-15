const Favorito = require('../models/FavoritoModel');

exports.index = (req, res) => {
  res.render('favorito', {
    favorito: {}
  });
};

exports.register = async(req, res) => {
  try {
    console.log(req.session.user)
    const titulo = req.body.titulo;
    const favorito = new Favorito(req.body);
    console.log(favorito);
    await favorito.register();

    if(favorito.errors.length > 0) {
      req.flash('errors', favorito.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }
    
    req.flash('success', 'Favorito registrado com sucesso.');
    req.session.save(() => res.redirect(`/favorito/index/${favorito.favorito._id}`));
    return;
  } catch(e) {
    console.log(e);
    return res.render('404');
  }
};

exports.editIndex = async function(req, res) {
  if(!req.params.id) return res.render('404');

  const favorito = await Favorito.buscaPorId(req.params.id);
  if(!favorito) return res.render('404');

  res.render('favorito', { favorito });
};

exports.edit = async function(req, res) {
  try {
    if(!req.params.id) return res.render('404');
    const favorito = new favorito(req.body);
    await favorito.edit(req.params.id);

    if(favorito.errors.length > 0) {
      req.flash('errors', favorito.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('success', 'Favorito editado com sucesso.');
    req.session.save(() => res.redirect(`/favorito/index/${favorito.favorito._id}`));
    return;
  } catch(e) {
    console.log(e);
    res.render('404');
  }
};

exports.delete = async function(req, res) {
  if(!req.params.id) return res.render('404');

  const favorito = await Favorito.delete(req.params.id);
  if(!favorito) return res.render('404');

  req.flash('success', 'Favorito apagado com sucesso.');
  req.session.save(() => res.redirect('back'));
  return;
};
