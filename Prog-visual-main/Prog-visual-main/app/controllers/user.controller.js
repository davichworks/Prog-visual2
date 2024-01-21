const User = require("../models/user.model");
const Libro = require("../models/libros.model");

exports.allAccess = async (req, res) => {
  try {
    const data = await obtenerDatosPublicos();
    res.status(200).send(JSON.stringify(data));
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).send('Error interno del servidor');
  }
};

exports.userBoard = async (req, res) => {
    try {
      const data = await obtenerDatosUsers();
      res.status(200).send(JSON.stringify(data));
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      res.status(500).send('Error interno del servidor');
    }
  };

exports.adminBoard = async (req, res) => {
    try {
      const data = await obtenerDatosAdmin();
      res.status(200).send(JSON.stringify(data));
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      res.status(500).send('Error interno del servidor');
    }
  };

exports.moderatorBoard = async (req, res) => {
  try {
    const data = await obtenerDatosMod();
    res.status(200).send(JSON.stringify(data));
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).send('Error interno del servidor');
  }
};


async function obtenerDatosPublicos() {
  try {
    const numeroFilas = await Libro.countDocuments();
    console.log('Datos obtenidos:', numeroFilas);
    return numeroFilas;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error;
  }
}

async function obtenerDatosUsers() {
  try {
    const result = await Libro.find({}, { titulo: 1, autor:1, _id: 0 });
    console.log('Datos obtenidos:', result);
    return result;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error;
  }
}

async function obtenerDatosAdmin() {
  try {
    const result = await User.find({}, { username: 1, email: 1, rol: 1, _id: 0 });
    console.log('Datos obtenidos:', result);
    return result;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error;
  }
}

async function obtenerDatosMod() {
  try {
    const result = await User.find({ rol:"user"}, { username: 1, email:1, rol:1, _id: 0 });
    console.log('Datos obtenidos:', result);
    return result;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error;
  }
}
