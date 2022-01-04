const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipe = require('./recipe');
const diets = require('./diets');
const postRecipe = require('./postRecipe')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/recipes",recipe)
router.use("/types",diets)
router.use("/recipe",postRecipe)

module.exports = router;
