const { Experiencia } = require("../models/experiencias");
const { validationResult } = require("express-validator");

const controllerExp = {
  crearExperiencia: async (req, res) => {
    try {
      const error = validationResult(req);
      if (error.isEmpty()) {
        // const { experiencia } = req.body;
        const experiencia = new Experiencia(req.body);
        await experiencia.save();
        res.status(201).json(experiencia);
      } else {
        res.status(501).json(error);
      }
    } catch (err) {
      res.status(501).json({
        msg: "No se puede guardar la experiencia en la DB, ese título ya existe",
        err,
      });
    }
  },
  verExperiencias: async (req, res) => {
    const experiencias = await Experiencia.find();
    res.json({ experiencias });
  },
  verExperiencia: async (req, res) => {
    const experiencia = await Experiencia.findById(req.params.id);
    res.json({ experiencia });
  },
  editarExperiencia: async (req, res) => {
    try {
      const error = validationResult(req);
      if (error.isEmpty()) {
        const { id } = req.params;
        const previous = await Experiencia.findByIdAndUpdate(id, req.body); // Para mostrar como era antes de la actualización
        res.status(202).json({ previous, updated: req.body }); // .json({ msg: "Se actualizo sin ningun problema" })
      } else {
        res.status(501).json(error);
      }
    } catch (error) {
      res
        .status(501)
        .json({ msg: "Este título ya existe en la base de datos", error });
    }
  },
  eliminarExperiencia: async (req, res) => {
    try {
      const experiencia = await Experiencia.findByIdAndDelete(req.params.id);
      res.json({ msg: "Se ha borrado", experiencia });
    } catch (error) {
      res
        .status(400)
        .json({ msg: "Problemas a la hora de borrar la información" });
    }
  },
  cargarImagen: async (req, res) => {
    // console.log(req)
    res.send({ msg: "Imágen cargada", path: req.file.path, name: req.file.filename });
    // res.send({ msg: "Imágen cargada" });
  },
};

module.exports = controllerExp;
