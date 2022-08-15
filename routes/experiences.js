const express = require("express");
const upload = require('../libs/storage')
const router = express.Router();
const controllerExp = require("../controller/controllerExp.js");
const { validarId } = require("../middleware/validarId");
const { check } = require("express-validator");

router.get("/verExperiencias", controllerExp.verExperiencias);
router.get("/verExperiencia/:id", validarId, controllerExp.verExperiencia);
router.post(
  "/crearExperiencia",
  [
    check("title").not().isEmpty().withMessage("El campo esta vacio"),
    check("technologies").not().isEmpty().withMessage("El campo esta vacio"),
    check("company").not().isEmpty().withMessage("El campo esta vacio"),
    check("details").not().isEmpty().withMessage("El campo esta vacio"),
    check("imgUrl").not().isEmpty().withMessage("El campo esta vacio"),
    check("date").not().isEmpty().withMessage("El campo esta vacio"),
  ],
  controllerExp.crearExperiencia
);
router.put("/editarExperiencia/:id", validarId, controllerExp.editarExperiencia);
router.delete("/eliminarExperiencia/:id", validarId, controllerExp.eliminarExperiencia);
// 
router.post('/uploadImg', upload.single('imgUrl'), controllerExp.cargarImagen)
module.exports = router;
