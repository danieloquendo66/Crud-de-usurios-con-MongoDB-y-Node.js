const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");

//pedir usuarios
const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  // const usuarios = await Usuario.find(query).skip(desde).limit(limite);

  // const total = await Usuario.count(query);

  const [total, usuarios] = await Promise.all([
    Usuario.count(query),
    Usuario.find(query).skip(desde).limit(limite),
  ]);

  res.status(200).json({ total, usuarios });
};

//crear usuarios
const usuariosPos = async (req = request, res = response) => {
  const { nombre, correo, password, role } = req.body;
  const usuario = new Usuario({ nombre, correo, password, role });

  const salt = bcrypt.genSaltSync(10);
  usuario.password = bcrypt.hashSync(password, salt);

  await usuario.save();

  res.json({
    msg: "post Api - Controlador",
    usuario,
  });
};

//modificar usuarios todos los parametros
const usuariosPut = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const { _id, password, google, correo, ...resto } = req.body;

    if (password) {
      const salt = bcrypt.genSaltSync(10);
      resto.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
      msg: "put Api - Controlador",
      usuario,
    });
  } catch (error) {
    console.log(error);
  }
};

//modificar usuarios, parametros unicos
const usuariosPatch = (req = request, res = response) => {
  res.json({
    msg: "patch Api - Controlador",
  });
};

//eliminar usuarios
const usuariosDelete = async (req = request, res = response) => {
  const { id } = req.params;

  // const usuario = await Usuario.findByIdAndDelete(id);
  const usuario = await Usuario.findByIdAndUpdate(id, {
    estado: false,
  });
  usuario.estado = false;

  const usuarioAutenticado = req.usuario;

  res.json({ usuario, usuarioAutenticado });
};

module.exports = {
  usuariosGet,
  usuariosPos,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
