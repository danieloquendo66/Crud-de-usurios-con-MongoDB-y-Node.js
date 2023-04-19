const jwt = require("jsonwebtoken");

// generar JWT

const generarJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRETOPRIVATEKEY,
      {
        expiresIn: "4H",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("No se pudo generar el token");
        } else [resolve(token)];
      }
    );
  });
};

module.exports = {
  generarJWT,
};
