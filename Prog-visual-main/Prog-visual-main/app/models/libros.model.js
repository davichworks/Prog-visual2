const mongoose = require('mongoose');

const librosSchema = new mongoose.Schema({
  titulo: String,
  autor: String,
  
  // Otros campos de tu modelo de libros
});

const Libros = mongoose.model('Libros', librosSchema);

module.exports = Libros;
