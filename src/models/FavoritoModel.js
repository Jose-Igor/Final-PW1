const mongoose = require('mongoose');
const validator = require('validator');
require('dotenv').config();


const FavoritoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  link: { type: String, required: false, default: '' },
  categoria: { type: String },
});

const FavoritoModel = mongoose.model('Favorito', FavoritoSchema);

function Favorito(body) {
  this.body = body;
  this.errors = [];
  this.favorito = null;
}

Favorito.prototype.register = async function() {
  this.valida();
  if(this.errors.length > 0) return;
  this.favorito = await FavoritoModel.create(this.body);
};

Favorito.prototype.valida = function() {
  this.cleanUp();

  // Validação
  if(!this.body.titulo) this.errors.push('titulo é um campo obrigatório.');
};

Favorito.prototype.cleanUp = function() {
  for(const key in this.body) {
    if(typeof this.body[key] !== 'string') {
      this.body[key] = '';
    }
  }

  this.body = {
    titulo: this.body.titulo,
    conteudo: this.body.conteudo,
  };
};

Favorito.prototype.edit = async function(id) {
  if(typeof id !== 'string') return;
  this.valida();
  if(this.errors.length > 0) return;
  this.favorito = await FavoritoModel.findByIdAndUpdate(id, this.body, { new: true });
};

// Métodos estáticos
Favorito.buscaPorId = async function(id) {
  if(typeof id !== 'string') return;
  const favorito = await FavoritoModel.findById(id);
  return favorito;
};

Favorito.buscaFavoritos = async function() {
  const favoritos = await FavoritoModel.find()
    .sort({ criadoEm: -1 });
  return favoritos;
};

Favorito.delete = async function(id) {
  if(typeof id !== 'string') return;
  const session = driver.session();
  try {
    await session.run(
      'MATCH (u:Usuario)-[p:PUBLICOU]->(n:Favorito) ' +
      'WHERE n.id = $id ' +
      'DELETE p, n',
      { id }
    );
  } finally {
    session.close();
  }

  const favorito = await FavoritoModel.findOneAndDelete({_id: id});
  return favorito;
};


module.exports = Favorito;
