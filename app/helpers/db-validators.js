const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });

  if (!existeRol) {
    throw new Error(`El role ${rol} no esta registrado en la base de datos`);
  }
};

const existeEmail = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });

  if (existeEmail) {
    throw new Error(
      `El correo ${correo} ya esta registrado en la base de datos`
    );
  }
};
const existeUsuarioPorId = async (id = "") => {
  const existeusuario = await Usuario.findById(id);

  if (!existeusuario) {
    throw new Error(`El ID no existe ${id}`);
  }
};

module.exports = {
  esRoleValido,
  existeEmail,
  existeUsuarioPorId,
};
