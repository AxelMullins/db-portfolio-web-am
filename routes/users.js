const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { check } = require("express-validator");
const { validarIdUser } = require("../middleware/validarIdUser");
const auth = require("../middleware/auth");
const validarJWT = require("../middleware/validarJWT");

/* GET users listing. */
router.post(
  "/newUser",
  [
    check("email")
      .not()
      .isEmpty()
      .withMessage("Debes ingresar un email")
      .isEmail()
      .withMessage("Debes ingresar un formato de email válido"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Debes ingresar una contraseña"),
  ],
  userController.newUser
);
router.post(
  "/login",
  [
    check("email")
      .not()
      .isEmpty()
      .withMessage("Debes ingresar un email")
      .isEmail()
      .withMessage("Debes ingresar un formato de email válido"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Debes ingresar una contraseña"),
  ],
  userController.login
);
router.get("/logout", auth, validarJWT, userController.logout);

module.exports = router;
