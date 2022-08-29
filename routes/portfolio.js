const express = require("express");
const router = express.Router();
const portfolioController = require("../controller/portfolioController");
const { check } = require("express-validator");
const { validarIdPortfolio } = require("../middleware/validarIdPortfolio");
const auth = require("../middleware/auth");
const validarJWT = require("../middleware/validarJWT");

router.post(
  "/newRepo",
  auth,
  validarJWT,
  [
    check("name").not().isEmpty().withMessage("Debes ingresar un nombre"),
    check("description")
      .not()
      .isEmpty()
      .withMessage("Debes ingresar una description"),
    check("gif")
      .not()
      .isEmpty()
      .withMessage("Debes ingresar la url del gif o img"),
  ],
  portfolioController.newRepo
);
router.get("/allRepos", auth, portfolioController.allRepos);
router.get("/repo/:id", auth, validarIdPortfolio, portfolioController.repo);
router.put("/editRepo/:id", auth, portfolioController.editRepo);
router.delete(
  "/deleteRepo/:id",
  auth,
  validarIdPortfolio,
  portfolioController.deleteRepo
);

module.exports = router;
