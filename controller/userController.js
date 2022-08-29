const { User } = require("../models/users");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const generateJWT = require("../helpers/generateJWT");

const userController = {
  newUser: async (req, res) => {
    try {
      const error = validationResult(req);
      if (error.isEmpty()) {
        let salt = bcrypt.genSaltSync(10);
        const saveUser = new User({
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, salt)
        });
        await saveUser.save();
        res.status(201).json(saveUser);
      } else {
        res.status(501).json(error);
      }
    } catch (err) {
      res.status(501).json({
        msg: "No se ha logrado registrar, intente mas tarde",
        err,
      });
    }
  },
  login: async (req, res) => {
    const error = validationResult(req);
    if (error.isEmpty()) {
      const usuario = await User.findOne({ email: req.body.email });

      // Validaciones
      usuario == null &&
        res
          .status(401)
          .json({ msg: "El email o la contraseña son incorrectos." });
      !bcrypt.compareSync(req.body.password, usuario.password) &&
        res
          .status(401)
          .json({ msg: "El email o la contraseña son incorrectos." });

      const token = await generateJWT({
        id: usuario._id,
        email: usuario.email,
      });

      const userSession = {
        _id: usuario._id,
        email: usuario.email,
        token: token,
      };

      // Guardar cookie por 30 días
      res.cookie("sessionDelUsuario", userSession, {maxAge: 60000*60*24*30})
      // Guardar en session
      req.session.user = userSession;

      res.status(201).json({ userSession, log: true, msg: "Usuario logueado" });
    } else {
      res.status(501).json(error);
    }
  },
  logout: async (req, res) => {
    res.clearCookie("sessionDelUsuario");
    req.session.destroy();
    res.json({ log: false, msg: "Sesion cerrada" });
  },
};
module.exports = userController;
