const express = require("express");
const upload = require('../libs/storage')
const router = express.Router();
const experienceController = require("../controller/experienceController");
const { validarId } = require("../middleware/validarId");
const { check } = require("express-validator");

router.get("/verExperiencias", experienceController.verExperiencias);
router.get("/verExperiencia/:id", validarId, experienceController.verExperiencia);
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
  experienceController.crearExperiencia
);
router.put("/editarExperiencia/:id", validarId, experienceController.editarExperiencia);
router.delete("/eliminarExperiencia/:id", validarId, experienceController.eliminarExperiencia);
router.post('/uploadImg', upload.single('imgUrl'), experienceController.cargarImagen)
module.exports = router;
