const { request, response } = require("express");
const role = require("../models/role");

const esAdminRole = (req = request, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se quiere verificar el role sin validar el token primero",
    });
  }

  const { role, nombre } = req.usuario;

  if (role !== "ADMIN_ROLE") {
    res
      .status(401)
      .json({ msg: `${nombre} no es administrador - no puede hacer eso` });
  }
  next();
};

const tieneRole = (...roles) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: "Se quiere verificar el role sin validar el token primero",
      });
    }

    if (!roles.includes(req.usuario.role)) {
      return res
        .status(401)
        .json({ msg: `El sercio requiere alguno de estos roles: ${roles}` });
    }
    next();
  };
};

module.exports = {
  esAdminRole,
  tieneRole,
};
