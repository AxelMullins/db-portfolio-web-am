const { Portfolio } = require("../models/portfolio");
const { validationResult } = require("express-validator");

const portfolioController = {
  newRepo: async (req, res) => {
    try {
      const error = validationResult(req);
      if (error.isEmpty()) {
        const save = new Portfolio( req.body );
        await save.save();
        res.status(201).json(save);
      } else {
        res.status(501).json(error);
      }
    } catch (err) {
      res.status(501).json({
        msg: "No se ha logrado guardar el repositorio, el nombre debe ser unico",
        err,
      });
    }
  },
  allRepos: async (req, res) => {
    try {
      const porfolio = await Portfolio.find();
      res.status(200).json({ porfolio });
    } catch (error) {
      res.json({error})
    }
  },
  repo: async (req, res) => {
    const porfolio = await Portfolio.findById(req.params.id);
    res.status(200).json({ porfolio });
  },
  editRepo: async (req, res) => {
    try {
      const error = validationResult(req);
      if (error.isEmpty()) {
        const { id } = req.params;

        const previous = await Portfolio.findByIdAndUpdate(id, req.body);
        res.status(202).json({ previous, updated: req.body });
      } else {
        res.status(501).json(error);
      }
    } catch (error) {
      res
        .status(501)
        .json({ msg: "Error al intentar editar el repositorio, el nombre ya existe en la base de datos.", error });
    }
  },
  deleteRepo: async (req, res) => {
    try {
      const porfolio = await Portfolio.findByIdAndDelete(req.params.id);
      res.status(202).json({ msg: "Se ha borrado", porfolio });
    } catch (error) {
      res
        .status(400)
        .json({ msg: "Problemas a la hora de borrar la información" });
    }
  }
};

module.exports = portfolioController;
